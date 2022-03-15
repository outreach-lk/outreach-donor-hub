/**
 * Hooks for user feedback UIs
 * @kulathilake
 */

import { useContext } from "react";
import { FeedbackContext } from "../context/feedback.context";
import { generateFeedbackId } from "../utils/generate-ids";

export function useFeedback(){
    const { addToVisible } = useContext(FeedbackContext)
    return {
        show: (message: string | Error, options: IFeedbackOptions ) => {
            if( message instanceof Error) {
                message = message.message;
            }
            addToVisible({
                id: generateFeedbackId(),
                message: message,
                status: options.type,
                type: 'toast',
                title: options.title
            });
        }
    }
}

/**
 * FIXME: move to separate file
 */
type IFeedbackOptions = {
    type: 'error' | 'warning' | 'info' | 'success',
    title? : string
}