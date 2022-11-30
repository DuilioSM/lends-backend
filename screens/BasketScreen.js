import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import {
  selectBasketItems,
  removeFromBasket,
  selectBasketTotal,
  cleanBasket
} from "../features/basketSlice";
import { selectBusiness } from "../features/businessSlice";
import { getToken, selectUser } from "../features/authSlice";
import { order_create } from "../api/order_api";
import { payment_create } from "../api/intentPayment_api";

const BasketScreen = () => {
  const [cardDetails, setCardDetails] = useState()
  const [key, setKey] = useState()
  const [groupItemsInBasket, setgroupItemsInBasket] = useState([]);

  const { confirmPayment, loading } = useConfirmPayment()
  const navigation = useNavigation();
  const userInfo = useSelector(selectUser);
  const business = useSelector(selectBusiness);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const token = useSelector(getToken)
  const dispatch = useDispatch();

  const fetchIntentPayment = async () => {
    payment_create({
      amount: (basketTotal + 60) * 100,
      currency: "mxn"
    }, token)
      .then(result => {
        if (result.status == 201) {
          setKey(result.data);
        }
      }).catch(err => {
        console.log(err)
      })
  }

  const handleOrder = async () => {
    if (!cardDetails?.complete) {
      Alert.alert("Por favor introduce los detalles de pago");
      return
    }
    await fetchIntentPayment();
    const { error } = await confirmPayment(key, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        email: userInfo.email
      }

    });

    if (error) {
      Alert.alert('Error', error.localizedMessage);
      console.log(error)
    } else {
      order_create({
        customer: userInfo._id,
        business: business.id,
        businessTitle: business.title,
        items: groupItemsInBasket,
        total: basketTotal + 60,
        stripeId: key
      }, token)
        .then((result) => {
          if (result.status === 201) {
            navigation.navigate("PreparingOrder");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      dispatch(cleanBasket())
    }

    // order_create({
    //   customer: userInfo._id,
    //   business: business.id,
    //   items: groupItemsInBasket,
    //   total: basketTotal + 60,
    // }, token)
    //   .then((result) => {
    //     if (result.status === 201) {
    //       navigation.navigate("PreparingOrder");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

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
            <Text className="text-lg font-bold text-center">Canasta</Text>
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
          <Image
            source={{ uri: "http://links.papareact.com/wru" }}
            className="h-7 w-9 bg-gray-30 p-4 rounded-full"
          />
          <Text className="flex-1">Entrega el mismo día</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Cambiar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="divide-y divide-gray-200">
        {Object.entries(groupItemsInBasket).map(([key, items]) => (
          <View
            key={key}
            className="flex-row items-center space-x-3 bg-white py-2 px-5"
          >
            <Text className="text-[#00CCBB]">{items.length} x</Text>
            <Image
              source={{ uri: items[0]?.url }}
              // source={{ uri: urlFor(items[0]?.image).url() }}
              className="h-12 w-12 rounded-full"
            />
            <Text className="flex-1">{items[0]?.name}</Text>
            <Text>
              <Currency quantity={items[0]?.rental_price} currency="MXN" />
            </Text>
            <TouchableOpacity>
              <Text
                className="text-[#00CCBB] text-xs"
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                Eliminar
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View className="p-5 g-white mt-5 space-y-4">
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Subtotal</Text>
          <Text className="text-gray-400">
            <Currency quantity={basketTotal} currency="MXN" />
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Costo de entrega</Text>
          <Text className="text-gray-400">
            <Currency quantity={60.0} currency="MXN" />
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="">Total de la orden</Text>
          <Text className="font-extrabold">
            <Currency quantity={basketTotal + 60.0} currency="MXN" />
          </Text>
        </View>
        <View className="flex-row justify-between px-4 py-3 bg-white rounded-lg">
          <CardField onCardChange={cardDetails => setCardDetails(cardDetails)} postalCodeEnabled={false} style={{ height: 40, width: '100%' }} />
        </View>
        <TouchableOpacity
          onPress={() => handleOrder()}
          className="rounded-lg bg-[#00CCBB] p-4"
          disabled={loading}
        >
          <Text className="text-center text-white text-lg font-bold">
            Ordenar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default BasketScreen;
