import React from 'react';
import styles from './styles.module.css';
import {
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    WhatsappIcon,
    TwitterIcon,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";
import cx from 'classnames';
import { copyToClipboard } from 'utils/lib';
import { useTranslation } from 'react-i18next';
import { EventsWebEngage,AllEvents  } from 'components/Webengage';

export default function InviteFriend() {
    const {t, i18n} = useTranslation()
    const message = `I just found this interesting app called Urent! It’s revolutionizing vehicle rentals, I think U might like it! Check it out: ${'\n'}: https://urent.com`;

    return (
        <>
            <div className={styles.invite_friend}>
                <div className={styles.social_buttons_arr} >
                    <FacebookShareButton
                      onClick={async()=>{
                          await EventsWebEngage(AllEvents.Share,{platform:"Facebook"})
                      }}
                        quote={message}
                        url="https://urent.com"
                        title="Urent">
                        <FacebookIcon className={styles.social_media} size={40} />
                    </FacebookShareButton>
                    <LinkedinShareButton
                    onClick={async()=>{
                        await EventsWebEngage(AllEvents.Share,{platform:"Linkedin"})
                    }}
                        title="URent"
                        summary={message}
                        url="https://urent.com"
                        source={'https://urent.com'}
                    >
                        <LinkedinIcon className={styles.social_media} size={40} />
                    </LinkedinShareButton>

                    <TwitterShareButton
                    onClick={async()=>{
                        await EventsWebEngage(AllEvents.Share,{platform:"Twitter"})
                    }}
                        title="URent"
                        via={message}
                        url="https://urent.com"
                    >
                        <TwitterIcon className={styles.social_media} size={40} />
                    </TwitterShareButton>

                    <TelegramShareButton
                     onClick={async()=>{
                        await EventsWebEngage(AllEvents.Share,{platform:"Telegram"})
                    }}
                        title="URent"
                        url="https://urent.com"
                    >
                        <TelegramIcon className={styles.social_media} size={40} />
                    </TelegramShareButton>

                    <WhatsappShareButton
                     onClick={async()=>{
                        await EventsWebEngage(AllEvents.Share,{platform:"Whatsapp"})
                    }}
                        title="URent"
                        url="https://urent.com"
                    >
                        <WhatsappIcon className={styles.social_media} size={40} />
                    </WhatsappShareButton>
                </div>
            </div>
            <div className={cx([styles.search_wrapper], [styles.cf])}>
                {i18n.language === "ar" && <button style={{float: "left"}} onClick={() => copyToClipboard(message)}>{t("Copy URL")}</button>}
                <input type="text" value={'shorturl.at/svGS4'} disabled required style={{ boxShadow: "none" }} />
                {i18n.language !== "ar" && <button onClick={() => copyToClipboard(message)}>{t("Copy URL")}</button>}
            </div>
        </>
    )
}
