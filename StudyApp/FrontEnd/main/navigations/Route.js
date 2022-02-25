import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '_structure/Home/index.js'
import Main from '_structure/Main/index.js'
import { TransitionPresets } from '@react-navigation/stack';
import { SSRProvider } from '@react-aria/ssr';
import Percorso from '_structure/Percorso';
import Impostazioni from '_structure/Impostazioni';

export default function Route() {
  const Stack = createStackNavigator();

  return (
    <SSRProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false,
          }} />
          <Stack.Screen name='Main' component={Main} options={{
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}></Stack.Screen>
          <Stack.Screen name='Percorso' component={Percorso} options={{
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}></Stack.Screen>
          <Stack.Screen name='Impostazioni' component={Impostazioni} options={{
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SSRProvider>
  );
}
