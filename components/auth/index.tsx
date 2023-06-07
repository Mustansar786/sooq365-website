import React from 'react'
import Register from './Register';
import Login from './Login';
import { useTranslation } from 'react-i18next';

export interface IAuth {
    openModal: (body: any) => void
}
export default function Auth({ openModal }: IAuth) {
    const { t } = useTranslation();
    
    const closeAuthModal = () => {
        openModal(false)
    }

    return (
        <div id="auth" style={{ direction: "ltr" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {/* <h2>Urent</h2> */}
                <div className="close-icon-auth" onClick={closeAuthModal}></div>

                <div className={'container'} id="auth-container">
                    <Login closeAuthModal={closeAuthModal} />
                    <Register closeAuthModal={closeAuthModal} />

                    <div className={'overlay-container'}>
                        <div className={'overlay'}>
                            <div className={`${'overlay-panel'} ${'overlay-left'}`}>
                                <div className="left-overly-wrapper">
                                    <h1 style={{fontWeight: 100}}>
                                        <div>{t("Hello, Friend!")}</div>
                                        <div>{t("It is time for U to Rent!")}</div>
                                    </h1>
                                    <p style={{ textAlign: "left" }}>{t("Start off by entering your personal details.")}</p>
                                    {/* <p style={{ textAlign: "left" }}>{t("Already registered?")} {" "}
                                        <span id="signIn" onClick={loginClick} style={{ fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>{t("Sign In")}</span>
                                    </p> */}
                                </div>
                            </div>
                            <div className={`${'overlay-panel'} ${'overlay-right'}`}>
                                <div className="right-overly-wrapper">
                                    <h1 style={{fontWeight: 100}}>
                                        <div>
                                            {t("Welcome Back!")}
                                        </div>
                                        <div>
                                            {t("It is time for U to Rent!")}
                                        </div>
                                    </h1>
                                    <p style={{ textAlign: "left" }}>{t("To keep connected with us please login with your personal info")}</p>
                                    {/* <p style={{ textAlign: "left" }}>{t("Not registered?")} {" "}
                                        <span id="signUp" onClick={signUpClick} style={{ fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>{t("Sign me up!")}</span>
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}