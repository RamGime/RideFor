import { ShopingBagRepositorioImpl } from "../../../Data/repositories/ShoppingBagRepository";
import React from 'react'
import { Product } from "../../entities/Product";

const {getShopingBag} = new ShopingBagRepositorioImpl


export const GetShopingBagUseCase = async() =>{
  return await getShopingBag();
}
