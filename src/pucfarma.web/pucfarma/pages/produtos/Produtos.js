import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

const produtos = [
  { id: '001', nome: 'Produto_001', preco: 'R$00,00', estoque: '000' },
  { id: '002', nome: 'Produto_002', preco: 'R$00,00', estoque: '000' },
  // ... adicione mais produtos conforme necessário
];

export default function ListaProdutos() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // Usando o hook de navegação aqui

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.stockInfo}>Estoque: {item.estoque}</Text>
      <View style={styles.productContent}>
        <View style={styles.imagePlaceholder}></View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.nome}</Text>
          <Text style={styles.productDetails}>Preço individual: {item.preco}</Text>
          <Text style={styles.productDetails}>ID do produto: {item.id}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => {'ProdutosEdicao'}}>
        <Text style={styles.editButtonText}>Editar Produto</Text>
      </TouchableOpacity>
    </View>
  );
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Produtos</Text>
      <View style={styles.searchContainer}>
        <View style={styles.inputIconContainer}>
          <Image 
            source={require('../../assets/lupa.png')} 
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ProdutosEdicao')}>
        <Text style={styles.addButtonText}>+ Adicionar produto</Text>
      </TouchableOpacity>
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign: 'center',
    color: '#898989',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  inputIconContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    width: 20,
    height: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 10,
    
  },

  addButton: {
    backgroundColor: "#74B0FF", // Nova cor azul claro para o botão de adicionar
    borderRadius: 2, // Bordas com curvatura menor
    paddingVertical: 10, // Preenchimento vertical ao redor do texto
    paddingHorizontal: 10, // Preenchimento horizontal ao redor do texto
    marginHorizontal: 20, // Margem do lado esquerdo para afastar das bordas da tela
    marginBottom: 20, // Margem inferior
    alignSelf: 'flex-start', // Alinha o botão à esquerda da tela
  },
  
  addButtonText: {
    color: '#ffffff', // Cor do texto do botão de adicionar
    fontWeight: 'bold', // Negrito para o texto do botão
    fontSize: 16, // Tamanho da fonte do texto do botão
  },
  
  
  productItem: {
    flexDirection: 'column',
    justifyContent: 'space-between', // Distribuir o conteúdo verticalmente
    backgroundColor: '#fff',
    borderColor: '#E3E3E3',
    height: 100,
    borderWidth: 1,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  stockInfo: {
    alignSelf: 'flex-end', // Alinhar no topo à esquerda
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 10, // Espaçamento horizontal interno
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productDetails: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#74B0FF', // Cor azul mantida para o botÃ£o de editar
    borderRadius: 2, // Bordas arredondadas ajustadas para 2
    paddingVertical: 5, // Preenchimento vertical mantido
    paddingHorizontal: 10, // Preenchimento horizontal mantido
    width: 110, // Largura definida para 76
    height: 30, // Altura definida para 19
    alignSelf: 'flex-end', // Alinhamento ao final do contÃªiner pai (direita)
  },
  
  editButtonText: {
    color: '#ffffff', // Cor do texto do botÃ£o de editar
    
    fontSize: 14, // Tamanho da fonte do texto do botÃ£o
  },

});
