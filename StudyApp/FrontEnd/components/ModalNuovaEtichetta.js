import { Modal, Input, FormControl, Button, Center, Text,Flex } from 'native-base'
import React, { useState } from 'react'
import CircleSlider from "react-native-circle-slider";
import Title from './Title';
import Icon from 'react-native-vector-icons/Feather';
import ScrollViewEtichette from './ScrollViewEtichette';
import costanti_globali from '_config/app';
import validator from 'validator';
import { createEtichetta } from '_helper/etichette';

export default function ModalNuovaEtichetta({ setModalNuovaEtichetta, modalNuovaEtichetta }) {
    const [minutes, setMinutes] = useState(30)
    const [etichettaScelta,setEtichettaScelta] = useState({'name' : costanti_globali.etichette[0].name, 'id' : costanti_globali.etichette[0].id})
    const [name,setName] = useState('')
    const [errors,setErrors] = useState({})

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
        <Modal isOpen={modalNuovaEtichetta} onClose={() => setModalNuovaEtichetta(false)} >
            <Modal.Content width="90%" maxHeight={'95%'} background={'ten.100'} m={0} p={0}>
                <Modal.Header flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Title title="Nuovo Percorso" fontSize='2xl'></Title>
                    <Icon name='x' color={'white'} size={30} onPress={() => { setModalNuovaEtichetta(false) }}></Icon>
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
                                
                                <CircleSlider meterColor={'#CC4331'} textColor={'#CC4331'} value={minutes} btnRadius={20} dialRadius={80} textSize={0} min={0} max={360} strokeWidth={10} dialWidth={9} onValueChange={(value) => { setMinutes(value); return '' }} />
                            </Center>
                        </FormControl>
                    </Flex>
                    <Flex flex={0.5}>
                        <ScrollViewEtichette isModalOpen = {modalNuovaEtichetta} etichettaScelta={etichettaScelta} setEtichettaScelta={setEtichettaScelta} etichetteDaMostrare={costanti_globali.etichette}></ScrollViewEtichette>
                        {
                            'etichette' in errors ? <FormControl.ErrorMessage>{errors.etichette}</FormControl.ErrorMessage> : null
                        }     
                    </Flex>
                </Modal.Body>
                <Modal.Footer background={'ten.100'}>
                    <Center flex={1}>
                        <Button width="50%" bgColor={'ten.500'} onPress={function(){
                            if(!checkDataToSubmit(name,minutes,etichettaScelta,setErrors))
                            {
                                createEtichetta(name,minutes,etichettaScelta).then(value => console.log(value)).catch(error => console.log(error))
                                setName('')
                                setMinutes(30)
                                setEtichettaScelta({'name' : costanti_globali.etichette[0].name, 'id' : costanti_globali.etichette[0].id})
                                setModalNuovaEtichetta(false);

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