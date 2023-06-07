import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Form, Modal, TextArea } from 'semantic-ui-react'
import ReactSelect from 'components/react-select';
import { useMutation } from '@apollo/client';
import { UPDATE_DELIVERY_STATUS } from 'graphql/mutation';
import { notification } from 'utils/notification';
import { useTranslation } from 'react-i18next';

export type HostDeliveryStatusModalHandle = {
    open: (deliveryStatusOptions: Array<any>, bookingId: string, delivery_reason: string, delivery_status: string, callback: () => void) => void,
}

const HostDeliveryStatusModal: React.ForwardRefRenderFunction<HostDeliveryStatusModalHandle> = (_, ref) => {
    const {t} = useTranslation()
    const [state, setstate] = useState<any>({
        isOpen: false,
        deliveryStatusOptions: [],
        selectedStatus: { label: "PENDING", value: "PENDING" },
        force_collect_reason: "",
        bookingId: "",
        callback: undefined
    });
    const [errorValidation, setErrorValidation] = useState('')

    const [buttonloader, setbuttonloader] = useState(false);

    // ----------------------------------------------------QUERIES----------------------------------------------------

    const [updateDeliveryStatus] = useMutation(UPDATE_DELIVERY_STATUS, {
        onCompleted: () => {
            notification(t("success"), t("Delivery Status"), t("Delivery Status has been updated!"));
            closeCancelBookingModal();
            setbuttonloader(false);
            state.callback();

        },
    });

    // ----------------------------------------------------END QUERIES----------------------------------------------------

    useImperativeHandle(ref, () => ({
        open(deliveryStatusOptions, bookingId, delivery_reason, delivery_status, callback) {
            setErrorValidation("")
            const selectedDeliveryStatus = deliveryStatusOptions.find(x => x.value == delivery_status);
            setstate({ 
                ...state, 
                isOpen: true, 
                deliveryStatusOptions, 
                bookingId,
                force_collect_reason: delivery_reason ? delivery_reason: "", 
                selectedStatus: selectedDeliveryStatus ? selectedDeliveryStatus : { label: "PENDING", value: "PENDING" },
                callback 
            })
        }
    }));


    const closeCancelBookingModal = () => {
        setstate({ ...state, isOpen: false })
    }

    const handleReasonChange = (val: any) => {
        setstate({ ...state, selectedStatus: val })
    }

    const onChange = (e: any) => {
        setstate({ ...state, force_collect_reason: e.target.value })
    }


    const handleActionRenter = () => {

        if (state.selectedStatus.value === "") {
            setErrorValidation(t("Please Select Delivery Status"))
        } 
        else if (state.selectedStatus.value == "Force_Collected" && state.force_collect_reason == "") {
            setErrorValidation(t("Please Provide Reason In-case of Force Collected"))
        }
        else {
            setErrorValidation("")
            setbuttonloader(true);
            updateDeliveryStatus({
                variables: {
                    booking_id: state.bookingId,
                    delivery_status: state.selectedStatus.value,
                    force_collect_reason: state.force_collect_reason
                }
            })
        }

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
                    <h3 style={{ color: "#56C3C5", display: "flex", alignItems: "center" }}>
                        {t('Delivery Status')}
                    </h3>
                    <p>{t('Are you sure you want to update delivery status?')}</p>
                    
                    <div style={{ marginTop: "3rem", width: "100%" }}>
                        <ReactSelect
                            options={state.deliveryStatusOptions}
                            value={state.selectedStatus.label === "" ? null : state.selectedStatus}
                            handleChange={handleReasonChange}
                            placeholder={t("Select Reason")}
                            name='cancel'
                        />
                        <span className="error">{errorValidation}</span>
                        <Form>
                            <TextArea placeholder={t('Reason (If force collected)')} name="force_collect_reason" onChange={onChange} value={state.force_collect_reason} style={{ minHeight: 100, marginTop: "1rem", width: "100%" }} />
                        </Form>
                        <div style={{ marginTop: "1rem", marginBottom: "4rem" }}>
                            <Button.Group floated="left">
                                <Button onClick={closeCancelBookingModal}>{t('Cancel')}</Button>
                                <Button.Or />
                                <Button color='green' onClick={handleActionRenter} loading={buttonloader}>{t('Update')}</Button>
                            </Button.Group>
                        </div>
                    </div>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
};

export default forwardRef(HostDeliveryStatusModal);
