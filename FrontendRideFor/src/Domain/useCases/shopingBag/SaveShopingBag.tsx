import { ShopingBagRepositorioImpl } from "../../../Data/repositories/ShoppingBagRepository";

const {save} = new ShopingBagRepositorioImpl

import React from 'react'
import { Product } from "../../entities/Product";

export const SaveShopingBagUseCase = async(products: Product[]) =>{
  return await save(products);
}
