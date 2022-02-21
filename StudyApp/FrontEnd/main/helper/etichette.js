import AsyncStorage from '@react-native-async-storage/async-storage';
import costanti_globali from '_config/app';
import { Dimensions } from "react-native";

function getImageEtichette(etichette)
{
    for (let etichettaPersonalizzata of etichette)
    {
        for (let etichetta of costanti_globali.etichette)
        {
            if (etichetta.id == etichettaPersonalizzata.id_etichetta)
            {
                etichettaPersonalizzata.image = etichetta.image
                etichettaPersonalizzata.image_gif = etichetta.image_gif
            }
        }

    }
    return etichette
}

async function deleteEtichetta(etichettaDaEliminare)
{
    let etichette = await getEtichette()
    let indexEtichettaDaEliminare = null
    for(let etichetta in etichette)
    {
        if(etichette[etichetta].id == etichettaDaEliminare.id)
        {
            indexEtichettaDaEliminare = etichetta
        }
    }

    if(indexEtichettaDaEliminare)
    {
        etichette.splice(indexEtichettaDaEliminare,1)
    }

    try{

        await AsyncStorage.setItem(
            'etichette',
            JSON.stringify(etichette)
        )

    }catch(error)
    {
        console.log(error)
    }
    return getImageEtichette(etichette)
}

async function getEtichette()
{
    let jsonValue = JSON.parse(await AsyncStorage.getItem('etichette'))

    if(!jsonValue)
    {
        return []
    }
    
    return getImageEtichette(jsonValue)
    
}

async function editEtichetta(idEtichettaPersonalizzata,name,minutes,etichettaScelta)
{
    let etichette =  await getEtichette()
    let etichetta_modificata = {}
    for ( let etichetta in etichette)
    {
        if(etichette[etichetta].id == idEtichettaPersonalizzata)
        {
            etichetta_modificata = {
                name : name,
                minuti : parseInt(minutes),
                id_etichetta : parseInt(etichettaScelta.id),
                id : etichette[etichetta].id
            }
            etichette.splice(etichetta,1)
        }
    }
    const etichette_aggiornate = [...etichette,etichetta_modificata]
    try{

        await AsyncStorage.setItem(
            'etichette',
            JSON.stringify(etichette_aggiornate)
        )

    }catch(error)
    {
        console.log(error)
    }
    return getImageEtichette(etichette_aggiornate)

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

    const etichette_aggiornate = [...etichette,nuova_etichetta]
    try{

        await AsyncStorage.setItem(
            'etichette',
            JSON.stringify(etichette_aggiornate)
        )

    }catch(error)
    {
        console.log(error)
    }
    return getImageEtichette(etichette_aggiornate)
}
const etichetta_dimensioni = () =>
{
    const windowWidth = Dimensions.get('window').width;
    let dimensionsOfEtichetta = {
        height : 220,
        width : 100
    }
    if(windowWidth > 900)
    {
        dimensionsOfEtichetta.height = 250
        dimensionsOfEtichetta.width = 180
    }
    return dimensionsOfEtichetta
}
function getSizeGif(etichetta)
    {
        const windowWidth = Dimensions.get('window').width;
        let dimensionsOfEtichetta = {
            height : 0,
            width : 0
        }
        switch(etichetta.id_etichetta)
        {
            //collina
            case 0:
                dimensionsOfEtichetta.height = 350
                dimensionsOfEtichetta.width = 350
                break
            //deserto
            case 1:
                dimensionsOfEtichetta.height = 260
                dimensionsOfEtichetta.width = 380
                break
            //montagna
            case 2:
                dimensionsOfEtichetta.height = 350
                dimensionsOfEtichetta.width = 150
                break
            //citta
            case 3:
                dimensionsOfEtichetta.height = 150
                dimensionsOfEtichetta.width = 350
                break

            


        }
        if(windowWidth > 900)
        {

            if(etichetta.id_etichetta != 2)
            {
                dimensionsOfEtichetta.height += 70
                dimensionsOfEtichetta.width += 130
            }
        }
        return dimensionsOfEtichetta
    }
export {getEtichette,createEtichetta,etichetta_dimensioni,editEtichetta,deleteEtichetta,getSizeGif}