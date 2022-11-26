import { View, Text } from 'react-native'
import React from 'react'


const ProductCard = ({ name, description, price, image }) => {

    return (
        <TouchableOpacity
            className={`bg-white border p-4 border-gray-200 border-b-0`}
        >
            <View className="flex-row">
                <View className="flex-1 pr-2">
                    <Text className="text-xl mb-1">{name}</Text>
                    <Text className="text-gray-400">{description}</Text>
                    <Text className="text-gray-400 mt-2">
                        <Currency currency="MXN" quantity={price} />
                    </Text>
                </View>
                <View className="">
                    <Image
                        style={{
                            borderWidth: 1,
                            borderColor: "#F3F3F4",
                        }}
                        source={{ uri: urlFor(image).url() }}
                        className="h-20 w-20 bg-gray-300 p-4 "
                    />
                </View>
            </View>
            {/* {isPressed && (
                    <View className="bg-white px-4">
                        <View className="flex-row items-center space-x-2 pb-3">
                            <TouchableOpacity
                                disabled={!items.length}
                                onPress={removeItemFromBasket}
                            >
                                <MinusCircleIcon
                                    color={items.length > 0 ? "#00CCBB" : "gray"}
                                    size={40}
                                />
                            </TouchableOpacity>
                            <Text>{items.length}</Text>
                            <TouchableOpacity onPress={addItemToBasket}>
                                <PlusCircleIcon color="#00CCBB" size={40} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )} */}
        </TouchableOpacity>
    )
}

export default ProductCard