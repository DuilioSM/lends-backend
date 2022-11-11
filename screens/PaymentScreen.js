import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,

} from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import {
    selectBasketItems,
    selectBasketTotal,
} from "../features/basketSlice";
import { selectBusiness } from "../features/businessSlice";
import { getToken, selectUser } from "../features/authSlice";
import { payment_create } from "../api/intentPayment_api";
import { CardField } from "@stripe/stripe-react-native";

const BasketScreen = () => {
    const navigation = useNavigation();
    const userInfo = useSelector(selectUser);
    const business = useSelector(selectBusiness);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const token = useSelector(getToken)
    const [groupItemsInBasket, setgroupItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    const handleOrder = () => {
        order_create({
            customer: userInfo._id,
            business: business.id,
            items: groupItemsInBasket,
            total: basketTotal + 60,
        }, token)
            .then((result) => {
                if (result.status === 201) {
                    navigation.navigate("PreparingOrder");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setgroupItemsInBasket(groupedItems);
    }, [items]);

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="flex-2 bg-gray-100">
                <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center">Proceder al pago</Text>
                        <Text className="text-center text-gray-400">{business.title}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="rounded-full bg-gray-100 absolute top-3 right-5"
                    >
                        <XCircleIcon color="#00CCBB" height={50} width={50} />
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <CardField postalCodeEnabled={false} style={{ height: 50, width: '100%' }} />
                </View>
            </View>

            <View className="p-5 g-white mt-5 space-y-4">


                <View className="flex-row justify-between">
                    <Text className="">Total de la orden</Text>
                    <Text className="font-extrabold">
                        <Currency quantity={basketTotal + 60.0} currency="MXN" />
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => handleOrder()}
                    className="rounded-lg bg-[#00CCBB] p-4"
                >
                    <Text className="text-center text-white text-lg font-bold">
                        Pagar
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default BasketScreen;
