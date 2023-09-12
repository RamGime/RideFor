  import React from 'react'
  import { View, Text,FlatList } from 'react-native';
  import useViewModel from './viewmodel';
  import { ShopinBagItem } from './item';
  import { RoundedButton } from '../../../components/RoundedButton';
  import styles from './styles'

  export const ClientshopingBagScreen = () =>{
  
  const { shopingBag, total, addItem,subtractItem, deleteItem } = useViewModel()
  
  
    return (
    <View style={styles.container}>
        <FlatList
          data={shopingBag}
          keyExtractor={(item) => item.id!}
          renderItem={({item}) => <ShopinBagItem
          product={item}
          addItem={addItem}
          subtractItem={subtractItem}
          deleteItem={deleteItem}
          />}
        />

        <View style={styles.TotalToPay}>
        <View>
          <Text style={styles.TotalText}>total</Text>
          <Text style={styles.TotalInfo}>${total}</Text>
        </View>

        <View style={styles.buttonAdd}><RoundedButton text='CONFIRMAR EL VERDADERO' onPress={()=>{}} />
        </View>
        </View>
    </View>
    )
  }
