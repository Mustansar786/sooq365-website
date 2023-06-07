import { Base64 } from 'js-base64';
import {store} from 'store';
const newState =store.getState();
const {user:{user}}=newState
//can pass only single value maybe email, id, etc
export const LoginWebEngage=(data)=>{
    if(user.isAdmin)
    return
    return new Promise(async(resolve,reject)=>{
        try{
          window?.webengage?.user.login(data); 
          resolve(true)
        }catch(err){
            reject(err)
        }
    })
   
}

//user set attributes
export const UserCustomAttributesWebEngage=(label,data)=>{
    if(user.isAdmin)
    return
    return new Promise(async(resolve,reject)=>{
        try{
            window?.webengage?.user.setAttribute(label,data); 
          resolve(true)
        }catch(err){
            reject(err)
        }
    })
   
}

//user set attributes hashed
export const UserCustomAttributesWebEngageHash=(label,data)=>{
    if(user.isAdmin)
    return
    return new Promise(async(resolve,reject)=>{
        try{
            window?.webengage?.user.setAttribute(label,Base64.encode(data)); 
          resolve(true)
        }catch(err){
            reject(err)
        }
    })
   
}

//logout user
export const LogoutWebEngage=()=>{
    if(user.isAdmin)
    return
    return new Promise(async(resolve,reject)=>{
        try{
          window?.webengage?.user.logout(); 
          resolve(true)
        }catch(err){
            reject(err)
        }
    })
   
}
//registration
export const EventsWebEngage=(label,data)=>{ //label must be string and data must be object
    if(user.isAdmin)
    return
    return new Promise(async(resolve,reject)=>{
        try{
          window?.webengage?.track(label,data); 
          resolve(true)
        }catch(err){
            reject(err)
        }
    })
   
}
//variables
export const AllEvents={
    Signup:"Signup",
    Category:"Category",
    SearchVehicle:"Search Vehicle",
    Brand:"Brand",
    Model:"Model",
    HostSelected:"Host Selected",
    LanguageSelected:"Language Selected",
    VehicleSelected:"Vehicle Selected",
    BeginCheckout:"BeginCheckout",
    Checkout:"Checkout",
    Booked:"Booked",
    AddCard:"Add Card",
    TripViewed:"Trip Viewed",
    TransactionHistory:"Transaction History",
    InternationalLicense:"International License",
    Tell_a_Friend:"Tell a friend",
    Share:"Share",
    FavoritesViewed:"Favorite Viewed",
    DownloadApp :"Download app",
    ProfileUpdated:"Profile Updated",
    TopMenuClicked:"Top Menu Clicked",
    DownloadApp :'Download app',
    GroupSelected:"Group Selected",
    InstantBook:"Instant Book",
    Delivery:"Delivery",
    OptionSelect:"Option Select",
    VehicleRating:"Vehicle Rating",
    HostRating:"Host Rating",
    Trim:"Trim",
    Feature:"Feature",
    Availability:"Availability",
    residingInCountry:"ResidingIn Country",
    rentingInCountry:"RentingIn Country",
    rentingInCity:"RentingIn City",
    isTourist:"isTourist",
    isEmailVerified:"Is Email Verified",
    accountStatus:"Account Status",
    currentDocsStatus:"Current Doc Status",
    otherDocsStatus:"Other Doc Status",
    isVerified:"isVerified",
    isUserSuspended:"User Suspended",
    haveInternationalLicense:"Have International License",
    internationalLicenseStatus:"International License Status"
}
