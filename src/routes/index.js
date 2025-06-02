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
import Funcionarios from "../screens/Funcionarios";
import Comunicados from "../screens/Comunicados";
import AddFuncionario from "../screens/Funcionarios/partials/AddFuncionario";
import AddVeiculo from "../screens/Veiculos/partials/AddVeiculo";
import Morador from "../screens/Moradores/partials/Morador";
import Visitantes from "../screens/Visitantes";
import CadastrarVisitante from "../screens/Visitantes/partials/addVisitante";
import ReservaArea from "../screens/ReservaArea";
import AddArea from "../screens/ReservaArea/partials/add";
import dadosVeiculo from "../screens/Veiculos/partials/dadosVeiculo";

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
            <Stack.Screen name="Funcionarios"    component={Funcionarios} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="Comunicados"    component={Comunicados} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="CriarFuncionario"    component={AddFuncionario} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="CriarVeiculo"    component={AddVeiculo} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="Morador"    component={Morador} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="Visitantes"    component={Visitantes} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="CadastrarVisitante"    component={CadastrarVisitante} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="AddArea"    component={AddArea} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="Reservas"    component={ReservaArea} options={{ 
                headerShown: true, 
                headerBackTitleVisible: false, 
                title: '', 
                headerTransparent: true, 
                headerTintColor: 'white',  
                
              }} />
            <Stack.Screen name="dadosVeiculo"    component={dadosVeiculo} options={{ 
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