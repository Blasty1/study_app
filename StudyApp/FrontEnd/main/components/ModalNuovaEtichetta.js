import { Modal, Input, FormControl, Button, Center, Text,Flex } from 'native-base'
import React, { useEffect, useState } from 'react'
import Title from './Title';
import Icon from 'react-native-vector-icons/Feather';
import costanti_globali from '_config/app';
import validator from 'validator';
import { createEtichetta, deleteEtichetta, editEtichetta } from '_helper/etichette';
import ScrollViewEtichetteModal from './ScrollViewEtichetteModal';
import CircularSlider from './CircularSlider';

export default function ModalNuovaEtichetta({ setModalNuovaEtichetta, modalNuovaEtichetta,updateEtichette,etichettaDaModificare,setEtichettaDaModificare }) {
    const [minutes, setMinutes] = useState(0)
    const [etichettaScelta,setEtichettaScelta] = useState({})
    const [name,setName] = useState('')
    const [errors,setErrors] = useState({})


    function getOldInfo()
    {
        if(etichettaDaModificare)
        {
            let etichetta = {'name' : costanti_globali.etichette[etichettaDaModificare.id_etichetta].name, 'id' : etichettaDaModificare.id_etichetta }
            setName(etichettaDaModificare.name)
            setMinutes(etichettaDaModificare.minuti)
            setEtichettaScelta(etichetta)
        }else{
            setMinutes(1)
            setEtichettaScelta({'name' : costanti_globali.etichette[0].name, 'id' : costanti_globali.etichette[0].id})
        }
    }
    useEffect(getOldInfo,[etichettaDaModificare])

    function checkDataToSubmit(name,minutes,etichettaScelta,setErrors)
    {
        let errors = {}
        if(validator.isEmpty(name))
        {
            errors.name = 'Inserire un nome'
        }
        if( minutes > costanti_globali.max_time || minutes < 0)
        {
            errors.minutes = 'Minutaggio errato'
        }

        if(!(etichettaScelta.id in costanti_globali.etichette.map(x => x.id)))
        {
            errors.etichette = 'Errore,etichetta scelta inesistente'
        }
        setErrors(errors)
        return Object.keys(errors).length != 0
        
    }

    return (
        <Modal isOpen={modalNuovaEtichetta ? true : false} onClose={() =>{ setModalNuovaEtichetta(false); etichettaDaModificare ? setEtichettaDaModificare(null) : null}} >
            <Modal.Content maxWidth="90%" width={"90%"} maxHeight={'95%'} background={'ten.100'} m={0} p={0}>
                <Modal.Header flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Title title={ etichettaDaModificare ? 'Modifica percorso' : 'Nuovo percorso'} fontSize='2xl'></Title>
                    <Icon name='x' color={'white'} size={30} onPress={() => { setModalNuovaEtichetta(false); etichettaDaModificare ? setEtichettaDaModificare(null) : null}}></Icon>
                </Modal.Header>
                <Modal.Body>
                    <Flex flex={0.5}>
                        <FormControl isRequired isInvalid={Object.keys(errors).length > 0 }>
                            <FormControl.Label><Text color={'white'}>Nome</Text></FormControl.Label>
                            <Input borderWidth={0} color={'white'} type='filled' bgColor={'ten.500'} 
                            onChangeText={newText => setName(validator.escape(newText))}
                            value={name} 
                            />
                            {
                                'name' in errors ? <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage> : null
                            }
                        </FormControl>
                        <FormControl mt="3" isRequired isInvalid={Object.keys(errors).length > 0 }>
                            <FormControl.Label><Text color={'white'}>Quanti minuti vuoi studiare ogni ciclo?</Text></FormControl.Label>
                            {
                                    'minutes' in errors ? <FormControl.ErrorMessage color={'white'}>{errors.minutes}</FormControl.ErrorMessage> : null
                            }
                            <Center>
                                <Text style={{ 'position': 'absolute', 'top': '45%' }} color={'white'}>{minutes + ' Minuti'}</Text>
                                <CircularSlider width={200} height={200} meterColor='#CC4331' textColor='#CC4331'
                                     value={minutes * 4} onValueChange={(value) => setMinutes(Math.ceil(value/4))}/>
                            </Center>
                        </FormControl>
                    </Flex>
                    <Flex flex={0.5}>
                        <ScrollViewEtichetteModal isModalOpen = {modalNuovaEtichetta} etichettaScelta={etichettaScelta} setEtichettaScelta={setEtichettaScelta} etichetteDaMostrare={costanti_globali.etichette}></ScrollViewEtichetteModal>
                        {
                            'etichette' in errors ? <FormControl.ErrorMessage>{errors.etichette}</FormControl.ErrorMessage> : null
                        }     
                    </Flex>
                </Modal.Body>
                <Modal.Footer background={'ten.100'}>
                    <Center flex={1} flexDirection={'row'} justifyContent='space-around'>
                        {etichettaDaModificare &&
                        <Button
                        width={'35%'} bgColor={'ten.500'} onPress={
                            function()
                            {
                                setModalNuovaEtichetta(false);
                                deleteEtichetta(etichettaDaModificare).then(values => updateEtichette(values)).catch(error => console.log(error))
                            }
                        }>
                            Elimina
                        </Button>
                    }
                        <Button width="60%" bgColor={'ten.500'} onPress={function(){
                            if(!checkDataToSubmit(name,minutes,etichettaScelta,setErrors))
                            {
                                setModalNuovaEtichetta(false);
                                if(etichettaDaModificare)
                                {
                                    editEtichetta(etichettaDaModificare.id,name,minutes,etichettaScelta).then(values => updateEtichette(values)).catch(error => console.log(error))
                                }else{       
                                    createEtichetta(name,minutes,etichettaScelta).then(values => updateEtichette(values)).catch(error => console.log(error))
                                }
                                setName('')
                                setMinutes(30)
                                setEtichettaScelta({'name' : costanti_globali.etichette[0].name, 'id' : costanti_globali.etichette[0].id})

                            }
                        }}>
                            Save
                        </Button>
                    </Center>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}