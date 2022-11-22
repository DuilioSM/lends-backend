import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import CryptoJS from 'crypto-js';
import { ArrowLeftIcon, CameraIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import * as ImagePicker from 'expo-image-picker';
import { getToken } from '../features/authSlice';
import { upload_image } from '../api/upload_api';
import { business_create } from '../api/business_api';
import { useFormik } from "formik";
import * as Yup from "yup";
import { removeToken, selectUser } from "../features/authSlice";


function initialValues() {
    return {
        _user: "",
        name: "",
        short_description: "",
        business_image: {
            id: "",
            url: ""
        },
        lat: null,
        long: null,
        direction: "",
        rating: "",
        categorie: "",

    };
}
function validationSchema() {
    return {
        name: Yup.string().required("El nombre del negocio es obligatorio"),
        short_description: Yup.string().required("La descripción del negocio es obligatorio"),
        business_image: Yup.object().required("La foto del negocio es obligatoria"),
        lat: Yup.number().required("La latitud del negocio es obligatoria"),
        long: Yup.number().required("La latitud del negocio es obligatoria"),
        direction: Yup.string().required("La dirección del negocio es obligatoria"),
        rating: Yup.number().required("El rating del negocio es obligatoria"),
        categorie: Yup.string().required("La categoría del negocio es obligatoria")
    };
}

const ManageBusinessScreen = () => {
    // const [form, setForm] = useState()
    const [business_image, setBusiness_image] = useState({
        id: "",
        url: ""
    })
    const userInfo = useSelector(selectUser);
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const token = useSelector(getToken)

    const navigation = useNavigation();


    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setGalleryPermission(galleryStatus.status === 'granted')
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
        // const url = "https://api.cloudinary.com/v1_1/dlxr7cwuy/upload"

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
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (data) => {
            business_create({ ...data, business_image, _user: userInfo._id }, token).then((result) => {
                if (result.status === 201) {
                    Alert.alert("El negocio ha sido actualizado")
                    navigation.goBack()
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
                            // uri: 'https://www.hogarmania.com/archivos/201904/herramientas-de-bricolaje-848x477x80xX.jpg'
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

                <View className=" mx-4 space-y-2">
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

                    <View className=" flex-row space-x-2 mx-2 items-center">
                        <View>
                            <Text>{formik.errors.lat}</Text>
                            <TextInput
                                placeholder="Latitud del negocio"
                                value={formik.values.lat}
                                keyboardType="decimal-pad"
                                onChangeText={(text) => formik.setFieldValue("lat", text)}
                                className="py-2 px-4  border-b-2 border-[#00CCBB]  "
                            />
                        </View>
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
                    </View>
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
                            value={formik.values.rating}
                            onChangeText={(text) => formik.setFieldValue("rating", text)}
                            className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
                        />
                    </View>

                    <View className="">
                        <Text>{formik.errors.categorie}</Text>
                        <TextInput
                            placeholder="Categoría "
                            value={formik.values.categorie}
                            onChangeText={(text) => formik.setFieldValue("categorie", text)}
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