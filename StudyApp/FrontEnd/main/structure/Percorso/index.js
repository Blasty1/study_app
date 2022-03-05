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
import * as Analytics from 'expo-firebase-analytics'; 
var moment = require('moment');


export default function Percorso({ route, navigation }) {
    const [timer, setTimer] = useState(0)
    const [isStarted, getStarted] = useState(false)
    const [idInterval, setIdInterval] = useState(null)
    const buttonStartTimer = useRef()
    const [idPercorso,]= useState(v4())
    const [thereIsMusic,setMusic]  = useState(() => checkIfUserWantsSound())
    const [sound, setSound] = useState(); 
    const timerActives = useRef(false)
    const [timerBackground,setTimerBackground] = useState(0)
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
                if(timerBackground)
                {
                    const difference_minutes =  timer + moment().diff(timerBackground.minutes(),'minutes') > route.params.etichetta.minuti ? route.params.etichetta.minuti : moment().diff(timerBackground.minutes(),'minutes')
                
                    setTimer(difference_minutes)
                    setTimerBackground(0)
                    await saveLocally(route.params.etichetta,difference_minutes,idPercorso).then().catch(error => console.log(error))
                }
                
                await stopSound(soundModalitaIntensiva.current,soundModalitaIntensiva.current)
    
            }
            if ( appState.current == 'active' && nextAppState != "active") 
            {
                if(isStarted)
                {
                    if(!timerBackground)
                    {
                        setTimerBackground(moment().date())
                    }
                }
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
                    await Analytics.logEvent('uscita_dall_app', {
                        etichetta_scelta : route.params.etichetta.id_etichetta
                      });
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
        if (timer >= route.params.etichetta.minuti) {
            if(timer != route.params.etichetta.minuti)
            {
                
            }
            Analytics.logEvent('task_terminata', {
                minuti_totali : route.params.etichetta.minuti,
                etichetta_scelta : route.params.etichetta.id_etichetta
              });
            clearInterval(idInterval)
            await stopSound(thereIsMusic,sound)
            savePercorso()
            if(await checkIfUserWantsVibration())
            {
                Vibration.vibrate(1000)
            }
            getStarted(!isStarted)
            setTimeout(() => {setTimer(0) },10000)
            // bug della libreria, devi necessariamente utilizzare la variabile sound affinche funzioni, quindi creo una copia in locale ( malgrado vada a ricalcare la variabile globale sound della funzione )
            const {sound} = await Audio.Sound.createAsync(require('_assets/sounds/fine_percorso.mp3'));
            sound.playAsync()
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
            if(timer == 0)
            {
                Analytics.logEvent('task_iniziata', {
                    etichetta_scelta : route.params.etichetta.id_etichetta,
                    minuti : route.params.etichetta.minuti
                  });
            }
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