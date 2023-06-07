import React from 'react'
import {
    Grid,
    Menu,
    Sidebar,
} from 'semantic-ui-react'
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next"
import { EventsWebEngage, AllEvents } from 'components/Webengage';

const SidebarLanguageComponent = ({ visible, setVisible, languageOptions }: SidebarLanguageComponent_type) => {
    const { i18n ,t } = useTranslation();

    const isRTL = i18n.dir() === 'rtl';
    const router = useRouter();
    const [language, setLanguage] = React.useState(languageOptions[0].text);

    const gotoOptions =async (item: any) => {
        await EventsWebEngage(AllEvents.LanguageSelected,{name:item.text})
        i18n.changeLanguage(item.value);
        setLanguage(item.text)
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: item.value })
        setVisible(false);
    }

    React.useEffect(() => {
        languageOptions.map((item: any) => {
            if (item.value === i18n.language) {
                setLanguage(item.text)
            }
        })
    }, [i18n.language])
    
    return (
        <Grid columns={1}>
            <Grid.Column id='languagebar'>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    onHide={() => setVisible(false)}
                    vertical
                    visible={visible}
                    width='thin'
                    direction={isRTL ? 'left' : 'right'}
                >
                    <div style={{display: 'flex', marginBottom: 20, cursor: 'pointer'}} onClick={() => setVisible(false)}>
                        <img src={`/assets/icons/sidebar-close.svg`} style={{ margin: 5 }} />
                    </div>
                    <div>
                        <h2>{t('Choose a language')}</h2>
                        {languageOptions ?
                            languageOptions.map((item: any, index: number) => {
                                return (
                                    <div className={language === item.text ? 'langItem-active' : 'langItem'} key={index} onClick={() => gotoOptions(item)} >
                                        <div className={'langItem-container'}>
                                            <div>
                                                <img src={`/assets/icons/${item.value}_icon.svg`} style={{ margin: 5 }} />
                                            </div>
                                            <div>
                                                <div>{item.text}</div>
                                                <div className={'subtext'}>{item.lang_name}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            : null
                        }
                    </div>
                </Sidebar>
            </Grid.Column>
        </Grid>
    )
}

type SidebarLanguageComponent_type = {
    visible: boolean,
    setVisible: any,
    languageOptions?: any
}

export default SidebarLanguageComponent
