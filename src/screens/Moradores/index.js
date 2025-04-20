import { Box, Button, FlatList, Text, View } from 'native-base';
import React, { useState } from 'react';
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




const buttons = [
  {
    id: "1",
    title: "",
    icon: <FontAwesome5 name='car' size={50} color={'#000'} />,
  }
];

export default function Moradores({ ...props }) {
  const [showModal, setShowModal] = useState(false);
  const [moradorSelected, setMoradorSelected] = useState();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false)


  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    setLoad(true);
    // setError(null); 
    try {
      let result = {};
      await axios.post(route.listar_usuarios)
        .then(response => {
          console.log(response.data);

          result = response.data;
          setData(result.data)
        })
        .catch(error => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);

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

  // const updateListMoradores = (data) => {
  //   console.log(data);
  // }

  const addMorador = () => {
    navigation.navigate('Add');
  }

  return (
    <>
      {
        load ? <Load /> :
          <>
            <FlatList
              ListHeaderComponent={<Header />}
              keyExtractor={(item) => item.id.toString()}
              data={data}
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