import { HStack, Stack } from '@chakra-ui/react';
import {FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton} from 'react-share';

export function ShareButtons(props:{url:string, title:string, desc?:string}){
    return (
    <HStack>
    <FacebookShareButton url={props.url} >
        <FacebookIcon/>
    </FacebookShareButton>
    <TwitterShareButton url={props.url} title={'\n' + props.title + '\n'} hashtags={['Donations',"lka"]} via="OutreachDonorHub">
        <TwitterIcon/>
    </TwitterShareButton>
    <LinkedinShareButton url={props.url} title={props.title} summary={props.desc}>
        <LinkedinIcon/>
    </LinkedinShareButton>
    </HStack>
    )
}