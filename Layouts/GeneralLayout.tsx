import React from 'react'
import { Footer, SEO} from 'components';
import Header from 'components/Header';
import { useRouter } from 'next/router';

function GeneralLayout({ children, footer, ...rest }: any) {
    const [width, setWidth] = React.useState(0);
    const [LoadMobile, setLoadMobile] = React.useState(false)

    React.useEffect(() => {
      setWidth(window.innerHeight);
    });
    const router = useRouter();
    React.useEffect(() => {
        const { load } = router.query
    
        load === 'mobile' ? setLoadMobile(true) : setLoadMobile(false)
    
      }, [router.query])
    return (
        <>
            <div className="general-container" style={{ minHeight:width - (width < 768 ? 61 : 360) }}>
                { LoadMobile ? null : <SEO {...rest} /> }
                { LoadMobile ? null : <Header /> }
                <div className="main-body-container">{children}</div>
            </div>
            {
                (footer === false || LoadMobile ) ? null : <Footer />
            }
        </>
    )
}

export default GeneralLayout;
