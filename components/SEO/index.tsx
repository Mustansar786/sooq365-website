import React from 'react'
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
const SEO: React.FC<SEOProps> = ({ description, keywords, title, pageScript }) => {
    const {t} = useTranslation()
    return (
        <>
            <Head>
                <title>{title?.toLowerCase() === 'home' ? t('Time for U to Rent!') : title} | {t('Rent Any Vehicle')}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords?.join(', ')} />
                <meta property="og:type" content="website" />
                {/* <meta name="og:title" property="og:title" content={title} />
                <meta name="og:description" property="og:description" content={description} />
                <meta property="og:site_name" content="" />
                <meta property="og:url" content="" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:site" content="" />
                <meta name="twitter:creator" content="@AhmedElywh" />
                <meta name="twitter:image" content="" />
                <meta property="og:image" content="" /> */}
                {/* <link rel="icon" type="image/png" href="/icons/icon-72x72.png" />
                <link rel="apple-touch-icon" type="image/png" href="/icons/icon-72x72.png" /> */}
           
                 {pageScript&&
                    pageScript
                 }
                {/*  Google Tag Manager */}
                {
                    process.browser ? 
                    (function (w: any, d: any, s: any, l: any, i: any) {
                    {/*  End Google Tag Manager */}

                        w[l] = w[l] || []; w[l].push({
                            'gtm.start':
                                new Date().getTime(), event: 'gtm.js'
                        }); const f = d.getElementsByTagName(s)[0],
                            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                                'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
                    })(window, document, 'script', 'dataLayer', process.env.GTM_KEY)
                    
                    :
                    null
                }
                
                
            </Head>

        </>
    )
}



export interface SEOProps {
    description?: string;
    meta?: any[];
    keywords?: string[];
    title: string;
    pageScript?:any
}


SEO.defaultProps = {
    description: 'Urent stands for an innovative solution where users can use their smartphones to rent or list vehicles with amazing offers to save money when they rent a vehicle respectively. We help traditional rental companies, and private hosts shift their business online via Urent.',
    keywords: [
        'urent',
    ],
    meta: [
        'urent meta'
    ]
};


export default SEO;
