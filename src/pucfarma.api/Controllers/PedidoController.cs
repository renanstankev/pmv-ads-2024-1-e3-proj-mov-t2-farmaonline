﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pucfarma.api.Data;
using pucfarma.api.Enum;
using pucfarma.api.Models;

namespace pucfarma.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly PucFarmaDbContext _context;

        public PedidoController(PucFarmaDbContext context)
        {
            _context = context;
        }

        // GET: api/Pedido
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoModel>>> GetPedidos()
        {
            return await _context.Pedidos.ToListAsync();
        }

        // GET: api/Pedido/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PedidoModel>> GetPedido(int id)
        {
            var pedidoModel = await _context.Pedidos.FindAsync(id);

            if (pedidoModel == null)
            {
                return NotFound();
            }

            return pedidoModel;
        }

        // PUT: api/Pedido/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditarPedido(int id, PedidoModel pedidoModel)
        {
            if (id != pedidoModel.pedidoId)
            {
                return BadRequest();
            }

            _context.Entry(pedidoModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PedidoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Pedido
        [HttpPost]
        public async Task<ActionResult<PedidoModel>> GerarPedido(PedidoModel pedidoModel)
        {
            _context.Pedidos.Add(pedidoModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPedido", new { id = pedidoModel.pedidoId }, pedidoModel);
        }

        // DELETE: api/Pedido/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> ApagarPedido(int id)
        {
            var pedidoModel = await _context.Pedidos.FindAsync(id);
            if (pedidoModel == null)
            {
                return NotFound();
            }

            _context.Pedidos.Remove(pedidoModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PedidoExists(int id)
        {
            return _context.Pedidos.Any(e => e.pedidoId == id);
        }

        [HttpGet("PedidosUsuarioLogado")]
        public async Task<ActionResult<IEnumerable<PedidoModel>>> GetPedidosUsuarioLogado()
        {
            int id = Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var pedidosUsuarioLogado = await _context.Pedidos
                                                .Where(p => p.usuarioId == id)
                                                .ToListAsync();

            if (pedidosUsuarioLogado == null || pedidosUsuarioLogado.Count == 0)
            {
                return NotFound(new { message = "O usuário não realizou nenhum pedido." });
            }

            return pedidosUsuarioLogado;
        }

        // POST: api/Pedido/Finalizar
        [HttpPost("Finalizar")]
        public async Task<IActionResult> FinalizarPedido(int ID)
        {
            var pedido = await _context.Pedidos.FindAsync(ID);

            if (pedido == null)
            {
                return BadRequest(new { erro = "Não há um pedido com o ID fornecido." });
            }

            pedido.status = StatusPedido.Finalizado;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // POST: api/Pedido/Cancelar
        [HttpPost("Cancelar")]
        public async Task<IActionResult> CancelarPedido(int ID)
        {
            var pedido = await _context.Pedidos.FindAsync(ID);

            if (pedido == null)
            {
                return BadRequest(new { erro = "Não há um pedido com o ID fornecido." });
            }

            pedido.status = StatusPedido.Cancelado;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
