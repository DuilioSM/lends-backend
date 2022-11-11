import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
//import { addToken, getToken } from "../features/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user_register } from "../api/user_api";

//Yup and formik
function initialValues() {
  return {
    fullname: "",
    email: "",
    telephone: "",
    password: "",
  };
}
function validationSchema() {
  return {
    fullname: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string().required("El correo electrónico es obligatorio"),
    telephone: Yup.number().required("El teléfono es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  };
}

const RegisterScreen = () => {
  const navigator = useNavigation();
  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (data) =>
      user_register({
        fullname: data.fullname,
        telephone: data.telephone,
        email: data.email.toLowerCase(),
        password: data.password,
      })
        .then((result) => {
          if (result.status === 201) {
            Alert.alert(
              "Usuario creado correctamente",
              "Por favor regresa al inicio de sesión",
              [
                {
                  text: "Ir",
                  onPress: () => navigator.navigate("Login"),
                },
              ]
            );
          }
        })
        .catch((err) => {
          console.log(err);
        }),
  });

  return (
    <SafeAreaView className="bg-white flex-1 items-center justify-center space-y-8">
      <Image source={require("../assets/logo.png")} className="h-16 w-2/3" />
      <View className={`${formik.errors ? "space-y-2" : "space-y-3"}`}>
        <Text>{formik.errors.fullname}</Text>
        <TextInput
          placeholder="Nombre completo"
          value={formik.values.fullname}
          onChangeText={(text) => formik.setFieldValue("fullname", text)}
          className="w-56 py-2 px-4 border-2 border-[#00CCBB] rounded-full "
        />
        <Text>{formik.errors.email}</Text>
        <TextInput
          placeholder="Correo eletrónico"
          autoCapitalize="none"
          keyboardType="email-address"
          value={formik.values.email}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          className="w-56 py-2 px-4 border-2 border-[#00CCBB] rounded-full "
        />
        <Text>{formik.errors.telephone}</Text>
        <TextInput
          placeholder="Número de teléfono"
          keyboardType="number-pad"
          value={formik.values.telephone}
          onChangeText={(text) => formik.setFieldValue("telephone", text)}
          className="w-56 py-2 px-4 border-2 border-[#00CCBB] rounded-full "
        />
        <Text>{formik.errors.password}</Text>
        <TextInput
          placeholder="Contraseña"
          autoCapitalize="none"
          secureTextEntry={true}
          className="w-56 py-2 px-4 border-2 border-[#00CCBB] rounded-full"
        />
        <Text>{formik.errors.password}</Text>
        <TextInput
          placeholder="Confirmar contraseña"
          autoCapitalize="none"
          secureTextEntry={true}
          value={formik.values.password}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          className="w-56 py-2 px-4 border-2 border-[#00CCBB] rounded-full"
        />
      </View>
      <TouchableOpacity
        onPress={formik.handleSubmit}
        className="py-2 px-8 bg-[#00CCBB]  rounded-full"
      >
        <Text className="text-white text-base">Regístrarse</Text>
      </TouchableOpacity>

      <View className="flex-row">
        <Text>Ya tengo una cuenta</Text>
        <TouchableOpacity onPress={() => navigator.navigate("Login")}>
          <Text className="text-[#00CCBB]"> Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
