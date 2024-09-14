import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IngresosScreen from "../screens/IngresosScreen";
import EgresosScreen from "../screens/EgresosScreen";
import ComparacionScreen from "../screens/ComparacionScreen";
import Tab2Screen from "../screens/Tab2Screen";

const Stack = createStackNavigator();

const Tab1Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="Ingresos">
      <Stack.Screen name="Ingresos" component={IngresosScreen} />
      <Stack.Screen name="Egresos" component={EgresosScreen} />
      <Stack.Screen name="Comparacion" component={ComparacionScreen} />
      <Stack.Screen name="Productos Financieros" component={Tab2Screen} />
    </Stack.Navigator>
  );
};

export default Tab1Navigator;
