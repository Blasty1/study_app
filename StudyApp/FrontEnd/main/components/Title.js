import { Text } from "native-base";

export default function Title({title,fontSize='5xl',color='white'})
{
    return <Text fontSize={fontSize} fontFamily="Rowdies" color={color}>{title}</Text>
}