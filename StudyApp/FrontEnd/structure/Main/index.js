import { NativeBaseProvider,Flex,Image,Text,extendTheme } from 'native-base'
import React,{useState} from 'react'
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ModalNuovaEtichetta from '_components/ModalNuovaEtichetta';
import {themeGlobal}  from '_config/style';
import { getEtichette } from '_helper/etichette';
export default function Main(){
    const [etichette,setEtichette] = useState(getEtichette())
    const [modalNuovaEtichetta,setModalNuovaEtichetta] = useState(false)
    const styleImage = {
        'height' : 100,
        flex : 1
    }
    let flexValueHeader =  0.6
    if( Dimensions.get('window').width > 900)
    {
        flexValueHeader = 0.7
    }
    return (
    <NativeBaseProvider theme={extendTheme(themeGlobal)}>
        <Flex flex={1}>
            <Flex flex={0.6}>
                <Flex flex={1 - flexValueHeader} background={'sixty.600'} pl={2} direction="row" pt={8} justify={'space-between'}>
                    <Icon name='menu' color={'white'} size={40}></Icon>
                    <Text fontSize="5xl"  color={'white'} mt={70} fontFamily="Rowdies" >FocuStudy</Text>
                    <Icon name='volume-1' color={'white'} size={40}></Icon>
                </Flex>
                <Flex flex={flexValueHeader}>
                    <Image source={require('_images/main.jpg')} alt={'Background'} style={styleImage}></Image>
                </Flex>
            </Flex>
            <Flex flex={0.4} background={'ten.500'}>
                <Flex flex={0.2} direction='row' align={'center'}>
                    <Text fontSize="3xl"  color={'white'}  ml={2} fontFamily="Rowdies" >Scegli il percorso</Text>
                    <Icon name='plus' color={'white'} size={35} onPress={() => setModalNuovaEtichetta(true)}></Icon>
                </Flex>
                <Flex flex={0.8}>
                </Flex>
            </Flex>
        </Flex>
        <ModalNuovaEtichetta setModalNuovaEtichetta={setModalNuovaEtichetta} modalNuovaEtichetta={modalNuovaEtichetta}></ModalNuovaEtichetta>

    </NativeBaseProvider>
    );
}