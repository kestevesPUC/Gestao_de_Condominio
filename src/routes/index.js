import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider} from "native-base";
import Home from "../screens/Home";
import Moradores from "../screens/Moradores";
import Profile from "../screens/Profile";
import Veiculos from "../screens/Veiculos";
import Veiculo from "../screens/Veiculos/partials/Veiculo";
import Add from "../screens/Moradores/Add";
import Login from "../screens/Login";
import Load from "../components/Load";
import Menu from "../screens/Menu";
import Chamados from "../screens/Chamados";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NativeBaseProvider>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
            <Stack.Screen name="Veiculos" component={Veiculos} options={{ headerShown: false }} />
            <Stack.Screen name="Veiculo" component={Veiculo} options={{ headerShown: false }} />
            <Stack.Screen name="Moradores" component={Moradores} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Home"     component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Add"    component={Add} options={{ headerShown: false }} />
            <Stack.Screen name="Chamados"    component={Chamados} options={{ headerShown: false }} />
            <Stack.Screen name="Load" component={Load} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NativeBaseProvider>
  );
}