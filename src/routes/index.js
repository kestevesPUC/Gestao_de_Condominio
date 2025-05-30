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
import AbrirChamado from "../screens/Chamados/partials/abrir";
import Administracao from "../screens/Administracao";
import addPerfil from "../screens/Administracao/partials/addPerfil";
import DetalhesChamado from "../screens/Chamados/partials/detalhesChamado";

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
            <Stack.Screen name="AbrirChamado"    component={AbrirChamado} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="Administracao"    component={Administracao} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="addPerfil"    component={addPerfil} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="detalhesChamado"    component={DetalhesChamado} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="Load" component={Load} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NativeBaseProvider>
  );
}