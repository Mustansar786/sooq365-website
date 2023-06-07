import React from 'react'
import { Button } from 'semantic-ui-react';
import styles from './styles.module.css';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL_MUTATION } from 'graphql/mutation';
import { useRouter } from 'next/router';
import AuthLayout from 'Layouts/AuthLayout';
import { notification } from 'utils/notification';
import { useSelector } from 'react-redux';
import { RootStateI } from 'redux/reducer';
import {useTranslation} from 'react-i18next'
import { SEO } from 'components';



function  EmailVerification() {
    const {t} = useTranslation();
    const router = useRouter();
    const userSelector = useSelector((state: RootStateI) => state.user);
    // ----------------------------------------------------QUERIES----------------------------------------------------
    const [emailVerification] = useMutation(VERIFY_EMAIL_MUTATION, {
        onCompleted: () => {
            notification('success', t("Email Sent!"), t("Please check your inbox"))
        },
        onError: () => {
            notification('danger', t("Email not Sent!"), t("Something went wrong, Try again"));
        }
    });
    // ----------------------------------------------------QUERIES----------------------------------------------------

    React.useEffect(() => {
        if (userSelector.user.verifiedEmail) {
            router.push("/")
        }
    }, [])

    const verifyEmail = () => {
        emailVerification();
    }
    return (
        <AuthLayout authenticate={true} >
            <SEO title="Email Verification" />
            <div>
                <div className={styles.upload}>
                    <div className={styles.uploadTitle} style={{ flexDirection: 'column' }}>
                        <div className={styles.uploadText+ ' '+ 'animate__animated animate__backInDown'}>{t("Verify Your Email")}</div>
                        <div className={styles.arrange_buttons}>
                            <Button content={t("Verify Now")} color='teal' size='big' className={styles.font +' '+ 'animate__animated animate__backInLeft'} onClick={verifyEmail} />
                            <Button content={t("Verify Later")} color='grey' size='big' className={styles.font+' '+ 'animate__animated animate__backInRight'} onClick={() => router.push('/')} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>

    )
}

export default EmailVerification