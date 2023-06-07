import React from 'react';
import styles from './styles.module.css';
import { Icon ,Button, Popup} from 'semantic-ui-react'
import { ImagePrefix,display_image } from 'constants/constants';
import { UPDATE_SELFIE } from 'graphql/mutation';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL_MUTATION } from 'graphql/mutation';
import { notification } from 'utils/notification';
import router from 'next/router';
import { useSelector } from 'react-redux';
import { RootStateI } from 'redux/reducer';
import { useTranslation } from 'react-i18next';


export interface IProfileInforParams {
    email?: string
    gender?: string
    international_license?: boolean
    verifiedEmail?: boolean
    status?: boolean
    name?: string
    selfie_image?: string,
    earning : number,
    spending : number
}
export interface IProfileInfo {
    userProfile: IProfileInforParams
}


export default function ProfileInfo({ userProfile: { name, verifiedEmail, selfie_image, status,earning,spending } }: IProfileInfo) {
    const { t } = useTranslation();
    const [image, setImage] = React.useState({ image: "", temp: "" })

    const imageRef = React.useRef<any>();
    const userselector = useSelector((state: RootStateI) => state.user);
   // const [resCurrency,setResCurrency] = useState("AED")

    // ----------------------------------------------------QUERIES----------------------------------------------------

    let residingInCurrency = "";
    const activeResidingIn = userselector?.user?.profile?.residing_in?.find((object:any) => object.active == true)
    if(activeResidingIn?.countryId?.currency){
        residingInCurrency = activeResidingIn?.countryId?.currency || "AED";
        //setResCurrency(residingInCurrency)
    }

    const [updateSelfie] = useMutation(UPDATE_SELFIE, {
        onError: () => {
            notification('danger', t("Error"), t("Error to update profile Image"),);
        },
        onCompleted: () => {
            notification('success', t("Profile Image Updated"), t("Profile Image Updated Successfully"),);
        }

    });
    // ----------------------------------------------------QUERIES----------------------------------------------------


    const imageClicked = () => {
        if (imageRef.current)
            imageRef.current.click();
    }

    const onChangeImage = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            const object = { temp: URL.createObjectURL(img), image: img };
            updateSelfie({
                variables: {
                        selfie_image: img
                }
            })
            setImage(object)
        }
    }

    const gotoDocuments = () => {
        router.push({
            pathname: '/upload-docs',
            query: { shouldShow: true}
        })
    }

    const [emailVerification] = useMutation(VERIFY_EMAIL_MUTATION, {
        onCompleted: () => {
            notification('success', `${t("Email Sent!")}`, `${t("Please check your inbox")}`)
        },
        onError: () => {
            notification('danger', `${t("Email not Sent!")}`, `${t("Something went wrong, Try again")}`);
        }
    });
    // ----------------------------------------------------QUERIES----------------------------------------------------

    const verifyEmail = () => {
        emailVerification();
    }

    const getStatus = () => {
        const verify = "VERIFIED";
        const {user:{documents:{goverment,licens},verifiedEmail,verified_phone,status}} = userselector;
        return status === verify && goverment === verify && licens === verify && verifiedEmail && verified_phone;
    }

    const isVerified = getStatus();
   
    return (
        <div className={styles.profile_section} style={{marginLeft:0,marginRight:0}}>
            <div className={styles.profile_img}>
                <Popup content={selfie_image ? t('Change Profile Picture') : t('Upload Profile picture')} position='bottom center' trigger={<img src={image.temp ? image.temp : selfie_image ? display_image(ImagePrefix + selfie_image) : "/assets/user/default_user.png"}
                    alt="urent-user"
                    onError={(e: any) => e.target.src = '/assets/user/default_user.png'}
                    className={styles.p_img} onClick={imageClicked} />} />
              
                <input type="file" onChange={onChangeImage} ref={el => imageRef.current = el} style={{ display: "none" }} />
            </div>
            <div className={styles.text_center}>
                <h3 style={{ textTransform: "capitalize" }}>{name}</h3>
                {!verifiedEmail ? <Button icon labelPosition='left' color='teal' onClick={verifyEmail}>
                    <Icon name='mail outline'/>
                    {t("Verify Email Now")}
                </Button> :null}
               
            </div>

            <div className={styles.user_status}>
                <div className={styles.status}>
                    <h4>{t("Email Verified")} <span>{verifiedEmail ? <Icon name='checkmark' color="green" /> : <Icon name='close' color="red" />}</span></h4>
                </div>
                <div className={styles.status}>
                    {
                        isVerified ? <h4 id={"as-"+status}>{t("Account Verified")} <span> <Icon name='checkmark' color="green" /></span></h4>
                        : <h4 id={"as-"+status}>{t("Account Not Verified")} <span> <Icon name='close' color="red" /></span></h4>
                    }
                    
                </div>
                <div className={styles.status}>
                    <h4>
                        {
                            (userselector?.user.documents.goverment == "VERIFIED" && userselector?.user.documents.licens == "VERIFIED") ? 
                                <button onClick={gotoDocuments} className={styles.looks_link} style={{color:'#55cf78'}}>{t("View Documents ")}</button>
                            : (userselector?.user.documents.goverment=="RESUBMIT_DOCUMENTS_REQUIRED" && userselector?.user.documents.licens=="RESUBMIT_DOCUMENTS_REQUIRED") ? 
                                <button onClick={gotoDocuments} className={styles.looks_link} style={{color:'#f54e4e'}}>{t("Resubmit Documents")}</button>
                            : (userselector?.user.documents.goverment=="UNDER_PROCESS" && userselector?.user.documents.licens=="UNDER_PROCESS") ? 
                                <button onClick={gotoDocuments} className={styles.looks_link} style={{color:'#edc158'}}>{t("Submitted for Review")}</button>
                            : 
                                <button onClick={gotoDocuments} className={styles.looks_link} style={{color:'#f54e4e'}}>{t("Upload Documents")}</button>
                        }
                    </h4>
                </div>
            </div>
        {  earning > 0 || spending > 0 ? <>
            <hr className={styles.hr}></hr>
            <div className={styles.rent_info}>
            <div style={{display:'flex',justifyContent: earning > 0 && spending > 0 ? 'space-between':'center'}}>
               {earning > 0 && <div className={styles.bookings}>
                    <h3>{t("Total Earnings")}</h3>
                    <span>{t(`${residingInCurrency.toUpperCase()}`)}{" "+earning.toFixed(2)}</span>
                </div>}
                {spending > 0 && <div className={styles.bookings}>
                    <h3>{t("Total Spending")}</h3>
                    <span>{t(`${residingInCurrency.toUpperCase()}`)} {spending.toFixed(2)}</span>
                </div>}
            </div>
            </div>
            </>:null
            }
        </div>
    )
}
