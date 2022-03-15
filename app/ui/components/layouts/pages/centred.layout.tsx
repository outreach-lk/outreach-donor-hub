import { Center } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

/**
 * A layout for centering elements both vertically and horizontally.
 */
export function CenteredLayout<T>( props: PropsWithChildren<T> ) {
    return (
        <Center h='100vh' w='100vw'>
            {props.children}
        </Center>
    )
}