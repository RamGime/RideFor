import { Product } from '../../Domain/entities/Product';
import { ShopingBagRepositorio } from '../../Domain/repositories/ShoppingBagRepository';
import { LocalStorage } from '../sources/local/LocalStorage';


export class ShopingBagRepositorioImpl implements ShopingBagRepositorio{

    async save(products: Product[]): Promise<void>{
    const {save} = LocalStorage()
    await save('shoping_bag',JSON.stringify(products))
    }
    async getShopingBag(): Promise<Product[]> {
        const {getItem} = LocalStorage()
        const data = await getItem('shoping_bag')
        const shopingBag: Product[] = JSON.parse(data as any)
        if(shopingBag === null){
            return []
        }
        else{
           
            return shopingBag
        }
    }
}