import { Pressable, Image } from "native-base"

export default function Etichetta({etichetta,borderColor,etichettaSelezionata}) {

    return(
        <Pressable borderColor={borderColor} mr={2} borderWidth={3} borderBottomRadius={15} onPress={() => { etichettaSelezionata(etichetta) }}>
            <Image source={etichetta.image} alt={etichetta.name} style={{ 'height': 190, width: 100 }} borderBottomRadius={12} />
        </Pressable>
    );
}