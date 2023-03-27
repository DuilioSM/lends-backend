import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import {
  ArrowLeftIcon,
  CameraIcon,
  MapPinIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";

import { getToken, selectUserBusiness } from "../features/authSlice";
import { upload_image } from "../api/upload_api";
import { business_create } from "../api/business_api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { selectUser } from "../features/authSlice";
import { user_add_business } from "../api/user_api";

function initialValues() {
  return {
    _user: "",
    name: "",
    short_description: "",
    business_image: {
      id: "",
      url: "",
    },
    category: "",
  };
}
function validationSchema() {
  return {
    name: Yup.string().required("El nombre del negocio es obligatorio"),
    short_description: Yup.string().required(
      "La descripción del negocio es obligatorio"
    ),
    business_image: Yup.object().required("La foto del negocio es obligatoria"),
    category: Yup.string().required("La categoría del negocio es obligatoria"),
  };
}

const CreateBusinessScreen = () => {
  const [business_image, setBusiness_image] = useState({
    id: "",
    url: "",
  });
  const userInfo = useSelector(selectUser);
  const userBusiness = useSelector(selectUserBusiness);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [featuredCategories, setFeaturedCategories] = useState();

  const [image, setImage] = useState(null);
  const token = useSelector(getToken);
  const { data, error, loading, refetch } = useGetCategoriesQuery();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    data && setFeaturedCategories(data.data);
  }, [data]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
    const image = {
      uri: result.uri,
      name: result.fileName,
      type: result.type,
    };

    const ts = Math.round(new Date().getTime() / 1000);
    const apiKey = "318646822589539";
    const apiSecret = "7mW_hKgw_ldLTthEJ_13H35nr10";
    const hash = `timestamp=${ts}${apiSecret}`;
    const signature = CryptoJS.SHA1(hash).toString();

    const formData = new FormData();

    formData.append("file", image);
    formData.append("timestamp", ts);
    formData.append("api_key", apiKey);
    formData.append("signature", signature);

    upload_image(formData)
      .then((result) => {
        setBusiness_image({
          id: result.data.asset_id,
          url: result.data.secure_url,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (data) => {
      business_create(
        { ...data, ...userBusiness, business_image, _user: userInfo._id },
        token
      )
        .then((result) => {
          if (result.status === 201) {
            user_add_business(result.data._id, result.data._user, token)
              .then((result) => {
                if (result.status === 200) {
                  Alert.alert(
                    "Felicidades el negocio ha sido creado!",
                    "Para ver cambios por favor vuelve a iniciar sesión"
                  );
                  navigation.goBack();
                }
              })
              .catch((err) => {
                Alert.alert(err);
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <SafeAreaView className="bg-white">
      <ScrollView className=" bg-white ">
        <View className="relative ">
          {business_image.url ? (
            <Image
              source={{ uri: business_image.url }}
              className="w-full h-56 bg-gray-300 p-4"
            />
          ) : (
            <Image
              source={{
                uri: "https://res.cloudinary.com/dlxr7cwuy/image/upload/v1669443800/notSelected_lrt0pc.gif",
              }}
              className="w-full h-56 bg-gray-300 p-4"
            />
          )}

          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-4 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={25} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <TouchableOpacity
            onPress={() => pickImage()}
            className="flex-row  items-center space-x-2 p-4 border-y border-gray-300"
          >
            <CameraIcon color="gray" opacity={0.6} size={30} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Cambiar foto de negocio
            </Text>
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <TouchableOpacity
            onPress={() => navigation.navigate("ManageLocation")}
            className="flex-row  items-center space-x-2 p-4 border-y border-gray-300"
          >
            <MapPinIcon color="gray" opacity={0.6} size={30} />
            <Text className="pl-2 flex-1 text-md font-bold">Dirección</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <TouchableOpacity
            onPress={() => navigation.navigate("ManageProducts")}
            className="flex-row  items-center space-x-2 p-4 border-y border-gray-300"
          >
            <ShoppingBagIcon color="gray" opacity={0.6} size={30} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Administrar productos
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
              onChangeText={(text) =>
                formik.setFieldValue("short_description", text)
              }
              className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
            />
          </View>
          <View className="mb-5">
            <Text>{formik.errors.category}</Text>
            <TextInput
              placeholder="Añade tu categoría"
              value={formik.values.category}
              onChangeText={(text) => formik.setFieldValue("category", text)}
              className="py-2 px-4 mx-2 border-b-2 border-[#00CCBB]  "
            />
          </View>

          <View className="mb-5">
            {/* apenas copie y pegue esto */}
            <Dropdown
              data={data}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={!isFocus ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>

          <TouchableOpacity
            onPress={() => formik.handleSubmit()}
            className="py-2 px-8 bg-[#00CCBB]  rounded-full mb-5"
          >
            <Text className="text-white text-base  text-center">Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateBusinessScreen;
