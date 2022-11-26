import { View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { useState, useEffect } from 'react';
import { product_by_business } from '../api/product_api';
import { getToken, selectUser } from '../features/authSlice';
import { useSelector } from 'react-redux';
import Currency from "react-currency-formatter";
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';


const ManageProductsScreen = () => {
    const [products, setProducts] = useState([]);
    const token = useSelector(getToken);
    const userInfo = useSelector(selectUser);
    const navigation = useNavigation();

    useEffect(() => {
        product_by_business(token, userInfo.business)
            .then((result) => {
                if (result.status === 200) {
                    setProducts(result.data.data)
                    console.log(result.data.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        // console.log(userInfo.business)
        product_by_business(token, userInfo.business)
            .then((result) => {
                if (result.status === 200) {
                    setProducts(result.data.data)
                    console.log(result.data.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setRefreshing(false)
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Product", { item })} className="flex-row  rounded-md shadow-md p-2 my-1 bg-white">
            <View className="flex-1 pr-2">
                <Text className="text-xl mb-1">{item.name}</Text>
                <Text className="text-gray-400">{item.short_description}</Text>
                <Text className="text-gray-400 mt-1">Stock: {item.quantity}</Text>
                <Text className="text-gray-400 mt-2">
                    <Currency currency="MXN" quantity={item.rental_price} />
                </Text>
            </View>
            <View className="">
                <Image
                    style={{
                        borderWidth: 1,
                        borderColor: "#F3F3F4",
                    }}
                    source={{ uri: item.product_image.url }}
                    className="h-24 w-24 bg-gray-300 p-4 "
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 m-2 space-y-2">

            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }

            />
            <TouchableOpacity
                onPress={() => navigation.navigate("Product")}
                className="rounded-lg bg-[#00CCBB] p-4"
            >
                <Text className="text-center text-white text-lg font-bold">
                    Crear nuevo
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ManageProductsScreen