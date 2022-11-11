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
        orders_getAll(token, userInfo._id)
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
        // flex-row items-center space-x-4 px-4 py-3
        <View className="flex-row justify-between items-end bg-white m-2 rounded-lg shadow-lg p-4">
            {/* <AtSymbolIcon size={35} color="#00CCBB" /> */}

            <View>
                <Text className="text-lg text-[#00CCBB] font-bold">{item.businessTitle}</Text>
                <Text className="text-lg ">{format(new Date(item.createdAt), "hh:mm dd MMMM yy")}</Text>
            </View>
            <Text className="text-lg font-bold">$ {item.total}</Text>
        </View>

    );


    return (
        <SafeAreaView className="flex-1 bg-gray-100 justify-between">
            <View className="flex-2 bg-gray-100">
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
                {/* {orders &&
                    orders.map((order) => (
                        <Text key={order._id} className="flex-1 text-lg font-semibold">{order.total}</Text>
                    ))
                } */}

                {/* <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-1">                */}

                {/* <AtSymbolIcon size={35} color="#00CCBB" /> */}
                {/* <Text className="flex-1 text-lg ">{userInfo.email}</Text> */}
                {/* </View> */}

            </View>
        </SafeAreaView>
    )
}

export default OrdersScreen;