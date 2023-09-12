import { Product } from "../entities/Product";

export interface ShopingBagRepositorio {
    save(products: Product[]): Promise<void>;
    getShopingBag(): Promise<Product[]>
}