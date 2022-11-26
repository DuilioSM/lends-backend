import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { addToken, addUserBusiness, addUserData } from "../features/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user_login } from "../api/user_api";
import { useDispatch } from "react-redux";
import { business_getById } from "../api/business_api";

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
function validationSchema() {
  return {
    email: Yup.string().required("El correo electrónico es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  };
}

const LoginScreen = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (data) =>
      user_login({
        email: data.email.toLowerCase(),
        password: data.password,
      })
        .then((result) => {
          if (result.status === 201) {
            dispatch(addToken(result.data.accessToken));
            dispatch(addUserData(result.data.user));

            //if the user has a business this part of code is going to fetch and set the information business
            result.data.user.business && business_getById(result.data.user.business, result.data.accessToken).then((result) => {
              console.log(result.data.data[0])
              dispatch(addUserBusiness(result.data.data[0]));
            }).catch((err) => {
              console.log(err);
            })
          }
          if (result.message === 'Invalid login') {
            Alert.alert('Credenciales incorrectas')
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
        <Text>{formik.errors.email}</Text>
        <TextInput
          placeholder="Correo eletrónico"
          autoCapitalize="none"
          keyboardType="email-address"
          value={formik.values.email}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          className="w-56 py-2 px-4 border-2 border-[#00CCBB] rounded-full "
        />
        <Text>{formik.errors.password}</Text>

        <TextInput
          placeholder="Contraseña"
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
        <Text className="text-white text-base">Iniciar sesión</Text>
      </TouchableOpacity>

      <View className="flex-row">
        <Text>¿Aún no tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigator.navigate("Register")}>
          <Text className="text-[#00CCBB]"> Crea una</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
