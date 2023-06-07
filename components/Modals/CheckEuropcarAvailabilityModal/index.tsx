import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';

function CheckEuropcarAvailabilityModal({open,setOpen,heading,title, handleProceed }:any) {
    const { t } = useTranslation();
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      style={isMobile ? {width : "80%"} : {width : "50%"}}
    >
      <Modal.Header>{heading}</Modal.Header>
      <Modal.Content image>
    
        <Modal.Description style={{width : "65%"}}>

         <p style={{textAlign : "justify",fontSize : "16px", display: "block"}}>{title}</p>
       
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions style={isMobile ? {display:"flex",flexDirection : "column" ,justifyContent : "center"}:{display:"flex",flexDirection : "row",justifyContent : "flex-end"}}>
      
        <Button content={t('PROCEED')} icon='checkmark' labelPosition='right' color='teal' onClick={() => handleProceed()} />
        <Button color='grey' onClick={() => setOpen(false)} >
          {t("CANCEL")}
        </Button>
     
      </Modal.Actions>
    </Modal>
  )
}

export default CheckEuropcarAvailabilityModal