import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { XCircleIcon, UserIcon, AtSymbolIcon, ArchiveBoxIcon, BuildingStorefrontIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, selectUser } from "../features/authSlice";


const ProfileScreen = () => {
    const navigation = useNavigation();
    const userInfo = useSelector(selectUser);
    const dispatch = useDispatch();
    return (
        <SafeAreaView className="flex-1 bg-gray-100 justify-between">
            <View className="flex-2 bg-gray-100">
                <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center">Perfil</Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="rounded-full bg-gray-100 absolute top-3 right-5"
                    >
                        <XCircleIcon color="#00CCBB" height={50} width={50} />
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white mb-1 mt-2">
                    <UserIcon size={35} color="#00CCBB" />
                    <Text className="flex-1 text-lg font-semibold">{userInfo.fullname}</Text>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-1">
                    <AtSymbolIcon size={35} color="#00CCBB" />
                    <Text className="flex-1 text-lg ">{userInfo.email}</Text>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-1">
                    <ArchiveBoxIcon size={35} color="#00CCBB" />
                    <Text className="flex-1 text-lg ">Pedidos</Text>

                    <TouchableOpacity>
                        <Text onPress={() => navigation.navigate("Orders")} className="text-[#00CCBB]">Revisar</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-1">
                    <BuildingStorefrontIcon size={35} color="#00CCBB" />
                    <Text className="flex-1 text-lg ">Negocio</Text>

                    <TouchableOpacity>
                        {
                            userInfo.business ?
                                (<Text onPress={() => {
                                    navigation.goBack()
                                    navigation.navigate("ManageBusiness")
                                }} className="text-[#00CCBB]">Administrar</Text>) :
                                (
                                    <Text onPress={() => {
                                        navigation.goBack()
                                        navigation.navigate("CreateBusiness")
                                    }} className="text-[#00CCBB]">Crear negocio</Text>
                                )
                        }
                    </TouchableOpacity>
                </View>

            </View>

            <View className="p-5 g-white mt-5 space-y-4">


                <TouchableOpacity
                    onPress={() => dispatch(removeToken())}
                    className="rounded-lg bg-red-500 p-4"
                >
                    <Text className="text-center text-white text-lg font-bold">
                        Cerrar sesión
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default ProfileScreen;
