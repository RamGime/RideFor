import React, { useContext } from 'react'
import { ShopingBagContext } from '../../../context/ShopingBagContex';
import { Product } from '../../../../Domain/entities/Product';

 const ClientShopingViewModel =() => {
    const {shopingBag, saveItem, deleteItem,total} = useContext(ShopingBagContext)

    const addItem = async (product: Product) =>{
        product.quantity = product.quantity! + 1;
        await saveItem(product)
    }

    
    const subtractItem = async (product: Product) =>{
        if(product.quantity! > 1 ){
            product.quantity = product.quantity! - 1;
            await saveItem(product)
        }
    }

    return {
        shopingBag,
        total,
        addItem,
        subtractItem,
        deleteItem
    }
}
 
export default ClientShopingViewModel;