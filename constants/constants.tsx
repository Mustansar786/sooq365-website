export const ImagePrefix = process.env.REACT_APP_API_ASSETS_URL + '/';
export const BaseUrl = process.env.BaseUrl;
export const REGEX_SOCIAL_MEDIA = /instagram|LinkedIn|FBAN|FBAV/i;

let speedSize_params = {
	isEnabled : false,
	client_id : '',
	client_url: '' 
}

export const configSettings = {

    vat: 0.00, // value is devided by 100
    email: 'support@urent.com',
    phoneNo: '+97145704555',
    phoneNoDisplay: '+971 4 570 4555',
    phoneNo2: '+97145802766',
    phoneNoDisplay2: '+971 4 580 2766',
    appleStoreUrl: 'https://apps.apple.com/us/app/urent/id1492748796',
    googlePlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.urent.urentapp',
    mapAPIUrl: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
    googleAPIKey: 'AIzaSyCwqXe7pVm0S2Yw2b38wmtr80i90d1q4i8',
    whatsappNumber : "971523158893",
    leasingMonthlyPercentage:3
}

export const display_image = (image_link:any,params:any='f_auto') => {
    const CLIENT_ID:any = speedSize_params.client_id
    const URL:any       = speedSize_params.client_url
    const isEnabled     = speedSize_params.isEnabled
    let link            = '';
    if(isEnabled){
        link            = URL + CLIENT_ID+'/'+image_link+'/'+params;
    }
    else{
        link            = image_link 
    }
    return link
}

export const setSpeedSizeEnabled = (val:any) => {
	speedSize_params.isEnabled = val.isenabled
	speedSize_params.client_id = val.client_id
	speedSize_params.client_url= val.client_url
}

export const checkDepositValue = (price:any) => {
    console.log("Passed Price is ",price)
	if(price >= 0 && price <= 210) return 1500
	if(price > 210 && price <= 1000) return 3500
	if(price > 1000) return 5000
	else return price
}