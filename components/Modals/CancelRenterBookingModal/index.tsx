import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Form, Modal, TextArea } from 'semantic-ui-react'
import { IoAlertCircleSharp as AlertIcon } from 'react-icons/io5';
import ReactSelect from 'components/react-select';
import { useMutation } from '@apollo/client';
import { CANCEL_BOOKIN_WITH_REASON_RENTER } from 'graphql/mutation';
import { notification } from 'utils/notification';
import { useTranslation } from 'react-i18next';

// import styles from './paymentModalTELR.module.css';
export type CancelRenterBookingModalHandle = {
    open: (rejectOptions:any, bookingId:string, callback:()=>void) => void,
}

const CancelBookingModal: React.ForwardRefRenderFunction<CancelRenterBookingModalHandle> = (_, ref) => {
    const {t} = useTranslation()
    const [state, setstate] = useState<any>({
        isOpen:false, 
        rejectOptions:[], 
        selectedReason:{label:"", value:""},
        rejectDescription :"",
        bookingId:"",
        callback: undefined
    });
    const [errorValidation, setErrorValidation] = useState('')
    const [buttonloader, setbuttonloader] = useState(false);
    // const [refundStatusModal, setRefundStatusModal] = useState(false);


    const [renterCancelBooking] = useMutation(CANCEL_BOOKIN_WITH_REASON_RENTER, {
        onCompleted: (data) => {
           notification(t("success"), t("Booking Cancelled"), data.renterCancelBooking);
           closeCancelBookingModal();
        //    setRefundStatusModal(true);
           setbuttonloader(false);
           state.callback();
        },
    });

    useImperativeHandle(ref, () => ({
        open(rejectOptions, bookingId, callback) {
            setstate({ ...state, isOpen: true, rejectOptions, bookingId, callback })
        }
    }));


    const closeCancelBookingModal =() =>{
        setstate({ ...state, isOpen: false })
    }

    const handleReasonChange =(val: any)=>{
        setstate({ ...state, selectedReason: val })
    }

    const onChange =(e:any)=>{
        setstate({...state, rejectDescription:e.target.value})
    }


    const handleActionRenter =()=>{

        if(state.selectedReason.value === ""){
            setErrorValidation(t("Please Select Reason"))
        }
        else if (state.selectedReason.label == 'other' && state.rejectDescription == '') {
            setErrorValidation(t("Please fill information if reason selected as other"))
        }
        else{
            setErrorValidation("")
            setbuttonloader(true)
            renterCancelBooking({
                variables: {
                    booking_id: state.bookingId,
                    canceled_reason_id:state.selectedReason.value,
                    cancel_Description:state.rejectDescription
                }
            })
        }
        
    }
    return (
        <>
 <Modal
            closeIcon
            onClose={closeCancelBookingModal}
            onOpen={() => setstate({ ...state, isOpen: true })}
            open={state.isOpen}
        >
            <Modal.Content >
                <Modal.Description >
                    <h3 style={{ color: "#f54e4e", display: "flex", alignItems: "center" }}>
                        <AlertIcon size={30} color="#f54e4e" />
                        {t('Cancel Booking')}
                    </h3>
                    <p>{t('Are you sure you want to reject booking?')}</p>
                    <p>{t("Please be aware that there will be cancellation charges associated with this cancellation as per URent’s terms and conditions !")}</p>
                    <div style={{ marginTop: "3rem", width: "100%" }}>
                        <ReactSelect
                            options={state.rejectOptions}
                            value={state.selectedReason.label === "" ? null : state.selectedReason}
                            handleChange={handleReasonChange}
                            placeholder={t("Select Reason")}
                            name='cancel'
                        />
                        <span className="error">{errorValidation}</span>
                        <Form style={state.selectedReason.label == 'other' ? null : {visibility: 'hidden'}}>
                            <TextArea placeholder={t('Enter Extra Information')} name="rejectDescription" onChange={onChange} value={state.rejectDescription} style={{ minHeight: 100, marginTop: "1rem" }} />
                        </Form>
                        <div style={{marginTop:"1rem", marginBottom:"4rem"}}>
                            <Button.Group floated="left">
                                <Button onClick={closeCancelBookingModal}>{t('No')}</Button>
                                <Button.Or />
                                <Button color='red' onClick={handleActionRenter} loading={buttonloader}>{t('Cancel')}</Button>
                            </Button.Group>
                        </div>
                    </div>
                </Modal.Description>
            </Modal.Content>
        </Modal>

{/* <Modal
      onClose={() => setRefundStatusModal(false)}
    //   onOpen={() => setRefundStatusModal(true)}
      open={refundStatusModal}
    >
      <Modal.Header>Cancel Booking</Modal.Header>
      <Modal.Content>
        <p>Your cancellation request will be processed. Our team will contact you soon. Please note that the cancellation policy of the host will apply.</p>
      </Modal.Content>
      <Modal.Actions>
        
        <Button
          content="Ok"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setRefundStatusModal(false)}
          positive
        />
      </Modal.Actions>
    </Modal> */}
        </>
    )
};

export default forwardRef(CancelBookingModal);
