import AsyncStorage from '@react-native-async-storage/async-storage';


async function isModalitaIntensivaActived()
{
    const isActived = await AsyncStorage.getItem('modalita_intensiva')
    return isActived ? JSON.parse(isActived) : false
}

async function changeModalitaIntensiva(is_actived_modalita_intensiva)
{
     if(is_actived_modalita_intensiva != await isModalitaIntensivaActived)
     {
         await AsyncStorage.setItem('modalita_intensiva',JSON.stringify(is_actived_modalita_intensiva))
     }

}




export {changeModalitaIntensiva,isModalitaIntensivaActived}