import React from 'react'
import { useUserAgent } from 'next-useragent'

export const getPlatform = (props) => {
    let ua;
    if (props.uaString) {
        ua = useUserAgent(props.uaString)
    } else {
        ua = useUserAgent(window.navigator.userAgent)
    }
    return ua;
}

export function getServerSideProps(context) {
    return {
        props: {
            uaString: context.req.headers['user-agent']
        }
    }
}