import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList";
import { ClientProductListScreen } from "../views/client/product/list/ProductList";
import { ClientProductDetailScreen } from "../views/client/product/detail/ProductDetail";
import { Product } from "../../Domain/entities/Product";
import { TouchableOpacity, Image } from 'react-native';
import { ClientshopingBagScreen } from "../views/client/shopingBag/shopingBag";
import { ShopingBagProvider } from "../context/ShopingBagContex";

export type ClientStackParamList = {
  ClientCategoryListScreen: undefined,
  ClientProductListScreen: {id_category: string}
  ClientProductDetailScreen: {product: Product}
  ClientshopingBagScreen: undefined
}


const Stack = createNativeStackNavigator<ClientStackParamList>();

export const ClientStackNavigator = () => {
  return (
    <ShopingBagState>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='ClientCategoryListScreen'
          component={ClientCategoryListScreen}
          options={ ({route, navigation}) => (
            {
              headerShown: true,
              title: 'Categorias',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ClientshopingBagScreen')}>
                  <Image 
                    source={ require('../../../assets/shopping_cart.png') }
                    style={{ width:30, height: 30}}
                  />
                </TouchableOpacity>
              )
            }
          )}
        />

        <Stack.Screen
          name='ClientProductListScreen'
          component={ClientProductListScreen}
          options={ ({route, navigation}) => (
            {
              headerShown: true,
              title: 'Productos',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ClientshopingBagScreen')}>
                  <Image 
                    source={ require('../../../assets/shopping_cart.png') }
                    style={{ width:30, height: 30}}
                  />
                </TouchableOpacity>
              )
            }
          )}
        />

        <Stack.Screen
          name='ClientProductDetailScreen'
          component={ClientProductDetailScreen}
        />
         <Stack.Screen
          name='ClientshopingBagScreen'
          component={ClientshopingBagScreen}
          options={{
            headerShown: true,
            title: 'mi orden'
          }}
        />



      </Stack.Navigator>
    </ShopingBagState>
  )
}

const ShopingBagState = ({ children }: any) => {
  return (
    <ShopingBagProvider>
      {children}
    </ShopingBagProvider>
  )
}
