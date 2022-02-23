import { Box, Text } from "native-base";

export default function NameSection({title})
{
    return (
        <Box borderBottomColor={'ten.500'} borderBottomWidth={2}><Text fontSize={15} color={'ten.500'}>{title}</Text></Box>
    )
}