import React from 'react'
import { Footer, SEO, WithoutAuthRoute } from 'components';
function LoggedLayout({ children, footer, ...rest }: any) {
    return (
        <>
            <SEO {...rest} />
            <div>{children}</div>
            {
                footer === false ? null : <Footer />
            }
        </>
    )
}

export default WithoutAuthRoute(LoggedLayout);
