import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '_structure/Home/index.js'
import Main from '_structure/Main/index.js'
import { TransitionPresets } from '@react-navigation/stack';
import { SSRProvider } from '@react-aria/ssr';
import Percorso from '_structure/Percorso';
import Impostazioni from '_structure/Impostazioni';
import { AppState } from 'react-native';

export default function Route() {
  const Stack = createStackNavigator();
    const appState = React.useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = React.useState(appState.current);
  
    React.useEffect(() => {
      const subscription = AppState.addEventListener("change", nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState != "active"
        ) {
          console.log("Ddfdd");
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        
      });
  
      return () => {
        subscription.remove();
      };
    }, []);
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
