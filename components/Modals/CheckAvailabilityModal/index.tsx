import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';

function CheckAvailabilityModal({open,setOpen , handleProceed , handleTalktoHost}:any) {
    const { t } = useTranslation();
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      style={isMobile ? {width : "80%"} : {width : "50%"}}
    >
      <Modal.Header>{t("check_availability_title")}</Modal.Header>
      <Modal.Content image>
    
        <Modal.Description style={{width : "65%"}}>

         <p style={{textAlign : "justify",fontSize : "16px", display: "block"}}>{t("check_availability_msg")}</p>
       
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions style={isMobile ? {display:"flex",flexDirection : "column" ,justifyContent : "center"}:{display:"flex",flexDirection : "row",justifyContent : "flex-end"}}>
      
        <Button content={t('PROCEED')} icon='checkmark' labelPosition='right' color='teal' onClick={() => handleProceed()} />
        <Button color='grey' onClick={() => handleTalktoHost()}>
          {t("TALK TO HOST")}
        </Button>
        <Button color='grey' onClick={() => setOpen(false)} >
          {t("CANCEL")}
        </Button>
     
      </Modal.Actions>
    </Modal>
  )
}

export default CheckAvailabilityModal