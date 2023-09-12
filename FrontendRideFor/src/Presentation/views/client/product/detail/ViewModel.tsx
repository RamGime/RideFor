import React, { useState, useEffect, useContext } from 'react'
import { Product } from '../../../../../Domain/entities/Product';
import { ShopingBagContext } from '../../../../context/ShopingBagContex';
// import { ShoppingBagContext } from '../../../../context/ShoppingBagContext';

const ClientProductDetailViewModel = (product: Product) => {

    const productImageList: string[] = [
        product.image1,
        product.image2,
        product.image3,
    ];
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0.0);
    const {shopingBag, saveItem} = useContext(ShopingBagContext)
    console.log('BOLSA DE COMPRAS: ' + JSON.stringify(shopingBag))
 
useEffect(() => {
    const index = shopingBag.findIndex((p) => product.id);
    if(index !== -1 ){ //producto si existe
      setQuantity(shopingBag[index].quantity!);
    }
}, [shopingBag])



    useEffect(() => {
        setPrice(product.price * quantity);
    }, [quantity])
    
  
    const addToBag = () =>{
        if(quantity > 0 ) {
            product.quantity = quantity
            saveItem(product)
        }
    }

    const addItem = () => {
        setQuantity(quantity + 1);
    }
    
    const removeItem = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    return {
        quantity,
        price,
        productImageList,
        shopingBag,
        addItem,
        addToBag,
        removeItem
    }
}

export default ClientProductDetailViewModel;
