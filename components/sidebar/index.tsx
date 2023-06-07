import React from 'react'
import {
    Grid,
    Menu,
    Sidebar,
    Icon,
    MenuItem
} from 'semantic-ui-react'
import Link from 'next/link'
import { useRouter } from "next/router";
import styles from "components/Header/header.module.css";
import cx from 'classnames';
import {useTranslation} from "react-i18next"

const SidebarComponent = ({ visible ,setVisible, languageOptions }: SidebarComponent_type) => {
    const {t} = useTranslation()

    const { i18n } = useTranslation(); 

    const isRTL    = i18n.dir() === 'rtl';
    const router = useRouter();
    const [visibleLanguage, setvisibleLanguage] = React.useState(false);
    const [language, setLanguage] = React.useState(languageOptions[0].text);

    

    const gotoOptions = (item:any) => {
        i18n.changeLanguage(item.value);
        setLanguage(item.text)
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: item.value })
        setVisible(false);
    }

    React.useEffect(() => {
        languageOptions.map((item:any) => {
            if (item.value === i18n.language) {
                setLanguage(item.text)
            }
        })
    }, [i18n.language])
    return (
        <Grid columns={1}>
            <Grid.Column>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    onHide={() => setVisible(false)}
                    vertical
                    visible={visible}
                    width='thin'
                    direction={isRTL ? 'left' : 'right'}
                >
                    {/* <Menu.Item as='a'>
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='gamepad' />
                            Games
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='camera' />
                            Channels
                        </Menu.Item> */}
                    <div className={styles.sidebarMenu}>
                        <Link href="/">
                            <a className={cx({ [styles.sidebarMenuActive]: router.pathname === '/' })}>{t("Home")}</a>
                        </Link>
                        <Link href="/about">
                            <a className={cx({ [styles.sidebarMenuActive]: router.pathname === '/about' })}>{t("About Us")}</a>
                        </Link>
                        <Link href="/vehicles">
                            <a className={cx({ [styles.sidebarMenuActive]: router.pathname === '/vehicles' })}>{t("Vehicles")}</a>
                        </Link>
                        <Link href="/how-it-works">
                            <a className={cx({ [styles.sidebarMenuActive]: router.pathname === '/how-it-works' })}>{t("How it works?")}</a>
                        </Link>
                        {/* <Link href="/urent-team">
                            <a className={cx({ [styles.sidebarMenuActive]: router.pathname === '/urent-team' })}>{t("Urent Team")}</a>
                        </Link> */}
                        <Link href="/contact-us">
                            <a className={cx({ [styles.sidebarMenuActive]: router.pathname === '/contact-us' })}>{t("Contact Us")}</a>
                        </Link>
                        
                    </div>

                    <div onClick={()=>setvisibleLanguage(!visibleLanguage)} className={styles.sidebarMenu}>
                        <div style={{display:'flex',flexDirection:'row',justifyContent: 'space-between', alignItems:'center'}}>
                            <p>{language}</p>
                            <Icon name="angle down"></Icon>
                        </div>

                        { languageOptions && visibleLanguage ? 
                            languageOptions.map((item:any, index:number) => {
                                if(language !== item.text){
                                    return (
                                        <MenuItem key={index} value={item.value} onClick={() => gotoOptions(item)} >{item.text}</MenuItem>
                                    )
                                }    
                            })
                            : null
                        }
                    </div>
                </Sidebar>
            </Grid.Column>
        </Grid>
    )
}

type SidebarComponent_type = {
    visible: boolean,
    setVisible:any,
    languageOptions?:any,
    
    
}

export default SidebarComponent
