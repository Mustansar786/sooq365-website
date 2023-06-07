import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import styles from './forgot-password.module.css';
import cx from 'classnames';
import { IValidateResetPassword } from 'utils/validator.types';
import { validateResetPassword } from 'utils/validator';
import { notification } from 'utils/notification';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from 'graphql/mutation';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export interface IForgotPasswordComponent {
    phone: string,
    email: string,
    code: string
}
export default function ForgotPasswordComponent({phone, code, email}:IForgotPasswordComponent) {
    const {t} = useTranslation()
    const [state, setstate] = useState<any>({ password: "", confirmPassword: "", errors: { errorPassword: "", errorConfirmPassword: "" } });
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    
    // ----------------------------------------------------QUERIES----------------------------------------------------

    const [changePassword] = useMutation(CHANGE_PASSWORD, {
        onCompleted: () => {
            setLoading(false)
            router.push('/')
            notification('success', 'Successful!', "Your password reset successfully")
        },
        onError: () => {
            setLoading(false)
            notification('danger', 'Failed!', 'Something went wrong, Try again');
        }
    });
    // ----------------------------------------------------QUERIES----------------------------------------------------


    const onChangeField = (e: any) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }

    const resetPassword = () => {
        const resultedValidation: IValidateResetPassword = validateResetPassword(state.password, state.confirmPassword);
        if (!resultedValidation.success) {
            setstate({ ...state, errors: { ...state.erros, errorPassword: resultedValidation.errorPassword, errorConfirmPassword: resultedValidation.errorConfirmPassword } });
            return false;
        } else {
            setstate({ ...state, errors: { ...state.errors, errorPassword: "", errorConfirmPassword: "" } });
            changePassword({
                variables:{
                    phone,
                    code,
                    email,
                    password:state.password
                }
            });
        }
    }

    return (
        <div style={{marginTop:"3rem"}}>
            <Form>
                <Form.Input
                    required
                    fluid
                    type="password"
                    name='password'
                    className="animate__animated animate__backInLeft"
                    label='Password'
                    value={state.password}
                    placeholder='Enter Password'
                    onChange={onChangeField}
                />
                {state.errors.errorPassword && <span className="error" style={{ marginTop: -10, marginBottom: "1rem" }}>{t(state.errors.errorPassword)}</span>}

                <Form.Input
                    required
                    fluid
                    type="password"
                    name='confirmPassword'
                    className="animate__animated animate__backInRight"
                    label='Confirm Password'
                    value={state.confirmPassword}
                    placeholder='Enter Confirm Password'
                    onChange={onChangeField}
                />
                {state.errors.errorConfirmPassword && <span className="error" style={{ marginTop: -10, marginBottom: "1rem" }}>{t(state.errors.errorConfirmPassword)}</span>}

                <div className={styles.center}>
                    <Button loading={loading} content="Reset Password" size='big' className={cx([styles.buttonStyle], 'animate__animated animate__backInLeft')} onClick={resetPassword} />
                </div>
            </Form>
        </div>
    )
}
