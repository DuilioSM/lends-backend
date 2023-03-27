import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useGetCategoriesQuery } from "../services/categoriesApi";

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const { data, error, loading, refetch } = useGetCategoriesQuery();

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data.data}
        search
        maxHeight={300}
        labelField="name"
        valueField="name"
        placeholder="Categoría"
        searchPlaceholder="Buscar..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    width: "95%",
  },
  dropdown: {
    height: 30,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00CCBB",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
