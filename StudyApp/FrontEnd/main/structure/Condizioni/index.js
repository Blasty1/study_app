import React from 'react';
import {
    NativeBaseProvider,
    extendTheme, 
    ScrollView
  } from 'native-base';
import {themeGlobal} from '_config/style';
import RenderHtml from 'react-native-render-html';
import { Dimensions, StatusBar } from 'react-native';
import { TACP } from './termsAndConditions';


export default function Condizioni({navigation})
{
    return (
    <NativeBaseProvider flex={1} theme={extendTheme(themeGlobal)}>
        <StatusBar backgroundColor="white" barStyle='light-content' />
        <ScrollView p={10}>
        <RenderHtml
            contentWidth={Dimensions.get('window').width}
                source={{ html: TACP}}
    ></RenderHtml>
        </ScrollView>
    </NativeBaseProvider>
    );
}

