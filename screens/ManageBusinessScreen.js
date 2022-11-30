import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import CryptoJS from 'crypto-js';
import { ArrowLeftIcon, CameraIcon, ShoppingBagIcon, TruckIcon } from 'react-native-heroicons/outline';
import * as ImagePicker from 'expo-image-picker';
import { getToken, selectUserBusiness } from '../features/authSlice';
import { upload_image } from '../api/upload_api';
import { business_update } from '../api/business_api';
import { useFormik } from "formik";
import * as Yup from "yup";
import { selectUser } from "../features/authSlice";
import { user_add_business } from '../api/user_api';

function validationSchema() {
    return {
        name: Yup.string().required("El nombre del negocio es obligatorio"),
        short_description: Yup.string().required("La descripción del negocio es obligatorio"),
        business_image: Yup.object().required("La foto del negocio es obligatoria"),
        lat: Yup.number().required("La latitud del negocio es obligatoria"),
        long: Yup.number().required("La latitud del negocio es obligatoria"),
        direction: Yup.string().required("La dirección del negocio es obligatoria"),
        rating: Yup.number().required("El rating del negocio es obligatoria"),
        category: Yup.string().required("La categoría del negocio es obligatoria")
    };
}

const ManageBusinessScreen = () => {
    const [business_image, setBusiness_image] = useState({
        id: "",
        url: ""
    })
    const userInfo = useSelector(selectUser);
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const token = useSelector(getToken);
    const userBusiness = useSelector(selectUserBusiness)

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setGalleryPermission(galleryStatus.status === 'granted')
            setBusiness_image(userBusiness.business_image)
        })();
    }, []);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.cancelled) {
            setImage(result.uri)
        }
        const image = {
            uri: result.uri,
            name: result.fileName,
            type: result.type,
        }

        const ts = Math.round((new Date()).getTime() / 1000);
        const apiKey = "318646822589539";
        const apiSecret = "7mW_hKgw_ldLTthEJ_13H35nr10";
        const hash = `timestamp=${ts}${apiSecret}`;
        const signature = CryptoJS.SHA1(hash).toString();

        const formData = new FormData();

        formData.append('file', image);
        formData.append('timestamp', ts);
        formData.append('api_key', apiKey);
        formData.append('signature', signature);

        upload_image(formData)
            .then(result => {
                setBusiness_image({
                    id: result.data.asset_id,
                    url: result.data.secure_url
                })
            }).catch(err => {
                console.log(err)
            })

    }

    const formik = useFormik({
        initialValues: userBusiness,
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (data) => {
            business_update({ ...data, business_image }, userBusiness._id, token)
                .then((result) => {
                    if (result.status === 200) {
                        console.log(result)
                        Alert.alert("El negocio ha sido actualizado")
                        // navigation.goBack()
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
    return (
        <>
            <ScrollView>
                <View className="relative">
                    <Image
                        source={{
                            uri: business_image.url
                        }}
                        className="w-full h-56 bg-gray-300 p-4"
                    />
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
                    >
                        <ArrowLeftIcon size={25} color="#00CCBB" />
                    </TouchableOpacity>

                </View>
                <View className="bg-white">
                    <TouchableOpacity onPress={() => pickImage()} className="flex-row  items-center space-x-2 p-4 border-y border-gray-300">
                        <CameraIcon color="gray" opacity={0.6} size={30} />
                        <Text className="pl-2 flex-1 text-md font-bold">
                            Cambiar foto de negocio
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="bg-white">
                    <TouchableOpacity onPress={() => navigation.navigate("ManageProducts")} className="flex-row  items-center space-x-2 p-4 border-y border-gray-300">
                        <ShoppingBagIcon color="gray" opacity={0.6} size={30} />
                        <Text className="pl-2 flex-1 text-md font-bold">
                            Administrar productos
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="bg-white">
                    <TouchableOpacity onPress={() => navigation.navigate("ManageOrders")} className="flex-row  items-center space-x-2 p-4 border-y border-gray-300">
                        <TruckIcon color="gray" opacity={0.6} size={30} />
                        <Text className="pl-2 flex-1 text-md font-bold">
                            Solicitudes de pedidos
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className=" mx-4 mb-8 space-y-2">
                    <View className="">
                        <Text>{formik.errors.name}</Text>
                        <TextInput
                            placeholder="Nombre del negocio"
                            value={formik.values.name}
                            onChangeText={(text) => formik.setFieldValue("name", text)}
                            className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
                        />
                    </View>

                    <View className="">
                        <Text>{formik.errors.short_description}</Text>
                        <TextInput
                            placeholder="Breve descripción"
                            value={formik.values.short_description}
                            onChangeText={(text) => formik.setFieldValue("short_description", text)}
                            className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
                        />
                    </View>
                    <View>
                        <Text>{formik.errors.lat}</Text>
                        <TextInput
                            placeholder="Latitud del negocio"
                            value={JSON.stringify(formik.values.lat)}
                            keyboardType="decimal-pad"
                            onChangeText={(text) => formik.setFieldValue("lat", text)}
                            className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
                        />
                    </View>

                    <View>
                        <Text>{formik.errors.long}</Text>
                        <TextInput
                            placeholder="Longitud del negocio"
                            value={JSON.stringify(formik.values.long)}
                            keyboardType="decimal-pad"
                            onChangeText={(text) => formik.setFieldValue("long", text)}
                            className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]"
                        />
                    </View>
                    {/* <View className=" flex-row space-x-2 mx-2 items-center">

                        <View>
                            <Text>{formik.errors.long}</Text>
                            <TextInput
                                placeholder="Longitud del negocio"
                                value={formik.values.long}
                                keyboardType="decimal-pad"
                                onChangeText={(text) => formik.setFieldValue("long", text)}
                                className="py-2 px-4  border-b-2 border-[#00CCBB]  "
                            />
                        </View>
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={30} />
                    </View> */}
                    <View className="">
                        <Text>{formik.errors.direction}</Text>
                        <TextInput
                            placeholder="Dirección"
                            value={formik.values.direction}
                            onChangeText={(text) => formik.setFieldValue("direction", text)}
                            className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
                        />
                    </View>
                    <View className="">
                        <Text>{formik.errors.rating}</Text>
                        <TextInput
                            placeholder="Rating de google Maps"
                            value={JSON.stringify(formik.values.rating)}
                            onChangeText={(text) => formik.setFieldValue("rating", text)}
                            className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
                        />
                    </View>

                    <View className="mb-4">
                        <Text>{formik.errors.category}</Text>
                        <TextInput
                            placeholder="Categoría "
                            value={formik.values.category}
                            onChangeText={(text) => formik.setFieldValue("category", text)}
                            className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
                        />
                    </View>
                    <TouchableOpacity
                        onPress={formik.handleSubmit}
                        className="py-2 px-8 bg-[#00CCBB]  rounded-full"
                    >
                        <Text className="text-white text-base text-center">Guardar</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </>
    )
}

export default ManageBusinessScreen