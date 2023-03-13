import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { business_getAll, business_getByCategory } from "../api/business_api";
import { getToken } from "../features/authSlice";
import BusinessCard from "./BusinessCard";
import sanityClient from "../sanity";
import { useSelector } from "react-redux";

const FeaturedRow = ({ id, title, description }) => {
  const [business, setBusiness] = useState([]);
  const token = useSelector(getToken);

  useEffect(() => {
    business_getByCategory(title, token)
      .then((result) => {
        if (result.status === 200) {
          setBusiness(result.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg ">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {business?.map((busi) => (
          <BusinessCard
            key={busi._id}
            id={busi._id}
            imgUrl={busi.business_image.url}
            title={busi.name}
            rating={busi.rating}
            genre={busi.type?.name || "Otro"}
            address={busi.formatted_address}
            short_description={busi.short_description}
            articles={busi.articles}
            long={busi.location.long}
            lat={busi.location.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
