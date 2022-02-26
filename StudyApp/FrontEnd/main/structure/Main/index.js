import { NativeBaseProvider,Flex,Image,Text,extendTheme,Box } from 'native-base'
import React,{useEffect, useState} from 'react'
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ModalNuovaEtichetta from '_components/ModalNuovaEtichetta';
import { ScrollViewEtichetteMain } from '_components/ScrollViewEtichetteMain';
import {themeGlobal}  from '_config/style';
import { getEtichette } from '_helper/etichette';
import { login } from '../../helper/Auth';

export default function Main({navigation}){

    const [etichette,setEtichette] = useState([])
    const [etichettaScelta,setEtichettaScelta] = useState({id : ''})
    const [modalNuovaEtichetta,setModalNuovaEtichetta] = useState(false)
    const [opzioneModifica, setOpzioneModifica] = useState(false)
    const [etichettaDaModificare,setEtichettaDaModificare] = useState('')
    const styleImage = {
        'height' : 100,
        flex : 1
    }
    useEffect(function(){getEtichette().then(values => setEtichette(values))},[])
    useEffect(login,[])
    let flexValueHeader =  0.6
    if( Dimensions.get('window').width > 900)
    {
        flexValueHeader = 0.7
    }
    return (
    <NativeBaseProvider theme={extendTheme(themeGlobal)}>
        <Flex flex={1} overflow={'hidden'}>
            <Flex flex={0.5}>
                <Flex flex={1 - flexValueHeader} background={'sixty.600'} pl={2} direction="row" pt={9} justify={'space-between'} alignItems='center'>
                    <Icon name='settings' color={'white'}  size={35} onPress={() => navigation.navigate('Impostazioni')}></Icon>
                    <Text fontSize="5xl"  color={'white'} fontFamily="Rowdies" >FocuStudy</Text>
                    <Icon name='bar-chart' color={'white'} size={35}></Icon>
                </Flex>
                <Flex flex={flexValueHeader}>
                    <Image source={require('_images/main.jpg')} alt={'Background'} style={styleImage}></Image>
                </Flex>
            </Flex>
            <Flex flex={0.5} background={'ten.500'}>
                <Flex flex={0.2} direction='row'  px={2} align={'center'} justify={'space-between'}>
                    <Flex direction='row'  align={'center'} >
                        <Text fontSize="3xl"  color={'white'}  fontFamily="Rowdies" >Scegli il percorso</Text>
                        <Icon name='plus' color={'white'} size={35} onPress={() => setModalNuovaEtichetta(true)}></Icon>
                    </Flex>
                    <Icon name={opzioneModifica ? 'x-circle' : 'edit'} color='white' size={30} onPress={() => setOpzioneModifica(!opzioneModifica)} ></Icon>
                </Flex>
                <Flex flex={0.8}>
                    <ScrollViewEtichetteMain  navigation={navigation} setEtichettaDaModificare={setEtichettaDaModificare} opzioneModifica={opzioneModifica} etichettaScelta={etichettaScelta} setEtichettaScelta={setEtichettaScelta} etichetteDaMostrare={etichette}></ScrollViewEtichetteMain>
                </Flex>
            </Flex>
        </Flex>
        <ModalNuovaEtichetta  updateEtichette={setEtichette} setModalNuovaEtichetta={setModalNuovaEtichetta} modalNuovaEtichetta={modalNuovaEtichetta}></ModalNuovaEtichetta>
        <ModalNuovaEtichetta  updateEtichette={setEtichette} setEtichettaDaModificare={setEtichettaDaModificare} etichettaDaModificare={etichettaDaModificare} setModalNuovaEtichetta={setEtichettaDaModificare} modalNuovaEtichetta={etichettaDaModificare}></ModalNuovaEtichetta>

    </NativeBaseProvider>
    );
}