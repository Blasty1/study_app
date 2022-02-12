import AsyncStorage from '@react-native-async-storage/async-storage';

async function getEtichette()
{
    const jsonValue = await AsyncStorage.getItem('etichette')

    return jsonValue == null ? [] : JSON.parse(jsonValue)
}
    
async function createEtichetta(name,minutes,etichettaScelta)
{
    let etichette = await getEtichette()
    const nuova_etichetta = {
        'id_etichetta' : parseInt(etichettaScelta.id),
        'minuti' : parseInt(minutes),
        'name' : name,
        'id' : Date.now() //unique id
    }

    const etichette_aggiornate =  JSON.stringify([...etichette,nuova_etichetta])

    try{

        await AsyncStorage.setItem(
            'etichette',
            etichette_aggiornate
        )

    }catch(error)
    {
        console.log(error)
    }
    return etichette_aggiornate
}
export {getEtichette,createEtichetta}