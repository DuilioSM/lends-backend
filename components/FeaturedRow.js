import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import BusinessCard from "./BusinessCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured" && _id == $id]{
      ...,
      business[]->{
        ...,
        articles[]->,
        type{
          name
        }
      }
    }[0]
    `,
        { id }
      )
      .then((data) => setBusiness(data?.business));
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
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
            imgUrl={busi.image}
            title={busi.name}
            rating={busi.rating}
            genre={busi.type?.name || "Otro"}
            address={busi.address}
            short_description={busi.short_description}
            articles={busi.articles}
            long={busi.long}
            lat={busi.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
