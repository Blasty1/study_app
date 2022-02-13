import React from 'react';
import { useFonts } from "expo-font";
import Route  from '_navigations/Route.js'
export default function App()
{
    const [isLoaded] = useFonts({
        'Rowdies' : require('_fonts/Rowdies-Light.ttf')
      });
    if(!isLoaded)
    {
       return null
    }
    return <Route></Route>
}