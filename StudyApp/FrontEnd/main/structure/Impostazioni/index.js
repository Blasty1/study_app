import { extendTheme, NativeBaseProvider, Flex, Text, Box, Switch } from "native-base"
import React, {useEffect, useState} from 'react'
import Title from "_components/Title";
import Icon from 'react-native-vector-icons/Feather';
import { themeGlobal } from "_config/style"
import NameSection from "_components/NameSection";
import { checkIfUserWantsSound , changeMusicPreferenze, checkIfUserWantsVibration, changeVibrationPreferenze } from "_helper/Sound";

export default function Impostazioni({ navigation }) {
    const [music,setMusic] = useState()
    const [vibrazione,setVibrazione] = useState()
    const [intensiva,setIntensiva] = useState()

    useEffect(async function()
        {
            setVibrazione(await checkIfUserWantsVibration())
        },[])
    useEffect(async function()
    {
        setMusic(await checkIfUserWantsSound())
    },[])
    useEffect(async () =>changeVibrationPreferenze(vibrazione),[vibrazione])
    useEffect(async () =>changeMusicPreferenze(music),[music])
    return (
        <NativeBaseProvider theme={extendTheme(themeGlobal)}>
            <Flex flex={1} background={'ten.100'}>
                <Flex flex={0.3} alignItems='center' justifyContent={'center'} flexDirection={'row'}>
                    <Icon name='chevron-left' size={40} color={'white'} style={{ position: 'absolute', left: 0 }} onPress={() => navigation.navigate('Main')}></Icon>
                    <Title title={'Impostazioni'} fontSize={40}></Title>
                </Flex>
                <Flex flex={0.7}>
                    <Flex flex={1} px={2}>
                        <Box>
                            <NameSection title={'Preferenze'}></NameSection>
                            <Box flexDirection='column' px={2}>
                                <Flex mt={2} flexDirection={'row'} justifyContent='space-between' alignItems={'center'}>
                                    <Text color={'white'} fontSize={18}>Musica</Text>
                                    <Switch isChecked={music} onToggle={ () => setMusic(!music)} offTrackColor="white" borderColor='white' onTrackColor="ten.500" onThumbColor="white" offThumbColor="ten.500"  size='lg'></Switch>
                                </Flex>
                                <Flex mt={2} flexDirection={'row'} justifyContent='space-between' alignItems={'center'}>
                                    <Text color={'white'} fontSize={18}>Vibrazione</Text>
                                    <Switch isChecked={vibrazione} onToggle={ () => setVibrazione(!vibrazione)}  offTrackColor="white" borderColor='white' onTrackColor="ten.500" onThumbColor="white" offThumbColor="ten.500" size='lg'></Switch>
                                </Flex>
                                <Flex mt={2} flexDirection={'row'} justifyContent='space-between' alignItems={'center'}>
                                    <Text color={'white'} fontSize={18}>Modalità Intesiva</Text>
                                    <Switch defaultIsChecked={intensiva}  offTrackColor="white" borderColor='white' onTrackColor="ten.500" onThumbColor="white" offThumbColor="ten.500"  size='lg'></Switch>
                                </Flex>
                            </Box>
                        </Box>
                            <Box>
                                <NameSection title={'Credits'}></NameSection>
                                <Box flexDirection='column' px={2}>
                                    <Flex mt={2} flexDirection={'row'} justifyContent='space-between' alignItems={'center'}>
                                        <Text color={'white'} fontSize={18}>Musica</Text>
                                        <Switch offTrackColor="white" borderColor='white' onTrackColor="ten.500" onThumbColor="white" offThumbColor="ten.500" defaultIsChecked={true} size='lg'></Switch>
                                    </Flex>
                                    <Flex mt={2} flexDirection={'row'} justifyContent='space-between' alignItems={'center'}>
                                        <Text color={'white'} fontSize={18}>Vibrazione</Text>
                                        <Switch offTrackColor="white" borderColor='white' onTrackColor="ten.500" onThumbColor="white" offThumbColor="ten.500" defaultIsChecked={true} size='lg'></Switch>
                                    </Flex>
                                    <Flex mt={2} flexDirection={'row'} justifyContent='space-between' alignItems={'center'}>
                                        <Text color={'white'} fontSize={18}>Modalità Intesiva</Text>
                                        <Switch offTrackColor="white" borderColor='white' onTrackColor="ten.500" onThumbColor="white" offThumbColor="ten.500" defaultIsChecked={true} size='lg'></Switch>
                                    </Flex>
                                </Box>
                            </Box>
                    </Flex>
                </Flex>
            </Flex>
        </NativeBaseProvider>
    );
}