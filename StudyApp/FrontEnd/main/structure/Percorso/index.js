import { Flex, NativeBaseProvider, Image, Text, extendTheme, Progress, Box, VStack, Button, Alert, Slide } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Vibration, AppState, Platform } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { themeGlobal } from "_config/style";
import { getSizeGif } from "_helper/etichette";
import { FirstCapitalize } from "_helper/Str";
import { v4 } from 'uuid';
import { saveLocally, savePercorso } from "_helper/Percorso";
import { Audio } from 'expo-av';
import { allowOrDenySound, startSound, stopSound, checkIfUserWantsSound, checkIfUserWantsVibration } from "_helper/Sound";
import { isModalitaIntensivaActived } from "_helper/ModalitaIntensiva";
import * as Notifications from "expo-notifications";


export default function Percorso({ route, navigation }) {
    const [timer, setTimer] = useState(0)
    const [isStarted, getStarted] = useState(false)
    const [idInterval, setIdInterval] = useState(null)
    const buttonStartTimer = useRef()
    const [idPercorso,]= useState(v4())
    const [thereIsMusic,setMusic]  = useState(() => checkIfUserWantsSound())
    const [sound, setSound] = useState(); 
    const timerActives = useRef(false)
    const appState = useRef(AppState.currentState);
    const soundModalitaIntensiva = useRef()

    if(Platform.OS == 'ios' || Platform.OS == 'android')
    {
        
        useEffect(async function()
        {
          if(await isModalitaIntensivaActived())
          {
            timerActives.current = isStarted
          }
        },[isStarted])
        useEffect(() => {
        const subscription = AppState.addEventListener("change",async (nextAppState) => {
            if(nextAppState == 'active')
            {
                await stopSound(soundModalitaIntensiva.current,soundModalitaIntensiva.current)
    
            }
            console.log('prima: ' + appState.current,'dopo: ' + nextAppState)
            if ( appState.current == 'active' && nextAppState != "active") 
            {
                if(await isModalitaIntensivaActived() && timerActives.current)
                {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                          title: "Torna a studiare",
                          body: 'Non ti distrarre, torna a concentarti',
                        },
                        trigger: { seconds: 2 },
                    })
                    if(!soundModalitaIntensiva.current)
                    {
                        await Audio.setAudioModeAsync({
                            staysActiveInBackground: true,
                            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                            shouldDuckAndroid: false,
                            playThroughEarpieceAndroid: false,
                            allowsRecordingIOS: false,
                            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                            playsInSilentModeIOS: true,
                          });
                        const {sound} = await Audio.Sound.createAsync(require('_assets/sounds/modalita_intensiva.mp3'))
                        soundModalitaIntensiva.current = sound
                        await soundModalitaIntensiva.current.setIsLoopingAsync(true)
                    }      
                    await startSound(soundModalitaIntensiva.current,soundModalitaIntensiva.current)
                }

            }
            
           
            appState.current = nextAppState;
            
        });
        return () => subscription.remove()
        }, []);
    }


 
  
    useEffect(async function()
    {
        if(thereIsMusic && await checkIfUserWantsSound())
        {
            const { sound }  = await Audio.Sound.createAsync(route.params.etichetta.sound);
            setSound(sound)
            await sound.setIsLoopingAsync(true)
        }
    },thereIsMusic)
    
    //check if there are errors for sound
    useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);
  
      async function stopTimer() {
        if (timer == route.params.etichetta.minuti) {
            clearInterval(idInterval)
            savePercorso()
            if(await checkIfUserWantsVibration())
            {
                Vibration.vibrate()
            }
            getStarted(!isStarted)
            setTimeout(() => {setTimer(0) },10000)
            stopSound(thereIsMusic,sound)
        }

    }
    
    useEffect(stopTimer, [timer])
    function startTimer() {
        if(timer == route.params.etichetta.minuti)
        {
            setTimer(0)
        }
        function addingMinutes() {
            setTimer((timer) => {saveLocally(route.params.etichetta,timer + 0.5,idPercorso).then().catch(error => console.log(error)); return (timer + 0.5)})
        }
        if (!isStarted) {
            startSound(thereIsMusic,sound)
            //update timer each 0.5 minute 30000
            setIdInterval(setInterval(() => addingMinutes(), 30000))
        } else {
            stopSound(thereIsMusic,sound)
            clearInterval(idInterval)
            stopSound(soundModalitaIntensiva.current,soundModalitaIntensiva.current)
        }
        getStarted(!isStarted)

    }
    return <NativeBaseProvider theme={extendTheme(themeGlobal)}>
        <Flex flex={1} backgroundColor='ten.500'>
            <Slide in={timer == route.params.etichetta.minuti} placement="top">
                <Alert w="100%" status="success">
                    <VStack space={1} flexShrink={1} w="100%" mt={10} alignItems="center">
                        <Alert.Icon size="md" />
                        <Text fontSize="md" fontWeight="medium" _dark={{
                            color: "coolGray.800"
                        }}>
                            Percorso Completato
                        </Text>

                        <Box _text={{
                            textAlign: "center"
                        }} _dark={{
                            _text: {
                                color: "coolGray.600"
                            }
                        }}>
                            <Text textAlign={'center'}>Complimenti per essere stato concentrato per {route.params.etichetta.minuti} minuti</Text>
                        </Box>
                    </VStack>
                </Alert>
            </Slide>
            <Flex flex={0.3} px={2}>
                <Flex flex={0.5} direction="row" alignItems={'flex-end'} justifyContent={'space-between'}>
                    <Icon name='chevron-left' size={40} color={'white'} onPress={() =>{ getStarted(false); navigation.navigate('Main')}}></Icon>
                    <Icon name={ thereIsMusic ? 'volume-1' : 'volume-x'} size={40} color={'white'} onPress={() => allowOrDenySound(thereIsMusic,setMusic,sound)} ></Icon>
                </Flex>
                <Flex flex={0.5} alignItems={'center'} justifyContent='center'>
                    <Text maxWidth={'100%'} isTruncated={true} fontSize={40} fontFamily="Rowdies" color={'white'}>{FirstCapitalize(route.params.etichetta.name)}</Text>
                </Flex>

            </Flex>
            <Flex flex={0.7} alignItems={'center'} mt={-10} pb={2} justifyContent='space-around'>
                <Image alt='background' style={{ height: getSizeGif(route.params.etichetta).height, width: getSizeGif(route.params.etichetta).width }} source={route.params.etichetta.image_gif}></Image>
                <Box w="80%" mt={2}>
                    <Flex direction="row" justifyContent={'flex-end'}>
                        <Text color={'white'} fontSize='xs'>{route.params.etichetta.minuti} minuti</Text>
                    </Flex>
                    <Progress key={timer} min={0} max={route.params.etichetta.minuti} size="xl" colorScheme="progress" borderColor={'white'} borderWidth={1} value={timer} />
                </Box>
                <Button ref={buttonStartTimer} borderRadius="md" shadow={'3'} height='10%' width="60%" background={'sixty.600'} onPress={startTimer}><Text fontSize="xl" color={'white'} fontFamily="Rowdies">{ timer == 0 && !isStarted ? 'Inizia' :   ( timer == route.params.etichetta.minuti ?  'Ricomincia percorso' : ( isStarted ? 'Stop' : 'Continua' ) )}</Text></Button>

            </Flex>

        </Flex>
    </NativeBaseProvider>
}