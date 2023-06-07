import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Form, Modal, TextArea } from 'semantic-ui-react'
import { IoAlertCircleSharp as AlertIcon } from 'react-icons/io5';
import ReactSelect from 'components/react-select';
import { useMutation } from '@apollo/client';
import { CANCEL_OR_ACCEPT_BOOKING_WITH_REASON_HOST, HOST_CANCEL_BOOKING } from 'graphql/mutation';
import { notification } from 'utils/notification';
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next';
// import styles from './paymentModalTELR.module.css';
export type CancelHostBookingModalHandle = {
    open: (rejectOptions: any, bookingId: string, approved: boolean, callback: () => void) => void,
}

const CancelHostBookingModal: React.ForwardRefRenderFunction<CancelHostBookingModalHandle> = (_, ref) => {
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

    // ----------------------------------------------------QUERIES----------------------------------------------------

    const [hostCancelBooking] = useMutation(CANCEL_OR_ACCEPT_BOOKING_WITH_REASON_HOST, {
        onCompleted: () => {
           notification("success", "Booking Cancelled", "Booking Cancelled Successfuly");
           closeCancelBookingModal();
           setbuttonloader(false);
           state.callback();
           
        },
    });

    const [hostApprovedCancelBooking] = useMutation(HOST_CANCEL_BOOKING, {
        onCompleted: () => {
           notification("success", "Booking Cancelled", "Booking Cancelled Successfuly");
           closeCancelBookingModal();
           setbuttonloader(false);
           state.callback();
        },
    });
    
    // ----------------------------------------------------END QUERIES----------------------------------------------------

    useImperativeHandle(ref, () => ({
        open(rejectOptions, bookingId,approved, callback) {
            setstate({ ...state, isOpen: true,approved, rejectOptions, bookingId, callback })
        }
    }));


    const closeCancelBookingModal =() =>{
        setstate({  
            rejectOptions:[], 
            selectedReason:{label:"", value:""},
            rejectDescription :"",
            bookingId:"",
            callback: undefined,
            isOpen: false })
    }

    const handleReasonChange =(val: any)=>{
        setstate({ ...state, selectedReason: val })
        setErrorValidation("")
    }

    const onChange =(e:any)=>{
        setstate({...state, rejectDescription:e.target.value})
    }

    const handleActionRenter =(is_vehicle_will_offline:any)=>{

        if(state.selectedReason.value === ""){
            setErrorValidation(t("Please Select Reason"))
        } 
        else if (state.selectedReason.label == 'other' && state.rejectDescription == '') {
            setErrorValidation(t("Please fill information if reason selected as other"))
        }
        else {
            setErrorValidation("")
            setbuttonloader(true);
            if (!state.approved) {
                hostCancelBooking({
                    variables: {
                        confirm: false,
                        booking_id: state.bookingId,
                        reject_reason_id: state.selectedReason.value,
                        reject_Description: state.rejectDescription,
                        vehicle_offline:is_vehicle_will_offline?true:false
                    }
                })
            } else {
                hostApprovedCancelBooking({
                    variables: {
                        booking_id: state.bookingId,
                        cancel_reason_id: state.selectedReason.value,
                        cancel_Description: state.rejectDescription
                    }
                })
            }
        }
        
    }
    const rejectAlert = () => {
        swal({
            title: t("Are you sure?"),
            text: t("Your vehicle will become offline automatically, you would need to make it online manually when the vehicle is available for booking."),
            icon: "warning",
            dangerMode: true,
            buttons:["No", "Yes"],
            closeOnClickOutside : false
        })
        .then(willDelete => {
            if (willDelete) {
                const is_vehicle_will_offline=true;
                handleActionRenter(is_vehicle_will_offline)
            }
        });
        
    }
    return (
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
                    <p>{t('Please be aware that there will be cancellation charges associated with this cancellation as per URent’s terms and conditions !')}</p>
                    
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
                            <TextArea placeholder={t('Enter Extra Information')} name="rejectDescription" onChange={onChange} value={state.rejectDescription} style={{ minHeight: 100, marginTop: "1rem" ,width:"100%"}} />
                        </Form>
                        <div style={{marginTop:"1rem", marginBottom:"4rem"}}>
                            <Button.Group floated="left">
                                <Button onClick={closeCancelBookingModal}>{t('Cancel')}</Button>
                                <Button.Or />
                                <Button color='red' onClick={()=>{
                                    if(state.selectedReason.value==="5f7363b2efba090011dee83f"||state.selectedReason.value==="5f746cfa27e79e00180d4ee6"||state.selectedReason.value==="5f746d158f71a7001b481cec"){
                                    rejectAlert()
                                    }else{
                                        handleActionRenter(false)
                                    }
                                }} loading={buttonloader}>{t('Reject')}</Button>
                            </Button.Group>
                        </div>
                    </div>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
};

export default forwardRef(CancelHostBookingModal);
