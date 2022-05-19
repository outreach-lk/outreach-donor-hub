import { Center, Container } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

/**
 * A layout for centering elements both vertically and horizontally.
 */
export function CenteredLayout<T>( props: PropsWithChildren<T> ) {
    return (
        <Container justifyContent="center" alignItems={"center"}>
            <Center  minH={'md'} >
                {props.children}
            </Center>
        </Container>
    )
}