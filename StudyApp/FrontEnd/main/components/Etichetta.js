import { Pressable, Image } from "native-base"
import { etichetta_dimensioni } from "_helper/etichette";

export default function Etichetta({etichetta,borderColor,etichettaSelezionata}) {

    return(
        <Pressable borderColor={borderColor} mr={2} borderWidth={3} borderBottomRadius={15} onPress={() => { etichettaSelezionata(etichetta) }}>
            <Image source={etichetta.image} key={etichetta.image} alt={etichetta.name} style={{height : etichetta_dimensioni().height, width: etichetta_dimensioni().width }} borderBottomRadius={12} />
        </Pressable>
    );
}