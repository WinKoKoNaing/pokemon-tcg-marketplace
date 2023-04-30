import { Cart } from "assets/svgs";
import { Header } from "components";
import Select, { DataType } from "components/ui/Select";
import { FilterType, useAppState } from "context/Context";
import { BlurView } from "expo-blur";
import { useDebounce } from "hooks";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRarities, useSets, useTypes } from "services";
import useSWRInfinite from "swr/infinite";
import { Card } from "type";
import { CART, HomeScreenProps } from "type/Router";

const limit = 12;
export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { cardList, addCard } = useAppState();
  const [filter, setFilter] = useState<FilterType>({
    name: "",
    rarity: {
      label: "",
    },
    set: {
      label: "",
    },
    type: {
      label: "",
    },
  });

  const updateFilter = (item: DataType | string, key: string) =>
    setFilter((f) => ({ ...f, [key]: item }));

  const handleChangeName = (n: string) => updateFilter(n, "name");

  const { types } = useTypes();
  const { sets } = useSets();
  const { rarities } = useRarities();

  const debouncedName = useDebounce(filter.name, 500);
  const { data, error, size, setSize, isLoading } = useSWRInfinite((index) => {
    return `/cards?page=${index + 1}&pageSize=${limit}${
      filter.rarity.label ||
      filter.name ||
      filter.set.label ||
      filter.type.label
        ? "&q="
        : ""
    }${debouncedName ? "name:" + debouncedName + "*" : ""} ${
      filter.type.label ? "types:" + filter.type.label : ""
    } ${filter.rarity.label ? "rarity:" + filter.rarity.label + "*" : ""} ${
      filter.set.label ? "set.name:" + filter.set.label + "*" : ""
    }`;
  });

  const cards: Card[] = useMemo(
    () =>
      data
        ? Object.values(data).reduce(
            (lists, value) => [...lists, ...value.data],
            []
          )
        : [],
    [data]
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data?.docs?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.docs?.length < limit);
  //   const isRefreshing = isValidating && data && data.length === size;

  const onPressMore = () => {
    if (!isReachingEnd) {
      setSize(size + 1);
    }
  };

  const onPressSelectCard = (item: Card) => {
    return () => {
      addCard(item);
    };
  };

  const renderItem = ({ item, index }: { item: Card; index: number }) => (
    <View className="w-[294px] items-center my-10">
      <Image
        source={{ uri: item?.images?.small }}
        className="w-[194.37px] h-[267.87px] bg-green-400 rounded-sm relative z-20"
      />
      <View className="relative bg-white rounded-3xl shadow-lg w-full z-10 -mt-12 h-[204px] justify-center items-center">
        <Text className="font-Poppins700 text-2xl  leading-6 mt-5">
          {item?.name}
        </Text>
        <Text className="text-[#0F6DB0]">{item?.types?.[0]}</Text>
        <View className="flex-row mt-1.5" style={{ gap: 20 }}>
          <Text>${item?.cardmarket?.prices?.lowPrice}</Text>
          <Text>{item?.set?.total} left</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          disabled={cardList.some((c) => c.id === item.id)}
          onPress={onPressSelectCard(item)}
          className="bg-[#FDCE29] absolute -bottom-5  w-[217.23px] items-center justify-center rounded-3xl h-[47.37px]"
        >
          <Text className="font-Poppins600">Select Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListFooter = () => (
    <View className="flex-1 items-center justify-center my-20">
      {cards.length !== 0 && !isReachingEnd && (
        <TouchableOpacity
          disabled={isLoadingMore}
          onPress={onPressMore}
          className="bg-[#0F6DB0] absolute -bottom-5  w-[217.23px] items-center justify-center rounded-3xl h-[47.37px]"
        >
          <Text className="font-Poppins600 text-white">
            {isLoadingMore ? "Loading" : "Load More"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <Header />

      <View className="mt-14 px-6">
        {/* Filter */}
        <View>
          <View
            className="h-[35px] bg-white shadow-lg rounded-[100px] text-center"
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              textAlign="center"
              placeholder="Name"
              value={filter?.["name"]}
              onChangeText={handleChangeName}
            />
          </View>
          <View className="flex-row my-4" style={{ gap: 16 }}>
            <Select
              data={types}
              value={filter?.type}
              onChange={updateFilter}
              placeholder="Type"
              role="type"
            />
            <Select
              data={rarities}
              value={filter?.rarity}
              onChange={updateFilter}
              placeholder="Rarity"
              role="rarity"
            />
            <Select
              data={sets}
              value={filter?.set}
              onChange={updateFilter}
              placeholder="Set"
              role="set"
            />
          </View>
        </View>

        <FlatList
          ListHeaderComponent={() => (
            <View>
              {isLoading ? (
                <Text>Loading....</Text>
              ) : (
                <Text>
                  {cards.length === 0 ? `There is no card for this filter` : ""}
                </Text>
              )}
            </View>
          )}
          data={cards}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 400 }}
          keyExtractor={(item) => item?.id.toString()}
          ListFooterComponent={ListFooter}
        />
      </View>

      {cardList.length > 0 && (
        <BlurView
          tint="light"
          intensity={100}
          className="w-full h-[120px] items-center justify-center z-50 absolute bg-gray-300 bottom-0"
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(CART);
            }}
            className="bg-[#298BFD] py-[6px] px-[14px] rounded-[10px] flex-row"
            style={{ gap: 8 }}
          >
            <Cart />
            <Text className="font-Poppins500 text-white">View cart</Text>
            {cardList.length > 0 && (
              <View className="bg-[#FF6363] absolute -top-2 rounded-full -left-2 px-1 items-center justify-center">
                <Text className="text-xs">{cardList.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </BlurView>
      )}
    </SafeAreaView>
  );
}
