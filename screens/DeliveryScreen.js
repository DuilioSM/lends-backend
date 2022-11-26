import { useNavigation } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { selectBusiness } from "../features/businessSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const business = useSelector(selectBusiness);

  return (
    <View className="bg-[#00CCBB] flex-1 ">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XCircleIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Pedido</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Llegada estimada</Text>
              <Text className="text-4xl font-bold">Hoy</Text>
            </View>
            <Image
              source={{ uri: "https://links.papareact.com/fls" }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Tu orden de "{business.title}" esta en proceso
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: business.lat,
          longitude: business.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: business.lat,
            longitude: business.long,
          }}
          title={business.title}
          description={business.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Usuario Name</Text>
          <Text className="text-gray-400"> COnductor</Text>
        </View>
        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
