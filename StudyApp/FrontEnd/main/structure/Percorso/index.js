import { Flex, NativeBaseProvider, Image, Text, extendTheme, Progress, Box, VStack, Button, Alert, Slide } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Vibration } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { themeGlobal } from "_config/style";
import { getSizeGif } from "_helper/etichette";
import { FirstCapitalize } from "_helper/Str";
import { v4 } from 'uuid';
import { deleteLocally, saveLocally, savePercorso } from "_helper/Percorso";


export default function Percorso({ route, navigation }) {
    const [timer, setTimer] = useState(0)
    const [isStarted, getStarted] = useState(false)
    const [idInterval, setIdInterval] = useState(null)
    const buttonStartTimer = useRef()
    const [idPercorso,]= useState(v4())

    function stopTimer() {
        if (timer == route.params.etichetta.minuti) {
            clearInterval(idInterval)
            savePercorso()
            Vibration.vibrate()
            getStarted(!isStarted)
            setTimeout(() => {setTimer(0) },10000)

        }
    }

    useEffect(stopTimer, [timer])
    function startTimer() {
        getStarted(!isStarted)

        if(timer == route.params.etichetta.minuti)
        {
            setTimer(0)
        }
        function addingMinutes() {
            setTimer((timer) => {saveLocally(route.params.etichetta,timer + 0.5,idPercorso).then().catch(error => console.log(error)); console.log(timer); return (timer + 0.5)})
        }
        if (!isStarted) {
            //update timer each 0.5 minute 30000
            setIdInterval(setInterval(() => addingMinutes(), 30000))
        } else {
            clearInterval(idInterval)
        }
        return  getStarted(!isStarted)

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
                            <Text textAlign={'center'}>Complimenti per aver portato a termine una parte del tuo viaggio</Text>
                        </Box>
                    </VStack>
                </Alert>
            </Slide>
            <Flex flex={0.3} px={2}>
                <Flex flex={0.5} direction="row" alignItems={'flex-end'} justifyContent={'space-between'}>
                    <Icon name='chevron-left' size={40} color={'white'} onPress={() => navigation.navigate('Main')}></Icon>
                    <Icon name='volume-1' size={40} color={'white'}></Icon>
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
                <Button ref={buttonStartTimer} borderRadius="md" shadow={'3'} height='10%' width="60%" background={'sixty.600'} onPress={startTimer}><Text fontSize="xl" color={'white'} fontFamily="Rowdies">{ timer == 0 ? 'Inizia' :   ( timer == route.params.etichetta.minuti ?  'Ricomincia percorso' : ( isStarted ? 'Stop' : 'Continua' ) )}</Text></Button>

            </Flex>

        </Flex>
    </NativeBaseProvider>
}