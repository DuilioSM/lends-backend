import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList
} from "react-native";
import { format } from "date-fns";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useSelector, useDispatch } from "react-redux";
import { orders_getAll } from "../api/order_api";
import { selectUser, getToken } from "../features/authSlice";
import { selectOrders, addOrders } from "../features/ordersSlice";

const OrdersScreen = () => {
    const [orders, setOrders] = useState([]);
    const navigation = useNavigation();
    const userInfo = useSelector(selectUser);
    const token = useSelector(getToken);
    // const orders = useSelector(selectOrders);
    // const dispatch = useDispatch();


    useEffect(() => {
        orders_getAll(userInfo._id, token)
            .then((result) => {
                if (result.status === 200) {
                    setOrders(result.data.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    const renderItem = ({ item }) => (
        <View className=" bg-white m-2 rounded-lg shadow-lg p-4">
            <View >
                <View>
                    <Text className="text-lg text-[#00CCBB] font-bold">{item.businessTitle}</Text>
                    <Text className="text-lg font-bold">Order: {item._id}</Text>

                    <Text className="text-lg ">{format(new Date(item.createdAt), "hh:mm dd MMMM yy")}</Text>
                </View>
                <Text className="text-lg font-bold">$ {item.total}</Text>

            </View>
            {
                item.status === "Aceptado" && <Text className="text-green-500 text-lg font-bold self-end">{item.status}</Text>
            }
            {
                item.status === "Rechazado" && <Text className="text-red-500 text-lg font-bold self-end">{item.status}</Text>
            }
        </View>

    );


    return (
        <SafeAreaView className="flex-1 bg-gray-100 justify-between">
            <View className="flex-1 bg-gray-100">
                <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center">Pedidos</Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="rounded-full bg-gray-100 absolute top-3 right-5"
                    >
                        <XCircleIcon color="#00CCBB" height={50} width={50} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={orders}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            </View>
        </SafeAreaView>
    )
}

export default OrdersScreen;