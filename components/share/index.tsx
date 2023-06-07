import { BaseUrl } from 'constants/constants';
import React, { useState } from 'react'
import { Button,Modal } from 'semantic-ui-react'
import { copyToClipboard } from 'utils/lib';
import { useRouter } from 'next/router';

import styles from './share.module.css';

function Share({open,setOpen,item}:any) {
  const router = useRouter();

  const fb = "https://www.facebook.com/sharer/sharer.php?u="; 
  const twitter = `https://twitter.com/intent/tweet?text=`;
  const wtp = 'https://api.whatsapp.com/send?text='
  
 const activeStyle= {  border : "1px solid #ECF0FE",backgroundColor : '#F9FAFF'}
 const [active,setActive]= useState('')
  const handleClick = (text:any) => {
     setActive(text)
  }

  const {brand, model, attributes, id} = item;
  const message = `Check out ${brand?.name} ${model?.name||""} ${attributes?.Year?.value || ''} on: ${BaseUrl}/urent-app?page=vehicle&vehicle_id=${id}`;

  const handleShare = () => {
    let prefix  = ''
    setOpen(false)
    active == "fb"? prefix = fb : active == 'wtp' ? prefix = wtp : active == 'twt' ? prefix = twitter : ''
    prefix.length > 0 && router.push(`${prefix}${process.env.REACT_APP_SITE_URL + router.asPath}`)
  }

  return (
    <Modal
      className="square-corners"
      size='tiny'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
   
      <Modal.Content image>
        <Modal.Description style={{padding:"10px"}}>
          <div className={styles.flexBetween}>
          <p className={styles.headerText}>Share with a friend</p>
          <img style={{marginTop:"-10px",padding:"5px"}} src='/assets/share/Close.svg' onClick={()=>setOpen(false)}/>
          </div>
          <div className={styles.socialIcons}>
            <div className={styles.icon} onClick={()=>handleClick('wtp')} style={active === 'wtp' ? activeStyle :{}}>
                <img src={'/assets/share/wtsp.svg'} title="Whatsapp"></img>
            </div>
            <div className={styles.icon} onClick={()=>handleClick('fb')} style={active === 'fb' ? activeStyle :{}}>
                <img src={'/assets/share/Fb.svg'} title="Facebook"></img>
            </div>
            <div className={styles.icon} onClick={()=>handleClick('twt')} style={active === 'twt' ? activeStyle :{}}>
                <img src={'/assets/share/Twt.svg'} title="Twitter"></img>
            </div>
            </div>
            <div style={{marginTop:21}}>
              <p className={styles.copyText}>Copy the link:</p>
              <div className={styles.flexBetween}>
              <p className={styles.url}>{message}</p>
              <img src='/assets/share/copy_link.svg' onClick={()=>copyToClipboard(message)}/>
              </div>
            </div>
            <div style={{marginTop:"35px"}}>
            <Button
              content="Share"
              onClick={() => handleShare()}
              style={{backgroundColor:"#56C3C5",color:"white",padding:"11px 60px",borderRadius:"10px"}}
            />
             <Button
              basic
              content="Cancel"
              onClick={() => setOpen(false)}
              color='red'
              style={{padding:"11px 60px",borderRadius:"10px",marginLeft:"10px"}}
            />
            </div>
          
         
        </Modal.Description>
      </Modal.Content>
     
    </Modal>
  )
}

export default Share