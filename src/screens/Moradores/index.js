import { Box, Button, FlatList, Input, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Morador from './partials/Morador';
import { Modals } from '../../components/Modals';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Constants } from '../../helpers/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { route } from '../../config/route';
import Load from '../../components/Load';
import { ListarUsuario } from '../../services/Methods/User';


export default function Moradores({ ...props }) {
  const [showModal, setShowModal] = useState(false);
  const [moradorSelected, setMoradorSelected] = useState();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false)
  const [search, setSearch] = useState("")

  const [filteredData, setFilteredData] = useState(data);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    setLoad(true);
    // setError(null); 
    try {
      const result = await ListarUsuario();
      setData(result.data)
      setFilteredData(result.data)

    } catch (err) {

      // setError(err.message);
    } finally {
      // setLoad(false); 
    }

    setLoad(false)
  };

  const navigation = useNavigation();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const setMorador = (morador) => {
    setMoradorSelected(morador)
  }

  const headerModal = () => {
    return (
      <Box>
        <Text fontSize={20} fontWeight={'bold'}>
          Contactar Morador
        </Text>
      </Box>
    )
  }

  const bodyModal = (props) => {
    return (
      <Box>
        <TouchableOpacity style={styles.buttons} >
        </TouchableOpacity>
      </Box>
    )
  }

  const searchMorador = async (search) => {
    setSearch(search)
    if (search === '') {
      setFilteredData(data);
    } else {
      const filtered = await data.filter(item =>
        item?.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }



  const addMorador = () => {
    navigation.navigate('Add');
  }

  return (
    <>
      {
        load ? <Load /> :
          <>
            <Header />
            <>
              <View style={{ padding: 10 }}>
                <Input placeholder='Pesquisar Morador' value={search} onChangeText={async (text) => searchMorador(text)} />
              </View>
            </>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={filteredData}
              showsHorizontalScrollIndicator={true}
              renderItem={(item) => <Morador data={item} openModal={openModal} setMorador={setMorador} size={30} bodyModal={bodyModal} />}
            />
            <View style={styles.viewButton}>
              <TouchableOpacity style={styles.button} onPress={addMorador}>
                <Ionicons name='add' size={30} color={"#FFF"} />
              </TouchableOpacity>
            </View>
            <Modals isVisible={showModal} closeModal={closeModal} morador={moradorSelected} header={headerModal} body={bodyModal} footer={''} />

          </>
      }
    </>
  )
}


const styles = StyleSheet.create({
  buttons: {
    borderRadius: 22,
    size: 44,
    backgroundColor: '#DADADA',
  },
  button: {
    backgroundColor: Constants.dPrimaryColor,
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    elevation: 8,
  },
  viewButton: {
    alignItems: 'flex-end',
  }
});