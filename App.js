import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes'
import { Constants } from "./src/helpers/constants";
import { DataProvider } from "./src/hooks/DataProvider";
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs([
    'Warning: ...', // Parte da mensagem do aviso
    'Deprecation warning: ...'
  ]);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <DataProvider>
          <StatusBar backgroundColor={Constants.dPrimaryColor} barStyle="light-content" />
          <Routes />
        </DataProvider>
      </NavigationContainer>
    </NativeBaseProvider>

  )
}