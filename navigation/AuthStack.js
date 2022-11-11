import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BasketScreen from "../screens/BasketScreen";
import BusinessScreen from "../screens/BusinessScreen";
import DeliveryScreen from "../screens/DeliveryScreen";
import HomeScreen from "../screens/HomeScreen";
import PreparingOrderScreen from "../screens/PreparingOrderScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import OrdersScreen from "../screens/OrdersScreen";

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
    </Stack.Navigator>
  );
};

export default AuthStack;
