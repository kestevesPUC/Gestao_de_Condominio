import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import ButtonMenu from '../../components/buttons/ButtonMenu'
import { useNavigation } from '@react-navigation/native';

export default function Menu() {

  const navigation = useNavigation();

  return (
    <View>
      <Header />
      <View style={Styles.container}>
        <ButtonMenu title={'Moradores'} method={() => navigation.navigate('Moradores')} />
        <ButtonMenu title={'Veículos'}  method={() => navigation.navigate('Veiculos')}   />
        <ButtonMenu title={'Funcionários'} method={() => navigation.navigate('Funcionarios')} />
        <ButtonMenu title={'Chamados'}  method={() => navigation.navigate('Chamados')}   />
        <ButtonMenu title={'Comunicados'}  method={() => navigation.navigate('Comunicados')}   />
        <ButtonMenu title={'Administração'}  method={() => navigation.navigate('Administracao')}   />
        <ButtonMenu title={'Visitantes'}  method={() => navigation.navigate('Visitantes')}   />
        <ButtonMenu title={'Reservar Area'}  method={() => navigation.navigate('Reservas')}   />
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23
  },
  row: {
    padding: 5
  },
});