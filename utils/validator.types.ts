// --------------LOGIN ----------------
export type IValidateLogin = {
    email: string,
    password: string
}
export type IValidateLoginReturn = {
    success: boolean,
    errorEmail: string,
    errorPassword: string,
}
// --------------END LOGIN ----------------

// --------------SIGN UP ----------------
export type IValidateSignup = {
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    agreementCheckbox: boolean,
    selectedCountry: any
    selectedCity: any
    captcha : any
}
export type IValidateSignupReturn = {
    success: boolean,
    errorFirstName: string,
    errorLastName: string,
    errorEmail: string,
    errorPassword: string,
    errorAgreementCheckbox: string,
    errorSelectedCountry: string
    errorSelectedCity: string,
    errorPhone: string
    errorCaptcha : string
}
// --------------END SIGN UP ----------------



// --------------UPDATE PROFILE----------------
export type IValidateUpdateProfile = {
    firstName :string,
    lastName :string,
    phone: string,
    email: string,
    password: string
}

export type IValidateUpdateProfileReturn = {
    success: boolean,
    errorFirstName : string ,
    errorLastName :string,
    errorPhone: string,
    errorEmail: string,
    errorPassword: string
}

// --------------END UPDATE PROFILE----------------


// --------------FORGOT PASSWORD----------------
export type IValidateEmail = {
    success: boolean,
    errorEmail: string,
}

export type IValidatePhone = {
    success: boolean,
    errorPhone: string,
}

// --------------END FORGOT PASSWORD----------------



// --------------RESET PASSWORD----------------
export type IValidateResetPassword = {
    success: boolean,
    errorPassword: string,
    errorConfirmPassword: string,
}

// --------------END RESET PASSWORD----------------



// --------------GARAGE STEP1----------------
export type IValidateGarageStep1= {
    success: boolean,
    brand: string,
    model: string,
    trim: string,
    year: string,
    vehicleEmirates: string,
    plateCategory: string,
    plateCategoryCode: string,
    images:string
}

// --------------END GARAGE STEP1----------------



//---------------CONTACT FORM----------------------
export type IValidateContact = { 
    subject: string, 
    fullName: string,
    email: string,
    phoneNumber:string,
    message: string,
    captcha : string
}
export type IValidateContactReturn = {
    success: boolean,
    errorSubject: string,
    errorfullName: string,
    errorEmail: string,
    errorPhone: string,
    errorMessage: string,
    errorCaptcha : string
}
//---------------END CONTACT FORM----------------------


//---------------International Step1 FORM----------------------
export type IInternationalStep1Validate = {
    delivery: boolean,
    residence_country: { label: string, value: string },
    dl_country: { label: string, value: string },
    shipment: {
        country: { label: string, value: string },
        city: string,
        region: string,
        street: string,
        house: string,
        apartment: string,
    }
}
export type IInternationalStep1ValidateReturn = {
    success: boolean,
    errorResidence_country: string,
    errorDl_country: string,
    errorShipment: {
        country: string
        city: string
        region: string
        street: string
        house: string
        apartment: string
    },
    errorPkg: string
}
//---------------END International Step1 FORM----------------------

//---------------International Step2 FORM----------------------
export type IInternationalStep2Validate = {
    firstname: string
    lastname: string
    birth_city: string,
    birth_country: { label: string, value: string },
    residence_address: {
        city: string,
        country: { label: string, value: string },
        // region: string
        // street: string
        // house: string
    },
    driving_license_data: {
        year_obtain_dl: {label:string, value:string},
        national_dl_no: string,
        dl_expire_data: any
    },
}

export type IInternationalStep2ValidateReturn = {
    success: boolean,
    errorName: string,
    errorLastName: string,
    errorBirthCity: string,
    error_residence_address: {
        city: string,
        country: string,
        region: string
        street: string
        house: string
    },
    error_driving_license_data: {
        national_dl: string
    },
}
//---------------END International Step2 FORM----------------------


//---------------International Step3 FORM----------------------
export type IInternationalStep3Validate = {
    preview1: string,
    preview2: string,
    preview3: string,
    preview4: string,
    signature:string
}

export type IInternationalStep3ValidateReturn = {
    success: boolean,
    errorpreview1: string,
    errorpreview2: string,
    errorpreview3: string,
    errorpreview4: string,
    errorsignature:string
}
//---------------END International Step3 FORM----------------------


//---------------Transfer----------------------
export type IIndex ={
    errorFrom: string,
    errorTo: string,
    errorPrice: string,
    index: number
    success:boolean
}


type FROM_TO  ={
    cityId: string,
    areas: string[]
}

export interface IValidateTransferData {
    from: FROM_TO[] | [],
    to: FROM_TO[] | [],
    price: number,
    active: boolean,
}

//---------------END Transfer----------------------


//---------------Package----------------------


export interface IValidatePackageData {
    name:string,
    price: number,
    price_per_child: boolean,
    child_price: number,
}

//---------------END Package----------------------

