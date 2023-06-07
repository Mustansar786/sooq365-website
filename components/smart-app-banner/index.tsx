import React, { useState } from 'react'
import styles from './smart.app.module.css';
import { useRouter } from 'next/router'
import localforage from 'localforage';
import { EventsWebEngage,AllEvents } from 'components/Webengage';

const SmartAppBanner = () => {
    const [showBanner ,setShowBanner] = useState(true)

    const router = useRouter();
    const handleClick= async() => {
        await EventsWebEngage(AllEvents.DownloadApp)
        router.push('https://api.urent.com/urent-app');
     
    }

    const handleClose = () => {
        setShowBanner(false)
        localforage.setItem("smart-app-banner", false);
    }
    return (
      showBanner ? 
       <div className={styles.smartbanner} id="smartabanner">
        <div className={styles.smartbannerContainer}>
            <a onClick={handleClose} className={styles.smartbannerClose} >&times;</a>
            <span className={styles.smartbannerIcon}></span>
            <div className={styles.smartbannerInfo}>
                <div className={styles.smartbannerTitle}>Open the Urent App</div>
                <span style={{fontSize:"10px"}}>View on the Urent App for the best experience</span>
               
            </div>
            <div className={styles.smartbannerButton} onClick={handleClick}>
                <span className={styles.smartbannerButtonText}>Open</span>
            </div>
        </div>
    </div> :  null
    )
}
export default SmartAppBanner