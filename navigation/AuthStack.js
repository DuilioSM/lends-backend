import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BasketScreen from "../screens/BasketScreen";
import BusinessScreen from "../screens/BusinessScreen";
import DeliveryScreen from "../screens/DeliveryScreen";
import HomeScreen from "../screens/HomeScreen";
import PreparingOrderScreen from "../screens/PreparingOrderScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ManageBusinessScreen from "../screens/ManageBusinessScreen";
import ManageProductsScreen from "../screens/ManageProductsScreen";
import ProductScreen from "../screens/ProductScreen";
import CreateBusinessScreen from "../screens/CreateBusinessScreen";
import ManageOrdersScreen from "../screens/ManageOrdersScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Business" component={BusinessScreen} />
      <Stack.Screen
        name="Basket"
        component={BasketScreen}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="PreparingOrder"
        component={PreparingOrderScreen}
        options={{ presentation: "fullScreenModal", headerShown: false }}
      />
      <Stack.Screen
        name="Delivery"
        component={DeliveryScreen}
        options={{ presentation: "fullScreenModal", headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="ManageBusiness"
        component={ManageBusinessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateBusiness"
        component={CreateBusinessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageProducts"
        component={ManageProductsScreen}
        options={{ title: "Mi catálogo", headerBackTitle: "Volver" }}
      // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageOrders"
        component={ManageOrdersScreen}
        options={{ title: "Solicitudes de ordenes", headerBackTitle: "Volver" }}
      // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
