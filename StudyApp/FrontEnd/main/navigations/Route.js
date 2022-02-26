import * as React from 'react';
import { NavigationContainer , useNavigationContainerRef} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '_structure/Home/index.js'
import Main from '_structure/Main/index.js'
import { TransitionPresets } from '@react-navigation/stack';
import { SSRProvider } from '@react-aria/ssr';
import Percorso from '_structure/Percorso';
import Impostazioni from '_structure/Impostazioni';
import * as Analytics from 'expo-firebase-analytics';
import Condizioni from '_structure/Condizioni/index.js';


export default function Route() {
  const Stack = createStackNavigator();
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = React.useRef();

  return (
    <SSRProvider>
      <NavigationContainer 
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          await Analytics.setCurrentScreen(currentRouteName);
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
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
          <Stack.Screen name='Condizioni' component={Condizioni} options={{
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SSRProvider>
  );
}
