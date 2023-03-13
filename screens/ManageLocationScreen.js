import { View, Text, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GooglePlacesInput from "../components/GooglePlacesInput";
import { selectUserBusiness, updateUserBusiness } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";

const ManageLocationScreen = () => {
  const userBusiness = useSelector(selectUserBusiness);
  const navigation = useNavigation();
  const [origin, setOrigin] = useState({
    location: {
      latitude: 19.4269532,
      longitude: -99.1677144,
    },
    formatted_address: null,
    rating: null,
  });
  const [addrInfo, setAddrInfo] = useState({
    location: {
      lat: null,
      long: null,
    },
    formatted_address: null,
    rating: null,
  });

  const ref = useRef();
  const dispatch = useDispatch();

  const handleUpdate = (data) => {
    dispatch(updateUserBusiness(data));
    navigation.goBack();
    console.log(data);
  };

  return (
    <View className="flex-1">
      <View className="absolute right-2 left-2 top-2 z-10 shadow-lg">
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Buscar"
          onPress={(data, details = null) => {
            setOrigin({
              location: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              },
              formatted_address: details.formatted_address,
              rating: details.rating,
            });
            setAddrInfo({
              location: {
                lat: details.geometry.location.lat,
                long: details.geometry.location.lng,
              },
              formatted_address: details.formatted_address,
              rating: details.rating,
            });
          }}
          query={{
            key: "AIzaSyBAmOFSGvzRielqW7BnRVh5HrZSOzQiZ4M",
            language: "es",
          }}
          fetchDetails={true}
        />
      </View>

      <MapView
        region={{
          latitude: origin.location.latitude,
          longitude: origin.location.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        className="flex-1 relative"
        mapType="mutedStandard"
        showsUserLocation
      >
        <Marker
          coordinate={origin.location}
          draggable
          onDragEnd={(address) => {
            console.log(address.nativeEvent.coordinate);
          }}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <Pressable
        onPress={() => handleUpdate(addrInfo)}
        className="absolute right-2 left-2 bottom-8 z-20 shadow-lg bg-[#00CCBB] p-4  rounded-full"
      >
        <Text className=" text-center font-bold text-lg text-white">
          Aceptar
        </Text>
      </Pressable>
    </View>
  );
};

export default ManageLocationScreen;
