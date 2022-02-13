import { NativeModules } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import costanti_globali from '../config/app';
import { getUniqueId } from 'react-native-device-info';

async function checkIfIsRegistered()
{
    const jsonValue = await AsyncStorage.getItem('tokenJWT')
    return jsonValue
}
async function registration()
{
    const deviceID = getUniqueId();
    console.log(deviceID)
    fetch(costanti_globali.backend_link + 'auth/registration', {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            deviceID: 'okoo',
        })
    }).then(response => response.text()).then(value => console.log(value)).catch(error => console.log(error))
}
async function login()
{
    if(! (await checkIfIsRegistered()) )
    {
        await registration()
    }
    
}

export {login}