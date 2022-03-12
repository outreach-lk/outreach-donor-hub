import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useToast } from '@chakra-ui/react'

/**
 * User UI Feedback Context.
 */
export const FeedbackContext = createContext<GlobalFeedbackState>({
    default: 'toast',
    visible: [],
    addToVisible: (f:FeedbackPrimitive)=>{},
    removeById: (i:string) => {},
});
const {Consumer, Provider} = FeedbackContext;

export function FeedbackProvider<P>(props: PropsWithChildren<P>){
    const toast = useToast();

    const [visible,setVisible] = useState<FeedbackPrimitive[]>([]);

    const addToVisible = (feedback: FeedbackPrimitive) => {
        setVisible( [ ...visible,feedback ] );
    }

    const removeById = ( id: string ) => {
        const _visible = visible.filter( f => f.id !== id);
        setVisible( _visible );
    }

    useEffect(()=>{
        visible.forEach( f => {
            if( f.visible ){
                return;
            }else{
                switch(f.type){
                    case 'toast':
                        // Uses ChakraUI Toasts
                        toast({
                            title: f.title,
                            description: f.message,
                            status: f.status,
                            isClosable: true,
                            position: 'top-end'
                        })
                        break;
                    case 'notification':
                        break;
                    case 'banner':
                        break;
                }
                f.visible = true;
            }
        })
    },[toast, visible])



    return (
        <Provider value={{
            default: 'toast',
            visible,
            addToVisible,
            removeById
        }}>
            {props.children}

        </Provider>
    )
}


type GlobalFeedbackState = {
    default: 'toast' | 'notification' | 'banner'; // Unneccassary ??
    visible: FeedbackPrimitive [];
    addToVisible: (feedback: FeedbackPrimitive) => void;
    removeById: (id:string) => void;
}

/**
 * Primitive Feedback data type
 */
type FeedbackPrimitive = {
    id: string,
    visible?: boolean
    type: 'toast' | 'notification' | 'banner',
    message: string,
    title?: string,
    status: 'error' | 'warning' | 'info' | 'success'
}

type Toast = FeedbackPrimitive & {};
type Notification = FeedbackPrimitive & {};
type Banner = FeedbackPrimitive & {};

