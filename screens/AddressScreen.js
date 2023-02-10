import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { addUserData, getToken, selectUser } from '../features/authSlice';
import { user_add_address } from '../api/user_api';
import { useEffect } from 'react';

function initialValues() {
    return {
        street: "",
        city: "",
        postal_code: ""
    };
}

function validationSchema() {
    return {
        street: Yup.string().required("La dirección es obligatoria"),
        city: Yup.string().required("La ciudad es obligatoria"),
        postal_code: Yup.string().required("El código postal es obligatorio")
    };
}


const AddressScreen = () => {
    const navigation = useNavigation();
    const token = useSelector(getToken);
    const user = useSelector(selectUser);
    const dispatch = useDispatch()

    const { address } = user;

    const formik = useFormik({
        initialValues: address ? address : initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (data) => {
            user_add_address(data, user._id, token)
                .then((result) => {
                    if (result.status === 200) {
                        console.log(result.data)
                        dispatch(addUserData(result.data));
                        Alert.alert("Tu dirección se ha guardado")
                        navigation.goBack()
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
    useEffect(() => {
        console.log(user)
    }, [])
    return (
        <SafeAreaView className="flex-1 bg-gray-100 mx-4">
            <View className="space-y-2 flex-1">
                <View className="">
                    <Text>{formik.errors.street}</Text>
                    <TextInput
                        placeholder="Calle y número"
                        value={formik.values.street}
                        onChangeText={(text) => formik.setFieldValue("street", text)}
                        className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
                    />
                </View>

                <View className="">
                    <Text>{formik.errors.city}</Text>
                    <TextInput
                        placeholder="Ciudad"
                        value={formik.values.city}
                        onChangeText={(text) => formik.setFieldValue("city", text)}
                        className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
                    />
                </View>
                <View>
                    <Text>{formik.errors.postal_code}</Text>
                    <TextInput
                        placeholder="Código postal"
                        value={formik.values.postal_code}
                        keyboardType="decimal-pad"
                        onChangeText={(text) => formik.setFieldValue("postal_code", text)}
                        className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={formik.handleSubmit}
                className="py-2 px-8 bg-[#00CCBB]  rounded-full"
            >
                <Text className="text-white text-base text-center">Guardar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AddressScreen