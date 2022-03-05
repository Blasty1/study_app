import React from 'react';
import {
    NativeBaseProvider,
    extendTheme,
    Flex, 
    Text,
    Image,
    Center,
    Button,
  } from 'native-base';
import {themeGlobal} from '_config/style';
import { Dimensions, Pressable } from 'react-native';

export default function Home({navigation})
{
    const styleImage = {
        'height' : 100,
        flex : 1
    }
    const windowWidth = Dimensions.get('window').width;
    let width_schermo = 'sixty.100'
    if(windowWidth >  900 )
    {
        width_schermo = '#8ABDFF'
    }


    function main()
    {
        navigation.navigate('Main')
    }
    return (
    <NativeBaseProvider flex={1} theme={extendTheme(themeGlobal)}>
        <Flex flex={1} background={width_schermo}>
            <Center flex={0.4}>
                <Text fontSize="6xl" mt={35} color={'white'} fontFamily="Rowdies">FocuStudy</Text>
                <Text fontSize="sm" color={'white'}>Focus on what matters</Text>
                <Button borderRadius="md" shadow={'3'} width="60%" mt={10} background={'sixty.500'}  onPress={main}><Text fontSize="xl" color={'sixty.100'} fontFamily="Rowdies">Start</Text></Button>
            </Center>
            <Flex flex={0.6}>
                <Image  source={require('_images/home.jpg')} alt={'Background'} style={styleImage}></Image>
                <Pressable onPress={() => navigation.navigate('Condizioni')} style={{position : 'absolute' , bottom : 15 , right : 5}}><Text color='white' fontSize={9}>Terms And Conditions ( Privacy Policy ) </Text></Pressable>
            </Flex>
        </Flex>
    </NativeBaseProvider>
    );
}

