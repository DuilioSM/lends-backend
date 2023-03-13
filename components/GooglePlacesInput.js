import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { updateUserBusiness } from "../features/authSlice";

const GooglePlacesInput = ({ data }) => {
  const ref = useRef();
  const dispatch = useDispatch();

  const handleUpdate = (location, formatted_address, rating) => {
    dispatch(
      updateUserBusiness({
        location,
        formatted_address,
        rating,
      })
    );
  };

  // useEffect(() => {
  //   data.formatted_address &&
  //     ref.current?.setAddressText(data.formatted_address);
  // }, []);

  return (
    <View className="absolute right-2 left-2 top-2 z-10">
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Buscar"
        currentLocationLabel={true}
        onPress={(data, details = null) => {
          handleUpdate(
            details.geometry.location,
            details.formatted_address,
            details.rating
          );
          console.log(
            details.geometry.location,
            details.formatted_address,
            details.rating
          );
        }}
        query={{
          key: "AIzaSyBAmOFSGvzRielqW7BnRVh5HrZSOzQiZ4M",
          language: "es",
        }}
        fetchDetails={true}
      />
    </View>
  );
};

export default GooglePlacesInput;
