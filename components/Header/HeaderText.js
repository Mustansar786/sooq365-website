import { isMobile } from 'react-device-detect'
import style from './header.module.css'
import { useTranslation } from 'react-i18next'

export default function HeaderText() {
    const {t} = useTranslation()
   
    return (
        <>
            <div className="main-body-container">
                <div className="header-text" style={{padding : isMobile ? "6%" : "",marginBottom:20}}>
                    <h5 className={style.headerText} style={{color:"white", fontFamily:"Nunito"}}>{t(`Explore The World's Largest Multi-Vehicle Rental Marketplace`)}</h5>
                </div>
            </div>

        </>

    )
}
