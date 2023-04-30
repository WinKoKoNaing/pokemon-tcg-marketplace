import { AntDesign } from "@expo/vector-icons";
import { useAppState } from "context/Context";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "type";
import { CartScreenProps, PAYMENT_SUCCESS } from "type/Router";

export default function Cart({ navigation }: CartScreenProps) {
  const { cardList } = useAppState();
  const { removeAllCard, updateQty, removeACard } = useAppState();

  const onPressClearAll = () => {
    removeAllCard();
  };
  const renderItem = ({ item, index }: { item: Card; index: number }) => {
    const increasedQty = () => {
      updateQty(item?.id, +1);
    };
    const decreasedQty = () => {
      if (item?.qty === 1) {
        removeACard(item?.id);
      } else {
        updateQty(item?.id, -1);
      }
    };

    return (
      <View className="flex-row items-center my-3">
        <Image
          source={{ uri: item.images.small }}
          className="w-[77px] h-[106px] bg-green-400 rounded-sm"
        />
        <View className="ml-4 flex-1 py-2">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-Poppins700">{item?.name}</Text>
              <Text className="text-xs font-Poppins500">
                $ {item?.cardmarket.prices.lowPrice}{" "}
                <Text className="text-[#6A6969]"> per card</Text>
              </Text>
            </View>

            <View className="flex-row" style={{ gap: 4 }}>
              <Text className="text-xl text-[#298BFD] font-Poppins600">
                {item?.qty}
              </Text>
              <View className="-mt-2">
                <TouchableOpacity
                  disabled={item?.set.total - item?.qty == 0}
                  onPress={increasedQty}
                >
                  <AntDesign name="up" size={14} color="#298BFD" />
                </TouchableOpacity>
                <TouchableOpacity onPress={decreasedQty}>
                  <AntDesign
                    name={item?.qty === 1 ? "close" : "down"}
                    size={14}
                    color={item?.qty === 1 ? "#FD2929" : "#298BFD"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs">
                <Text className="font-Poppins600 text-[#FD2929]">
                  {item?.set.total - item?.qty}
                </Text>
                <Text className="text-[#6A6969]"> card left</Text>
              </Text>
            </View>

            <View className="justify-end">
              <Text className="text-xs font-Poppins600 text-right">price</Text>
              <Text className="text-base text-[#298BFD] font-Poppins700">
                ${(item?.cardmarket.prices.lowPrice * item?.qty).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onPressClose = () => {
    navigation.goBack();
  };
  const onPressPay = () => {
    removeAllCard();
    navigation.replace(PAYMENT_SUCCESS);
  };
  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="bg-white h-[613px] mt-28">
        <View className="flex-1 relative">
          <FlatList
            data={cardList}
            renderItem={renderItem}
            ListEmptyComponent={
              <View className="flex-1 mt-20">
                <Text className="text-center">There is no card.</Text>
              </View>
            }
            contentContainerStyle={{
              paddingHorizontal: 40,
              paddingBottom: 100,
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <BlurView
            tint="light"
            intensity={70}
            className="w-full absolute bottom-0 h-[58px]"
          ></BlurView>
        </View>

        <View className="items-center w-[217.23px] self-center">
          <TouchableOpacity onPress={onPressClearAll}>
            <Text className="text-[#6A6969] font-Poppins400 text-xs">
              Clear all
            </Text>
          </TouchableOpacity>

          <View className="flex-row mt-10 justify-between w-full">
            <Text className="text-base font-Poppins600">Total cards</Text>
            <Text className="text-base font-Poppins600 text-[#FD2929] text-right">
              {cardList.length}
            </Text>
          </View>
          <View className="flex-row mt-2 w-full justify-between">
            <Text className="text-lg font-Poppins600">Total price</Text>
            <Text className="text-lg font-Poppins600 text-[#FD2929] text-right">
              $
              {cardList
                .reduce(
                  (total, value) =>
                    total + value.qty * value.cardmarket.prices.lowPrice,
                  0
                )
                .toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            disabled={cardList.length === 0}
            onPress={onPressPay}
            className="bg-[#298BFD] items-center w-full justify-center px-[14px] h-[47px] rounded-[25px] flex-row my-8"
          >
            <Text className="font-Poppins500 text-white">Pay now</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onPressClose}
          className="h-10 w-10 rounded-lg self-center -mb-6 bg-red-500 items-center justify-center"
        >
          <AntDesign name="close" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
