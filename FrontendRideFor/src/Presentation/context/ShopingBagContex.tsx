import { Product } from '../../Domain/entities/Product';
import { createContext, useState, useEffect } from 'react';
import { GetShopingBagUseCase } from '../../Domain/useCases/shopingBag/GetShopingBag';
import { SaveShopingBagUseCase } from '../../Domain/useCases/shopingBag/SaveShopingBag';
import { useEvent } from 'react-native-reanimated';

export interface ShoppingBagContextProps {
    shopingBag: Product[],
    total: number
    getShoppingBag(): Promise<void>,
    getTotal(): Promise<void>,
    saveItem(product: Product): Promise<void>,
    deleteItem(product: Product): Promise<void>,
}

export const ShopingBagContext = createContext({} as ShoppingBagContextProps);

export const ShopingBagProvider = ({ children }: any) => {
    const [shopingBag, setShopingBag] = useState<Product[]>([]);
    const [total, setTotal] = useState(0.0);


    useEffect(() => {
        getShoppingBag();
    }, []);

    useEffect(() => {
        getTotal()
    }, [shopingBag])
    

    const getShoppingBag = async (): Promise<void> => {
        const results = await GetShopingBagUseCase();
        setShopingBag(results);
        
    }

    const getTotal= async(): Promise<void> => {
        setTotal(0);
        let totalPrice = 0;
        shopingBag.forEach(product =>{
            totalPrice = totalPrice + (product.quantity! * product.price)
        });
        setTotal(totalPrice)
    }


    const saveItem = async (product: Product): Promise<void> => {
        product.quantity = product.quantity! + 1;
        const index = shopingBag.findIndex((p) => p.id === product.id);
        if (index === -1) {
            shopingBag.push(product);
        } else {
            shopingBag[index].quantity = product.quantity;
        }
        await SaveShopingBagUseCase(shopingBag);
        getShoppingBag();
      
    }

    const deleteItem = async (product: Product): Promise<void> => {
        const index = shopingBag.findIndex((p) => p.id == product.id);
        shopingBag.splice(index, 1);
        await SaveShopingBagUseCase(shopingBag);
        getShoppingBag();
        
    }

    return (
        <ShopingBagContext.Provider value={{
            shopingBag,
            total,
             getShoppingBag,
             getTotal,
              saveItem, 
              deleteItem
              }}>
            {children}
        </ShopingBagContext.Provider>
    )
}
