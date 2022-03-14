import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from "expo-notifications";
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
async function allowOrDenySound(thereIsMusic,setMusic,soundObject,isStartedTimer)
{
        if(! await checkIfUserWantsSound())
        {
            return 
        }
        if(thereIsMusic)
        {
            soundObject.stopAsync()
        }else{
            if(isStartedTimer)
            {
                soundObject.playAsync()
            }
        }
        setMusic(!thereIsMusic)

}

async function alertUser()
{
    await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
      });
    const {sound} = await Audio.Sound.createAsync(require('_assets/sounds/fine_percorso.mp3'));
    await Notifications.scheduleNotificationAsync({
        content: {
          title: "Percorso Completato",
          body: 'Avanti il prossimo',
        },
        trigger: { seconds: 1 },
    })
    await startSound(true,sound);
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
     if(isVibrationActived != await checkIfUserWantsVibration)
     {
         await AsyncStorage.setItem('vibration',JSON.stringify(isVibrationActived))
     }

 }
 
export {startSound,stopSound,allowOrDenySound,alertUser, checkIfUserWantsSound , changeMusicPreferenze ,changeVibrationPreferenze , checkIfUserWantsVibration}