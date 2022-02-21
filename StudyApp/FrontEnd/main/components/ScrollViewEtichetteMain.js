import React from "react"
import { FlatList, Text, Box, Center, PresenceTransition, ZStack,Pressable } from "native-base";
import Icon from 'react-native-vector-icons/Feather';
import { Dimensions, Platform } from "react-native";
import Etichetta from "./Etichetta";
import { FirstCapitalize } from "_helper/Str";
import isEqual from 'lodash/isEqual';
import { etichetta_dimensioni } from "_helper/etichette";

export class ScrollViewEtichetteMain extends React.Component {
    constructor() {
        super()
        this.openPercorso = this.openPercorso.bind(this)
        this.FlatList = React.createRef()
        this.apriEtichettaDaModificare = this.apriEtichettaDaModificare.bind(this)
    }
    componentDidMount() {
        if(this.props.etichetteDaMostrare.length > 0)
        {
            setTimeout(() => this.FlatList.current.scrollToEnd(), 1000)
            setTimeout(() => this.FlatList.current.scrollToIndex({ index: 0, animated: true }), 2000)
        }
    }
    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.etichetteDaMostrare,this.props.etichetteDaMostrare)) {
            if(this.props.etichetteDaMostrare.length > 0)
            {
                setTimeout(() => this.FlatList.current.scrollToEnd(), 1000)
                setTimeout(() => this.FlatList.current.scrollToIndex({ index: 0, animated: true }), 2000)
            }
        }
    }

    openPercorso(item) {

        this.props.navigation.navigate('Percorso',{'etichetta' : item})

    }

    apriEtichettaDaModificare(etichetta)
    {
        this.props.setEtichettaDaModificare(etichetta)
    }

    render() {
        return (
            <FlatList ml={2} flex={1} ref={this.FlatList} horizontal data={this.props.etichetteDaMostrare} showsHorizontalScrollIndicator={Platform.OS == 'web' ? true : false} renderItem={({
                item
            }) =>
                <Box>
                    <Center>
                        <Text maxWidth={'100'} isTruncated={true} fontSize='lg' color={'white'}>{FirstCapitalize(item.name)}</Text><Text color={'white'} fontSize='xs'>{item.minuti} minuti</Text>
                    </Center>
                    <ZStack>
                        <Etichetta etichettaSelezionata={this.openPercorso} etichetta={item} borderColor={'#CC4331'} ></Etichetta>

                        <PresenceTransition visible={this.props.opzioneModifica} initial={{
                            opacity: 0,
                            scale: 0
                        }} animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                duration: 250
                            }
                        }}>
                            <Pressable onPress={() => this.apriEtichettaDaModificare(item)} borderWidth={3} alignItems='center' justifyContent={'center'} borderBottomRadius={15} borderColor={'#CC4331'} background={'white'} width={etichetta_dimensioni().width + 5} height={etichetta_dimensioni().height + 5} opacity={0.8}>
                                <Icon name='edit-2' color='#CC4331' size={35} >
                                </Icon>
                            </Pressable>

                        </PresenceTransition>
                    </ZStack>
                </Box>

            } keyExtractor={item => item.id} />
        );
    }



}