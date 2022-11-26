import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftIcon, CameraIcon } from 'react-native-heroicons/outline';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from "formik";
import * as Yup from "yup";
import CryptoJS from 'crypto-js';
import { upload_image } from '../api/upload_api';
import { getToken, selectUser } from '../features/authSlice';
import { product_create } from '../api/product_api';
import { useEffect } from 'react';

function initialValues() {
    return {
        name: "",
        short_description: "",
        product_image: {
            id: "",
            url: ""
        },
        rental_price: null,
        quantity: null
    };
}

function validationSchema() {
    return {
        name: Yup.string().required("El nombre del negocio es obligatorio"),
        short_description: Yup.string().required("La descripción del negocio es obligatorio"),
        product_image: Yup.object().required("La foto del negocio es obligatoria"),
        rental_price: Yup.number().required("El precio de renta es obligatorio"),
        quantity: Yup.number().required("La cantidad de productos es obligatoria"),
    };
}


const ProductScreen = () => {
    const navigation = useNavigation();
    const [product_image, setProduct_image] = useState({
        id: "",
        url: ""
    })
    const userInfo = useSelector(selectUser);
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const token = useSelector(getToken);
    // const {
    //     params: { item },
    // } = useRoute();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
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
                setProduct_image({
                    id: result.data.asset_id,
                    url: result.data.secure_url
                })
            }).catch(err => {
                console.log(err)
            })
    }

    const formik = useFormik({
        // initialValues: item ? item : initialValues(),
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (data) => {
            product_create({ ...data, product_image, _business: userInfo.business }, token).then((result) => {
                if (result.status === 201) {
                    Alert.alert("El producto ha sido guardado")
                    navigation.goBack()
                }
            })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
    // console.log(formik.initialValues)
    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="relative">
                <Image
                    source={{
                        // uri: 'https://www.hogarmania.com/archivos/201904/herramientas-de-bricolaje-848x477x80xX.jpg'
                        uri: product_image.url
                    }}
                    className="w-full h-56 bg-gray-300 p-4"
                />
                <TouchableOpacity
                    onPress={navigation.goBack}
                    className="absolute top-5 left-5 p-2 bg-gray-100 rounded-full"
                >
                    <ArrowLeftIcon size={25} color="#00CCBB" />
                </TouchableOpacity>
            </View>
            <View className="bg-white">
                <TouchableOpacity onPress={() => pickImage()} className="flex-row  items-center space-x-2 p-4 border-y border-gray-300">
                    <CameraIcon color="gray" opacity={0.6} size={30} />
                    <Text className="pl-2 flex-1 text-md font-bold">
                        Seleccionar foto
                    </Text>
                </TouchableOpacity>
            </View>

            <View className=" mx-4 space-y-2">
                <View className="">
                    <Text>{formik.errors.name}</Text>
                    <TextInput
                        placeholder="Nombre del producto"
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
                    <Text>{formik.errors.rental_price}</Text>
                    <TextInput
                        placeholder="Precio de renta"
                        value={formik.values.rental_price}
                        keyboardType="decimal-pad"
                        onChangeText={(text) => formik.setFieldValue("rental_price", text)}
                        className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
                    />
                </View>
                <View>
                    <Text>{formik.errors.quantity}</Text>
                    {/* <Text>{formik.values.quantity}</Text> */}
                    <TextInput
                        placeholder="Cantidad en stock"
                        value={formik.values.quantity}
                        keyboardType="decimal-pad"
                        onChangeText={(text) => formik.setFieldValue("quantity", text)}
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

        </SafeAreaView>
    )
}

export default ProductScreen