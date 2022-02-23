import AsyncStorage from '@react-native-async-storage/async-storage';
import costanti_globali from '../config/app';
import 'react-native-get-random-values';
var moment = require('moment');

const { v4: uuidv4 } = require('uuid');

/**
 * Return jwt token
 * @returns {null | string}
 */
async function checkIfIsLogged()
{
    let token = await AsyncStorage.getItem('tokenJWT')
    //a token expires in 24 hours ( check back end)
    if(token)
    {
        token = JSON.parse(token)
        if(moment(token.created_at).diff(moment(),'hours') > 24)
        {
            await AsyncStorage.removeItem('tokenJWT')
            token = null
        }
    }
    return token ? token : null
}

/** 
 * Return a uuid device id ( creates or get )
 * @returns  {string} device id
*/
async function checkIfIsRegistered()
{
    let jsonValue = await AsyncStorage.getItem('deviceID')
    if(!jsonValue)
    {
        jsonValue = uuidv4()
        await AsyncStorage.setItem('deviceID',jsonValue)
    }
    return jsonValue
}

/**
 * Return token jwt for comunicate with backend
 * @returns {string} token JWT
 */
async function getTokenFromBackEnd()
{
    const deviceID = await checkIfIsRegistered();
    const response = await fetch(costanti_globali.backend_link + 'auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            deviceID: deviceID,
        })
    })
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const tokenJWT = await response.json()
    return { token : tokenJWT, created_at : Date.now() } 
    
}

/**
 * Login or registration to comunicate with backend and store data
 */
async function login()
{
    let tokenJWT = await checkIfIsLogged()
    if( !tokenJWT )
    {
        tokenJWT = await getTokenFromBackEnd()
        await AsyncStorage.setItem('tokenJWT',JSON.stringify(tokenJWT))
    }
    return tokenJWT
    
}

export {login , checkIfIsLogged}