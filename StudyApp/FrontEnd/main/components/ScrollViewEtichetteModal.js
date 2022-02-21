import { Center, FlatList, Text, Box, Pressable } from "native-base";
import React, { useState } from "react";
import { Platform } from "react-native";
import Etichetta from "./Etichetta";

export default class ScrollViewEtichetteModal extends React.Component {

    constructor() {
        super()
        this.changeValue = this.changeValue.bind(this)
        this.FlatList = React.createRef()
    }
    state = {
        bordiImmagineSelezionata: [
            { borderColor: 'white' },
            { borderColor: 'white' },
            { borderColor: 'white' },
            { borderColor: 'white' }
        ]
    }
    componentDidMount()
    {
        this.changeValue(this.props.etichettaScelta)
        setTimeout(() => this.FlatList.current.scrollToEnd() , 1000)
        setTimeout(() => this.FlatList.current.scrollToIndex({index : 0,animated : true}) , 2000)
    }
    
    componentDidUpdate(prevProps)
    {
        if(this.props.etichettaScelta.id != prevProps.etichettaScelta.id)
        {
            this.changeValue(this.props.etichettaScelta)
        }
        if((!prevProps.isModalOpen  && this.props.isModalOpen ))
        {
            setTimeout(() => this.FlatList.current.scrollToEnd() , 1000)
            setTimeout(() => this.FlatList.current.scrollToIndex({index : 0,animated : true}) , 2000)

        }

    }
    changeValue(item) {
        //usiamo JSON.parse e JSON.stringify perchè gli oggetti vengono clonati per reference
        let variable_to_change_the_state = JSON.parse(JSON.stringify(this.state.bordiImmagineSelezionata))
        for (let immagine in variable_to_change_the_state) {
            variable_to_change_the_state[immagine].borderColor = 'white'
            if (immagine == item.id) {
                variable_to_change_the_state[immagine].borderColor = '#CC4331'
                this.props.setEtichettaScelta({
                    'name': item.name,
                    'id': item.id
                })
            }

        }

        this.setState(previousState => ({ bordiImmagineSelezionata: variable_to_change_the_state }))
    }

    render() {
        return (
            <Box>
                <Text color={'white'}>Scegli il percorso: {this.props.etichettaScelta.name} </Text>
                <Center>
                    <FlatList flex={1} ref={this.FlatList} horizontal data={this.props.etichetteDaMostrare} showsHorizontalScrollIndicator={Platform.OS == 'web' ? true : false} renderItem={({
                        item
                    }) => <Etichetta etichettaSelezionata={this.changeValue} etichetta={item} borderColor = {this.state.bordiImmagineSelezionata[item.id].borderColor} ></Etichetta>
                    } keyExtractor={item => item.name} />
                </Center>
            </Box>
        );
    }




}