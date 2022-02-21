import AsyncStorage from '@react-native-async-storage/async-storage';
import costanti_globali from '_config/app';
import { checkIfIsLogged , login } from './Auth';
/**
 * 
 * @param {Object} etichettaPersonalizzata 
 * @param {Integer} minutoSalvataggio 
 * @param {Integer} idPercorsoEffettuato 
 * Salva localmente i percorsi effettuati per poi mandarli al server
 */
async function saveLocally(etichettaPersonalizzata, minutoSalvataggio, idPercorsoEffettuato) {

    let vecchioAggiornamento = await getPercorsoLocally(etichettaPersonalizzata.id, idPercorsoEffettuato)
    //se non ci sono vecchi aggiornamenti per questo percorso , ne creo uno
    if (vecchioAggiornamento.ultimo_aggiornamento_percorso === false) {
        const nuovo_percorso = {
            'id': etichettaPersonalizzata.id,
            'name': etichettaPersonalizzata.name,
            'minuti': minutoSalvataggio,
            'updated_at': Date.now(),
            'created_at': Date.now()
        }
        vecchioAggiornamento.percorsi_globali_ultimo_salvataggio.push({ [idPercorsoEffettuato]: nuovo_percorso })
    }
    else //se abbiamo vecchi aggiornamenti modifico il precedente
    {
        //passing by reference because is a object
        let percorso_da_aggiornare = vecchioAggiornamento.percorsi_globali_ultimo_salvataggio[vecchioAggiornamento.ultimo_aggiornamento_percorso.id_generale_percorso][vecchioAggiornamento.ultimo_aggiornamento_percorso.id_percorso_effettuato_da_aggiornare]
        percorso_da_aggiornare.minuti = minutoSalvataggio
        percorso_da_aggiornare.updated_at = Date.now()

    }
    await AsyncStorage.setItem('percorsi', JSON.stringify(vecchioAggiornamento.percorsi_globali_ultimo_salvataggio))
}
/**
 * 
 * @param {Integer} idPercorsoPersonalizzato 
 * @param {Integer} idPercorsoEffettuato 
 * @returns 
 * Per avere ultimi percorsi salvati
 */
async function getPercorsoLocally(idPercorsoPersonalizzato, idPercorsoEffettuato) {
    const percorsiTrovati = JSON.parse(await AsyncStorage.getItem('percorsi')) ?? []
    for (let percorso in percorsiTrovati) {
        for (let singoloPercorsoID in percorsiTrovati[percorso]) {
            if (percorsiTrovati[percorso][singoloPercorsoID].id == idPercorsoPersonalizzato && singoloPercorsoID == idPercorsoEffettuato) {

                return {
                    'ultimo_aggiornamento_percorso': {
                        id_generale_percorso: percorso, 
                        id_percorso_effettuato_da_aggiornare: singoloPercorsoID,
                    },
                    'percorsi_globali_ultimo_salvataggio': percorsiTrovati
                }
            }
        }
    }
    return {
        'ultimo_aggiornamento_percorso': false,
        'percorsi_globali_ultimo_salvataggio': percorsiTrovati
    }


}

async function getAllPercorsiLocally() {
    return await AsyncStorage.getItem('percorsi') ?? JSON.stringify([])
}


async function deleteLocally() {
    try{
        await AsyncStorage.removeItem('percorsi')
    }catch(error){
        console.log(error)
    }
    
}


async function savePercorso() {
    const percorsiDaSalvareSulDatabase = await getAllPercorsiLocally()
    const tokenJWT = await login()
    
    const response = await fetch(costanti_globali.backend_link + 'percorso/store', {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization : 'Bearer ' +  tokenJWT.token
        },
        body: JSON.stringify({
            'percorsi': percorsiDaSalvareSulDatabase,
        })
    })
    if (!response.ok) {

        //token is expired
        if( response.status == 409 )
        {
            //il token viene rimosso in quanto non è più utile, deve essere aggiornato
            AsyncStorage.removeItem('tokenJWT')
            return await savePercorso()
        }

        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    if(response.status == 200)
    {
        await deleteLocally()
    }

}

export { saveLocally, savePercorso,deleteLocally };