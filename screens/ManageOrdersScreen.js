import { View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native'
import { useState, useEffect } from 'react';
import { getToken, selectUser } from '../features/authSlice';
import { useSelector } from 'react-redux';
import Currency from "react-currency-formatter";
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { orders_getByBusiness, order_updateStatus } from '../api/order_api';


const ManageOrdersScreen = () => {
    const [orders, setOrders] = useState([]);
    const token = useSelector(getToken);
    const userInfo = useSelector(selectUser);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        orders_getByBusiness(userInfo.business, token)
            .then((result) => {
                if (result.status === 200) {
                    setOrders(result.data.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setRefreshing(false)
    }, []);

    const handleAccept = (order) => {
        order_updateStatus('Aceptado', order, token)
            .then((result) => {
                if (result.status === 200) {
                    Alert.alert("El pedido ha sido aceptado")
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDeclined = (order) => {
        order_updateStatus('Rechazado', order, token)
            .then((result) => {
                if (result.status === 200) {
                    Alert.alert("El pedido ha sido rechazado")
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        orders_getByBusiness(userInfo.business, token)
            .then((result) => {
                if (result.status === 200) {
                    setOrders(result.data.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const renderItem = ({ item }) => {
        const itemArray = Object.entries(item.items)
        console.log(itemArray)

        return (
            <View onPress={() => navigation.navigate("")} className="flex rounded-md shadow-md p-4 my-1 mx-2 bg-white" >
                <Text className="text-lg font-bol ">Orden: {item._id}</Text>

                {
                    itemArray.map((item) => (
                        <View className="flex-row my-2  space-x-2">
                            <Text className="text-[#00CCBB] text-lg font-semibold">{item[1].length} x</Text>
                            <Text className="flex-1 text-lg font-semibold">{item[1][0].name}</Text>
                            <Text className="text-lg  ">
                                <Currency quantity={item[1][0].rental_price} currency="MXN" />
                            </Text>
                        </View>
                    ))
                }
                {
                    item.status === "Aceptado" && <Text className="text-green-500 text-lg font-bold self-end">{item.status}</Text>
                }
                {
                    item.status === "Rechazado" && <Text className="text-red-500 text-lg font-bold self-end">{item.status}</Text>
                }
                <View className="flex-row mt-2 justify-end space-x-2">
                    <TouchableOpacity onPress={() => handleAccept(item._id)} className="bg-green-600 rounded-full">
                        <Text className="flex-1 text-lg font-semibold text-white px-3 py-1">Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeclined(item._id)} className="bg-red-600 rounded-full">
                        <Text className="flex-1 text-lg font-semibold text-white px-3 py-1">Rechazar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    };

    return (
        <SafeAreaView className="flex-1 m-2 space-y-2">
            {
                orders ?
                    <FlatList
                        data={orders}
                        renderItem={renderItem}
                        keyExtractor={order => order._id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }

                    /> :
                    <Text>No hay solicitudes aún</Text>
            }
        </SafeAreaView>
    )
}

export default ManageOrdersScreen;