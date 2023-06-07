import Validator from 'validator';
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { IValidateLogin, IValidateSignup, IValidateUpdateProfile, IValidateContact, IValidateTransferData, IIndex, IValidatePackageData, IInternationalStep1Validate, IInternationalStep2Validate, IInternationalStep3Validate } from './validator.types';


export const ValidateLogin = ({ email, password }: IValidateLogin) => {
    const status = {
        success: false,
        errorEmail: "",
        errorPassword: ""
    }

    if (Validator.isEmpty(email)) {
        status.errorEmail = "Must input Email"
        return status
    }
    if (!Validator.isEmail(email) && !Validator.isMobilePhone(email)) {
        status.errorEmail = "Must input valid email"
        return status
    }
    if (Validator.isEmpty(password)) {
        status.errorPassword = "Must input password"
        return status
    }

    status.success = true;
    return status;
}

export const ValidateSignup = ({ firstName, lastName, email, password, phone, selectedCountry, selectedCity, agreementCheckbox , captcha }: IValidateSignup) => {
    const status = {
        success: false,
        errorFirstName: '',
        errorLastName: '',
        errorPhone: "",
        errorEmail: '',
        errorPassword: '',
        errorSelectedCountry: '',
        errorSelectedCity: '',
        errorAgreementCheckbox: '',
        errorCaptcha : ""
    }

    if (Validator.isEmpty(firstName)) {
        status.errorFirstName = "Must input First Name"
        return status
    }
    if (Validator.isEmpty(lastName)) {
        status.errorLastName = "Must input Last Name"
        return status
    }

    if (Validator.isEmpty(email)) {
        status.errorEmail = "Must input Email"
        return status
    }
    if (!Validator.isEmail(email)) {
        status.errorEmail = "Must input valid email"
        return status
    }
    if (!isPossiblePhoneNumber('+' + phone?.toString().replace(/^0+/, ''))) {
        status.errorPhone = "Must input valid phone number"
        return status
    }
    if (Validator.isEmpty(password)) {
        status.errorPassword = "Must input password"
        return status
    }
    if (!Validator.isLength(password, { min: 8, max: 40 })) {
        status.errorPassword = "Password must be in a range of 8~40 characters."
        return status;
    }
    if (Object.keys(selectedCountry).length === 0) {
        status.errorSelectedCountry = "Must select residing country"
        return status;
    }
    if (Object.keys(selectedCity).length === 0) {
        status.errorSelectedCity = "Must select renting country"
        return status;
    }
    if (agreementCheckbox === false) {
        status.errorAgreementCheckbox = "Please check the Terms&Conditions"
        return status;
    }
    if (Validator.isEmpty(captcha)) {
        status.errorCaptcha = "Captcha error"
        return status
    }

    status.success = true;
    return status;
}



export const ValidateUpdateProfile = ({ firstName,lastName, email, phone, password }: IValidateUpdateProfile) => {
    const status = {
        success: false,
        errorFirstName: '',
        errorLastName:'',
        errorPhone: "",
        errorEmail: "",
        errorPassword: ""
    }
    if (Validator.isEmpty(firstName)) {
        status.errorFirstName = "Must Enter First Name"
        return status
    }
    if (Validator.isEmpty(lastName)) {
        status.errorLastName = "Must Enter Last Name"
        return status
    }
    if (Validator.isEmpty(email)) {
        status.errorEmail = "Must input Email"
        return status
    }
    if (!Validator.isEmail(email)) {
        status.errorEmail = "Must input valid email"
        return status
    }
    if (!Validator.isEmpty(password) && !Validator.isLength(password, { min: 6, max: 40 })) {
        status.errorPassword = "Password must be in a range of 6~40 characters."
        return status;
    }
    if (!isPossiblePhoneNumber('+' + phone?.toString().replace(/^0+/, ''))) {
        status.errorPhone = "Must input valid phone number"
        return status
    }


    status.success = true;
    return status;
}


export const validateEmail = (email: string) => {
    const status = {
        success: false,
        errorEmail: "",
    }

    if (Validator.isEmpty(email)) {
        status.errorEmail = "Must input Email"
        return status
    }
    if (!Validator.isEmail(email)) {
        status.errorEmail = "Must input valid email"
        return status
    }

    status.success = true;
    return status;
}

export const validatePhone = (phone: string) => {
    const status = {
        success: false,
        errorPhone: "",
    }

    if (!isPossiblePhoneNumber('+' + phone?.toString().replace(/^0+/, ''))) {
        status.errorPhone = "Must input valid phone number"
        return status
    }

    status.success = true;
    return status;
}

export const validateResetPassword = (password: string, confirmPassword: string) => {
    const status = {
        success: false,
        errorPassword: "",
        errorConfirmPassword: ""
    }

    if (Validator.isEmpty(password)) {
        status.errorPassword = "Please enter password."
        return status;
    }

    if (!Validator.isEmpty(password) && !Validator.isLength(password, { min: 6, max: 40 })) {
        status.errorPassword = "Password must be in a range of 6~40 characters."
        return status;
    }

    if (password !== confirmPassword) {
        status.errorConfirmPassword = "Password not matched."
        return status;
    }

    status.success = true;
    return status;
}


export const validateGarageStep1 = (data: {
    brand: { label: string, value: string },
    model: { label: string, value: string },
    trim: { label: string, value: string },
    year: { label: string, value: string },
    vehicleEmirates: { label: string, value: string },
    plateCategory: { label: string, value: string },
    plateCategoryCode: { label: string, value: string },
    plateNumber: string,
    quantity : string
}, vehicleImages: { name: string, key: string, value: File }[], icon:string, booking_type:string) => {
    const status = {
        success: false,
        vehicleEmirates: "",
        plateCategory: "",
        plateCategoryCode: "",
        plateNumber: "",
        year: "",
        brand: "",
        model: "",
        trim: "",
        images: "",
        quantity : ""
    }

    const showingPlates = ['car','bike'].includes(icon);
    

    if (vehicleImages.length < 2) {
        status.images = "Please Select atleast two image"
        return status;
    }
    else if (data.vehicleEmirates.value === "" && showingPlates) {
        status.vehicleEmirates = "Please Select Vehicle's Emirates"
        return status;
    } else if (data.plateCategory.value === "" && showingPlates) {
        status.plateCategory = "Please Select Plate Category"
        return status;
    } else if (data.plateCategoryCode.value === "" && showingPlates) {
        status.plateCategoryCode = "Please Select Plate Category Code"
        return status;
    } else if (Validator.isEmpty(data.plateNumber.toString()) && showingPlates) {
        status.plateNumber = "Please Select Plate Number"
        return status;
    } else if (data.year.label !== undefined && Validator.isEmpty(data.year?.value || "") && showingPlates) {
        status.year = "Please Select Year"
        return status;
    } else if (Validator.isEmpty(data.brand.value)) {
        status.brand = "Please Select Brand"
        return status;
    } else if ((Validator.isEmpty(data.model?.value || "") && ['limousine', 'boat', 'yacht'].includes(icon)) || ((Validator.isEmpty(data.model?.value || "") && booking_type === "DAILY"))) {
        status.model = "Please Select Model"
        return status;
    } else if ((Validator.isEmpty(data?.trim?.value || "") && ['limousine'].includes(icon)) || (Validator.isEmpty(data?.trim?.value || "") && booking_type === "DAILY")) {
        status.trim = "Please Select Trim"
        return status;
    }
    else if (Validator.isEmpty(data.quantity) || data.quantity === "0") {
        if(data.quantity == "0"){
            status.quantity = "0 Not Allowed"
        }
        else{
            status.quantity = "Please Select Quantity"
        }
        return status;
    } 
    status.success = true;
    return status;
}

// export const validateGarageStep1_TRANSFOR_PACKAGE = (data: {
//     brand: { label: string, value: string },
// }, vehicleImages: { name: string, key: string, value: File }[]) => {
//     const status = {
//         success: false,
//         brand: "",
//         images: ""
//     }
//     if (vehicleImages.length === 0) {
//         status.images = "Please Select atleast one image"
//         return status;
//     }
//     else if (Validator.isEmpty(data.brand.value)) {
//         status.brand = "Please Select Brand"
//         return status;
//     }
//     status.success = true;
//     return status;
// }



export const ValidateContactForm = ({ subject, fullName, email, phoneNumber, message, captcha }: IValidateContact) => {
    const status = {
        success: false,
        errorMessage: "",
        errorSubject: "",
        errorfullName: "",
        errorEmail: "",
        errorPhone: "",
        errorCaptcha: ""
    }

    if (Validator.isEmpty(subject)) {
        status.errorSubject = "Subject should not be empty"
        return status
    }
    if (Validator.isEmpty(fullName)) {
        status.errorfullName = "Please Enter your name"
        return status
    }
    if (Validator.isEmpty(email)) {
        status.errorEmail = "Email should not be empty"
        return status
    }
    if (!Validator.isEmail(email)) {
        status.errorEmail = "Must input valid email"
        return status
    }
    if (!isPossiblePhoneNumber('+' + phoneNumber?.toString().replace(/^0+/, ''))) {
        status.errorPhone = "Must input valid phone number"
        return status
    }
    if (Validator.isEmpty(message)) {
        status.errorMessage = "Must not be empty"
        return status
    }
    if (Validator.isEmpty(captcha)) {
        status.errorCaptcha = "Captcha error"
        return status
    }
    status.success = true;
    return status;
}


export const ValidateInternationalStep1 = ({
    delivery,
    residence_country,
    dl_country,
    shipment,
}: IInternationalStep1Validate) => {
    const status = {
        success: false,
        errorResidence_country: "",
        errorDl_country: "",
        errorShipment: {
            country: "",
            city: "",
            region: "",
            street: "",
            house: "",
            apartment: ""
        },
        // errorPkg: ""
    }

    if (Validator.isEmpty(residence_country.value)) {
        status.errorResidence_country = "Please select residence country"
        return status
    }
    if (Validator.isEmpty(dl_country.value)) {
        status.errorDl_country = "Please select driving license country"
        return status
    }
    if (delivery && Validator.isEmpty(shipment.country.value)) {
        status.errorShipment.country = "Please select shipment country"
        return status
    }
    if (delivery && Validator.isEmpty(shipment.city)) {
        status.errorShipment.city = "Please select shipment city"
        return status
    }
    if (delivery && Validator.isEmpty(shipment.region)) {
        status.errorShipment.region = "Please enter region"
        return status
    }
    if (delivery && Validator.isEmpty(shipment.street)) {
        status.errorShipment.street = "Please enter street"
        return status
    }
    if (delivery && Validator.isEmpty(shipment.house)) {
        status.errorShipment.house = "Please enter house no."
        return status
    }
    if (delivery && Validator.isEmpty(shipment.apartment)) {
        status.errorShipment.apartment = "Please enter apartment"
        return status
    }
    // if (delivery && Validator.isEmpty(pkg.name)) {
    //     status.errorPkg = "Please select package"
    //     return status
    // }

    status.success = true;
    return status;
}

export const ValidateInternationalStep2 = ({
    firstname,
    lastname,
    birth_city,
    birth_country,
    residence_address,
    driving_license_data,
}: IInternationalStep2Validate) => {
    const status = {
        success: false,
        error_name: "",
        error_lastname: "",
        error_birth_country: "",
        error_birth_city: "",
        error_residence_address: {
            city: "",
            country: "",
            // region: "",
            // street: "",
            // house: ""
        },
        error_driving_license_data: {
            year_obtain_dl: "",
            national_dl_no: "",
            dl_expire_data: ""
        },
    }

    if (Validator.isEmpty(firstname)) {
        status.error_name = "Please enter first name"
        return status
    }
    if (Validator.isEmpty(lastname)) {
        status.error_lastname = "Please enter last name"
        return status
    }
    if (Validator.isEmpty(birth_country.value)) {
        status.error_birth_country = "Please select birth country"
        return status
    }
    if (Validator.isEmpty(birth_city)) {
        status.error_birth_city = "Please select birth city"
        return status
    }

    if (Validator.isEmpty(residence_address.country.value)) {
        status.error_residence_address.country = "Please select residence country"
        return status
    }

    if (Validator.isEmpty(residence_address.city)) {
        status.error_residence_address.city = "Please select residence city"
        return status
    }

    // if (Validator.isEmpty(residence_address.region)) {
    //     status.error_residence_address.region = "Please enter region"
    //     return status
    // }

    // if (Validator.isEmpty(residence_address.street)) {
    //     status.error_residence_address.street = "Please enter street"
    //     return status
    // }

    // if (Validator.isEmpty(residence_address.house)) {
    //     status.error_residence_address.house = "Please enter house"
    //     return status
    // }

    if (Validator.isEmpty(driving_license_data.year_obtain_dl.label)) {
        status.error_driving_license_data.year_obtain_dl = "Please select year of obtain dl"
        return status
    }

    if (Validator.isEmpty(driving_license_data.national_dl_no)) {
        status.error_driving_license_data.national_dl_no = "Please enter national dl"
        return status
    }

    // if (Validator.isEmpty(driving_license_data.dl_expire_data)) {
    //     status.error_driving_license_data.dl_expire_data = "Please select dl expiry date"
    //     return status
    // }

    status.success = true;
    return status;
}

export const ValidateInternationalStep3 = ({
    preview1,
    preview2,
    preview3,
    preview4,
    signature
}: IInternationalStep3Validate) => {
    const status = {
        success: false,
        errorpreview1: "",
        errorpreview2: "",
        errorpreview3: "",
        errorpreview4: "",
        errorsignature: ""
    }

    if (Validator.isEmpty(preview1)) {
        status.errorpreview1 = "Please upload NDL photo"
        return status
    }
    if (Validator.isEmpty(preview2)) {
        status.errorpreview2 = "Please upload NDL Photo / back side"
        return status
    }
    if (Validator.isEmpty(preview3)) {
        status.errorpreview3 = "Please upload Passport photo"
        return status
    }
    if (Validator.isEmpty(preview4)) {
        status.errorpreview4 = "Please upload Applicant photo"
        return status
    }

    if (Validator.isEmpty(signature)) {
        status.errorpreview4 = "Please upload Signature"
        return status
    }


    status.success = true;
    return status;
}

export const validate_Transfer = (data: IValidateTransferData[]) => {
    let status = {
        success: false,
        index: [] as IIndex[],
    }

    

    
    if(data.length > 0){
        data.map((val:IValidateTransferData, key:number)=>{
            status.index.push({
                errorFrom: "",
                errorTo: "",
                errorPrice: "",
                index: 0,
                success:false
            });
            if(val.from.length===0){
                status['index'][key]['index'] = key;
                status['index'][key]['errorFrom'] = 'Please select areas';
            }

            if(val.to.length===0){
                status['index'][key]['index'] = key;
                status['index'][key]['errorTo'] = 'Please select areas';
            }

            // val.to.map((item:{cityId:string, areas:string[]})=>{
            //     if(item.areas.length===0){
            //         status['index'][key]['index'] = key;
            //         status['index'][key]['errorTo'] = 'Please select areas';
            //     }
            // })

            if(val.price <= 0){
                status['index'][key]['index'] = key;
                status['index'][key]['errorPrice'] = 'Please select valid price';
            }
        })
    }else{
        return { ...status, success: false};
    }

    if(status.index.length){
        for (let index__ = 0; index__ < status.index.length; index__++) {
            const element = status.index[index__];
            if(Validator.isEmpty(element.errorFrom) && Validator.isEmpty(element.errorTo) && Validator.isEmpty(element.errorPrice)){
                status.success=true;
                status['index'][index__]['success'] = true;

            }else{
                status.success=false;
                status['index'][index__]['success'] = false;

            }
        }
    }

    return { ...status, success: status.index.find((val) => val.success === false)?.success === false ? false : true };
}





export const validate_Package = (data: IValidatePackageData[]) => {
    let status = {
        success: false,
        index: [] as { name: string, price: string, child_price: string, index: number, success:boolean }[],
    }

    

    
    if (data.length > 0) {
        data.map((val: IValidatePackageData, key: number) => {
            status.index.push({
                name: "",
                price: "",
                child_price: "",
                index: 0,
                success: false
            });

            if (Validator.isEmpty(val.name)) {
                status['index'][key]['index'] = key;
                status['index'][key]['name'] = 'Please enter package name';
            }

            if (val.price === 0) {
                status['index'][key]['index'] = key;
                status['index'][key]['price'] = 'Please select valid price';
            }

            if (val.child_price === 0 && val.price_per_child) {
                status['index'][key]['index'] = key;
                status['index'][key]['child_price'] = 'Please select valid child price';
            }

        })
    } else {
        return { ...status, success: false};
    }

    if (status.index.length) {
        for (let index__ = 0; index__ < status.index.length; index__++) {
            const element = status.index[index__];
            if (Validator.isEmpty(element.name) && Validator.isEmpty(element.price) && Validator.isEmpty(element.child_price)) {
                status['index'][index__]['success'] = true;
                status.success = true
            } else {
                status.success = false;
                status['index'][index__]['success'] = false;
            }
        }
    }

    return { ...status, success: status.index.find((val) => val.success === false)?.success === false ? false : true };

}
