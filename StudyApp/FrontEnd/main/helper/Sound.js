import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

/**
 * 
 * @param {boolean} thereIsMusic 
 * @param {Audio} soundObject
 * 
 */
async function startSound(thereIsMusic,soundObject)
{
    if(thereIsMusic)
    {
        await soundObject.playAsync()
    }
}
/**
 * @param {boolean} thereIsMusic 
 * @param {Audio} soundObject
 */
async function stopSound(thereIsMusic,soundObject)
{
    if(thereIsMusic)
    {
        await soundObject.pauseAsync()
    }
}
/**
 * 
 * @param {boolean} thereIsMusic 
 * @param {function} setMusic 
 * @param {Audio} soundObject 
 */
async function allowOrDenySound(thereIsMusic,setMusic,soundObject)
{
        if(! await checkIfUserWantsSound())
        {
            return 
        }
        if(thereIsMusic)
        {
            soundObject.stopAsync()
        }else{
            soundObject.playAsync()
        }
        setMusic(!thereIsMusic)

}
/**
 * If there is a changing , we update using asyncStorage
 * @param {boolean} isSoundActived 
 */
async function changeMusicPreferenze(isSoundActived)
{
    if(isSoundActived != await checkIfUserWantsSound)
    {
        await AsyncStorage.setItem('sound',JSON.stringify(isSoundActived))
    }
}

/**
 * True if sound can play else false
 * @returns {boolean}
 */
async function checkIfUserWantsSound()
{
    const isSoundActived = await AsyncStorage.getItem('sound')
    return isSoundActived ?  JSON.parse(isSoundActived) : true
    
}

/* VIBRATION FUNCTION */

/**
 * Check if user prefers the vibration at the end of timer
 * @returns {boolean}
 */
async function checkIfUserWantsVibration()
{
    const isVibrationActived = await AsyncStorage.getItem('vibration')
    return isVibrationActived ? JSON.parse(isVibrationActived) : true
}

/**
 * If there is a changing , we update using asyncStorage
 * @param {boolean} isVibrationActived 
 */
 async function changeVibrationPreferenze(isVibrationActived)
 {
     console.log(isVibrationActived)
     if(isVibrationActived != await checkIfUserWantsVibration)
     {
         await AsyncStorage.setItem('vibration',JSON.stringify(isVibrationActived))
     }

 }
 
export {startSound,stopSound,allowOrDenySound, checkIfUserWantsSound , changeMusicPreferenze ,changeVibrationPreferenze , checkIfUserWantsVibration}