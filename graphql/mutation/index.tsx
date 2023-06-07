import { gql } from '@apollo/client';


export const AUTH_FACEBOOK_LOGIN = gql`
      mutation authFaceBook($accessToken: String!,$fcm_token: String!){
            authFacebook(accessToken:$accessToken,fcm_token:$fcm_token){
                  token
                  user {
                        id
                        email
                        userType
                        nickname
                        phone
                        documents{
                              goverment
                              licens
                        }
                        nat_type
                        status
                        companyName
                        verified_phone
                        vehicle_limit
                        verifiedEmail
                        profile {
                              responseRate
                              approvedRate
                              losses
                              earning
                              spending
                              first_name
                              last_name
                              nat_no
                              gender
                              selfie_image
                              international_license
                              residing_in{
                                    name
                                    active
                                    verified
                                    countryId {
                                          id
                                          is_peer_enabled
                                          country_code
                                    }
                                    documents{
                                          expiry_date
                                          name
                                          code
                                          card_image
                                    }
                                    renting_in{
                                          cityId {
                                                id
                                                name
                                                country {
                                                      id
                                                      name
                                                      skey
                                                      serviceId
                                                }
                                          }
                                          name
                                    }
                              }
                              brithday
                              visa {
                                    id
                                    number
                                    expired_date
                              }
                              credits {
                                    id
                                    number
                                    name
                                    type
                                    expire_month
                                    expire_year
                              }
                        }
                  }
            }
      }
`;

export const AUTH_GOOGLE_LOGIN = gql`
mutation authGoogle($accessToken: String!,$fcm_token: String!){
  authGoogle(accessToken:$accessToken,fcm_token:$fcm_token){
    token
    user {
      id
      email
      nickname
      userType
      phone
      documents{
         goverment
          licens
      }
      nat_type
      status
      companyName
      verified_phone
      vehicle_limit
      verifiedEmail
      profile {
        responseRate
        approvedRate
        losses
        earning
        spending
        first_name
        last_name
        nat_no
        gender
        selfie_image
        brithday
        residing_in{
          name
          active
          verified
          countryId {
               id
               is_peer_enabled
               country_code
          }
          documents{
            expiry_date
            name
            code
            card_image
          }
          renting_in{
             cityId {
                id
                name
                country {
                 id
                 name
                 skey
                 serviceId
                }
             }
             name
          }
       }
        visa {
          id
          number
          expired_date
        }
        credits {
          id
          number
          name
          type
          expire_month
          expire_year
        }
      }
    }
  }
}
`;

export const CHANGE_NUMBER = gql`
mutation changeNumber($phone : String!){
      changeNumber(phone:$phone)
    }
`


export const CHANGE_PHONE_CONFIRM = gql`
mutation submitNewNumber($phone:String!,$code:String!,$token:String!){
  submitNewNumber(phone:$phone,code:$code,hash:$token)
}
`;
export const AUTH_LOGIN = gql`
      mutation ($email: String!, $password: String!, $fcmToken: String!) {
            login(email: $email, password: $password, fcm_token: $fcmToken) {
                  token
                  user {
                        id
                        userType
                        email
                        nickname
                        verifiedEmail
                        vehicle_limit
                        verified_phone
                        companyName
                        documents {
                              goverment
                              licens
                        }
                        phone
                        nat_type
                        status
                        profile {
                              responseRate
                              approvedRate
                              losses
                              earning
                              spending
                              first_name
                              last_name
                              nat_no
                              gender
                              brithday
                              selfie_image
                              international_license
                              residing_in {
                                    name
                                    active
                                    verified
                                    countryId {
                                          id
                                          is_peer_enabled
                                    }
                                    documents {
                                          expiry_date
                                          name
                                          code
                                          card_image
                                    }
                                    renting_in {
                                          cityId {
                                                id
                                                name
                                                country {
                                                      id
                                                      name
                                                      skey
                                                      serviceId
                                                }
                                          }
                                          name
                                    }
                              }
                              
                              visa {
                                    id
                                    number
                                    expired_date
                              }
                              credits {
                                    id
                                    number
                                    name
                                    type
                                    expire_month
                                    expire_year
                              }
                        }
                  }
            }
      }
      
`


export const LOCAL_SIMPLIFY_SIGNUP_MUTATION = gql`
      mutation localSimplifySignUp($data: UserSimplifySignUpInput) {
            localSimplifySignUp( data: $data){ 
            token
            user {
                  id 
                  email 
                  nickname 
                  verifiedEmail 
                  verified_phone
                  documents { 
                  goverment licens 
            }
            vehicle_limit
            phone  
            nat_type  
            status
            profile {
                  responseRate 
                  approvedRate 
                  international_license 
                  losses gender  
                  brithday  
                  earning 
                  spending
                  first_name  
                  last_name 
                  nat_no  
                  selfie_image
                  residing_in {
                        name
                        active
                        verified
                        documents{
                              expiry_date
                              name
                              code
                              card_image
                        }
                        countryId {
                              id
                              is_peer_enabled
                        }
                        renting_in{
                              cityId {
                                    id
                                    name
                                    country {
                                          id
                                          name
                                          skey
                                          serviceId
                                    }
                              }
                              name
                        }
                  }
                  visa {
                        id  
                        number 
                        expired_date
                  }
                  credits {
                        id   
                        number  
                        name  
                        type 
                        expire_month 
                        expire_year
                  }
                  international_license
            }
      }
}
} 
`;

export const LOGOUT = gql`
      mutation logout($fcm_token:String!) {
            logout( fcm_token: $fcm_token)
      }
`

export const RESEND_SMS = gql`
      mutation resendSMS($phone: String!,$resetType:ResetType! ) {
            resendSMS( phone: $phone, resetType:$resetType)
      }
`

export const VERIFY_OTP = gql`
      mutation confirmMobile($phone: String!,$code:String! ) {
            confirmMobile( phone: $phone, code:$code){
                  email
            }
      }
`


export const UPLOAD_DOCUMENTS = gql`
      mutation($files: [Upload], $documentData: [residingIn]) {uploadDocuments( data: {
            documentData: $documentData
            images: $files
      }){ id }}
`


export const VERIFY_EMAIL_MUTATION = gql`
      mutation{
            EmailVerificationFromBrowser
      }
`;



export const UPDATE_PROFILE = gql`
      mutation updateProfile($data:ProfileUpdateInput! ) {
            updateProfile( data : $data){
                  id
                  documents {
                        goverment
                        licens
                  }
                  profile {
                        residing_in{
                              name
                              active
                              verified
                              gcc_member
                              countryId {
                                    id
                                    is_peer_enabled
                                    country_code
                              }
                              documents{
                                    expiry_date
                                    name
                                    code
                                    card_image
                              }
                              renting_in{
                                    cityId {
                                          country{
                                                id
                                          }
                                          id
                                          name
                                    }
                                    name
                              }
                        }
                  }
            }
      }
`

export const UPDATE_SELFIE = gql`
      mutation updateProfile($selfie_image : Upload){
            updateProfile(data:{selfie_image : $selfie_image}){
                  profile{
                        selfie_image
                  }
            }
      }
`;


export const CHECK_DISCOUNT = gql`
      mutation checkDiscount($code : String!,$vehicleId:ID,$bookingDays:Int){
            checkDiscount(code:$code,vehicleId:$vehicleId,bookingDays:$bookingDays )
            {
                  code 
                  type 
                  amount 
                  minimum_price 
                  use_limit 
                  start_at 
                  expires_at
            }
      }
`


export const CHECKOUT = gql`
      mutation checkout($vehicle_id:ID!,$start_at:GraphQLDate!,$end_at:GraphQLDate!,$delivery_city:DeliveryCity, $discount_code:String, $previous_booking_id: ID, $insurance_cdw: insuranceCategory, $insurance_pai: insuranceCategory , $driver_charge :driverCharge,$booking_type:String,$packageObj:Object,$transferObj:Object, $collection_charge : Float, ,$currency:String,$tax_rate:Float!, $dropLocation :Object,$with_driver_charge : Float ){
            checkout(vehicle_id:$vehicle_id,start_at:$start_at,end_at:$end_at,delivery_city:$delivery_city, discount_code:$discount_code, previous_booking_id: $previous_booking_id, insurance_cdw: $insurance_cdw, insurance_pai: $insurance_pai ,driver_charge:$driver_charge,booking_type:$booking_type,packageObj:$packageObj,transferObj:$transferObj,collection_charge: $collection_charge,,currency:$currency,tax_rate:$tax_rate,dropLocation:$dropLocation ,with_driver_charge : $with_driver_charge )
            {
                  billing_id
                  payment_service
                  currency
                  stripe_intent{
                        paymentIntent
                        ephemeralKey
                        customer
                  }
            }
      }
`
export const CHECKOUT_GLOBAL = gql`
      mutation checkout_global($start_at:GraphQLDate!,$end_at:GraphQLDate!, $vehicle_data:thirdPartyVehicleData!, $insurance_cdw: insuranceCategory, $insurance_pai: insuranceCategory ,$tax_rate:Float! ){
        checkout_global(start_at:$start_at,end_at:$end_at,vehicle_data:$vehicle_data,insurance_cdw: $insurance_cdw, insurance_pai: $insurance_pai ,tax_rate:$tax_rate)
            {
                  billing_id
                  payment_service
                  currency
                  stripe_intent{
                        paymentIntent
                        ephemeralKey
                        customer
                  }
                  commission
                  commission_with_vat
                  commission_percentage
            }
      }
`

export const CHECKOUT_IDA = gql`
      mutation checkoutIDA($package_price: Int){
            checkoutIDA(package_price:$package_price)
      }
`


export const CANCEL_BOOKIN_WITH_REASON_RENTER = gql`
      mutation renterCancelBooking($booking_id:ID!, $canceled_reason_id: ID!, $cancel_Description:String){ 
      renterCancelBooking( booking_id:$booking_id canceled_reason_id:$canceled_reason_id cancel_Description:$cancel_Description)
}
`


export const CANCEL_OR_ACCEPT_BOOKING_WITH_REASON_HOST = gql`
      mutation requestConfirm($booking_id:ID!,$confirm:Boolean!, $reject_reason_id: ID!, $reject_Description:String){ 
      requestConfirm(booking_id:$booking_id confirm:$confirm reject_reason_id:$reject_reason_id, reject_Description:$reject_Description)
}
`

export const UPDATE_DELIVERY_STATUS = gql`
      mutation updateBookingDeliveryStatus($booking_id: String!, $delivery_status: String!, $force_collect_reason: String){
      updateBookingDeliveryStatus(booking_id: $booking_id, delivery_status: $delivery_status, force_collect_reason: $force_collect_reason)
}
`

export const HOST_CANCEL_BOOKING = gql`

    mutation cancel($booking_id:ID!, $cancel_reason_id:ID!,$cancel_Description:String){
  hostCancelBooking(
    booking_id:$booking_id,
    canceled_reason_id:$cancel_reason_id
    cancel_Description:$cancel_Description
  )
}
`


export const RESET_PASSWORD_BY_SMS = gql`
      mutation($phone: String!){
            restPassword(phone: $phone)
      }
`;


export const RESET_PASSWORD_BY_EMAIL = gql`
      mutation($email: String!){
            restPasswordByEmail(email: $email)
      }
`;

export const VERIFICATION_CODE = gql`
      mutation submitRestPassword($phone: String, $code: String!,$email: String) {
            submitRestPassword(phone: $phone, code: $code ,email: $email)
      }
`;

export const CHANGE_PASSWORD = gql`
      mutation ($phone: String, $code: String!,$email: String, $password:String!) 
      {
            changePassword(phone:$phone, code:$code, password:$password,email:$email)
            { 
            email,
            id
      }
}
`;

export const ADD_FAVOURITE = gql`
      mutation favorite($vehicle : ID!){
            favorite(vehicle : $vehicle)
      }
`;

export const NEW_MESSAGE_QL = gql`
  mutation newMessage($body : String,$image:Upload,$recipientId :ID!, $bookingId :ID, $vehicleId :ID)
  {
    newMessage( recipient_id:$recipientId, body:$body,image:$image, booking_id:$bookingId, vehicle_id:$vehicleId){
            createdAt,text,user{_id,name},isAdmin,conversation,type,image
    }
     
  }`;

export const CLEAR_CHAT = gql`
 mutation hideConversation($id :ID!,$hide_type : String)
  {
      hideConversation(id :$id,hide_type:$hide_type){
            id,
            hide_conversation
      }
  }`;


export const SetDefaultCreditCard = gql`
  mutation setCredit($id: ID!) {
    setCredit(credit: $id)
  }
`;  

export const WriteReview = gql`
  mutation createReview($data: ReviewCreateInput!){ 
    createReview(data: $data) { 
      id 
    }
  }
`;

export const UpdateReview = gql`
  mutation updateReview($data: ReviewUpdateInput!, $whereId: ID!){ 
    updateReview(data: $data, whereId: $whereId) { 
      id 
    }
  }
`;

export const UPLOAD_VEHICLE_STEP1 = gql`
      mutation createVehicleStep1(
      $vehicleRegDocFront: Upload
      $vehicleRegDocBack: Upload
      $files: [Upload!]!
      $thumb: Upload!
      $emirates: String!
      $brand: ID!
      $model: ID!
      $attributes: JSON!
      $category: ID!
      $booking_type: String
      $plate: PlateInput!
      $trim: ID!
      $youTubeUrl : String
      $other_types:Package_Transfer_Types
      $qty:String
      $currency:String
      ) {
            createVehicleStep1(
            data: {
                  emirates: $emirates
                  brand: $brand
                  model: $model
                  attributes: $attributes
                  category: $category
                  booking_type: $booking_type
                  images: $files
                  thumb: $thumb
                  plate: $plate
                  trim: $trim
                  other_types:$other_types
                  vehicleRegDocFront:$vehicleRegDocFront
                  vehicleRegDocBack:$vehicleRegDocBack
                  qty:$qty
                  currency:$currency
                  youTubeUrl : $youTubeUrl
            }
            ) {
                  vehicle {
                        id
                        document_status
                  }
                  billing_id
            }
      }
`

export const UPDATE_VEHICLE_STEP1=gql`
mutation updateVehicleStep1(
  $vehicleRegDocFront: Upload
  $vehicleRegDocBack: Upload
  $files: [Upload]
  $thumb: Upload
  $emirates: String
  $category: ID
  $brand: ID
  $model: ID
  $plate: PlateInput
  $trim: ID
  $attributes: JSON
  $whereId: ID!
  $deleteImage: [ID]
  $oldThumb: String
  $newThumb: String
  $oldImages: [String]
  $qty:String
  $currency:String
  $youTubeUrl : String
  $other_types:Package_Transfer_Types
) {
  updateVehicleStep1(
    data: {
      vehicleRegDocFront:$vehicleRegDocFront
      vehicleRegDocBack:$vehicleRegDocBack
      deleteImage: $deleteImage
      emirates: $emirates
      category: $category
      attributes: $attributes
      brand: $brand
      model: $model
      images: $files
      thumb: $thumb
      plate: $plate
      trim: $trim,
      qty:$qty
      currency:$currency
      youTubeUrl : $youTubeUrl
      other_types:$other_types
    }
    whereId: $whereId
    oldThumb: $oldThumb
    newThumb: $newThumb
    oldImages: $oldImages
  ) {
    vehicle {
      id
    }
    billing_id
  }
}
`

export const UPDATE_VEHICLE_STEP2=gql`
mutation updateVehicleStep2(
  $always_availble: Boolean
  $instance_booking: Boolean
  $availble_dates: [dateRangeInput]
  $working_hours: Boolean
  $sun_thurs_start: String
  $sun_thurs_end: String
  $friday: Boolean
  $friday_start: String
  $friday_end: String
  $saturday: Boolean
  $saturday_start: String
  $saturday_end: String
  $public_holiday: Boolean
  $public_holiday_start: String
  $public_holiday_end: String
  $whereId:ID!
) {
  updateVehicleStep2(
    data: {
      always_availble: $always_availble
      instance_booking: $instance_booking
      availble_dates: $availble_dates
      working_hours: $working_hours
      sun_thurs_start: $sun_thurs_start
      sun_thurs_end: $sun_thurs_end
      friday: $friday
      friday_start: $friday_start
      friday_end: $friday_end
      saturday: $saturday
      saturday_start: $saturday_start
      saturday_end: $saturday_end
      public_holiday: $public_holiday
      public_holiday_start: $public_holiday_start
      public_holiday_end: $public_holiday_end
    }
    whereId: $whereId
  ) {
    vehicle {
      id
    }
    billing_id
  }
}
`

export const UPDATE_VEHICLE_STEP3=gql`
mutation updateVehicleStep3(
  $pickup_location:[ID]
  $whereId:ID!
) {
updateVehicleStep3(
    data: {
      pickup_location: $pickup_location
    }
    whereId: $whereId
  ) {
    vehicle {
      id
    }
    billing_id
  }
}
`

export const UPDATE_VEHICLE_STEP4=gql`
mutation updateVehicleStep4(
    $price: String
    $kilometer_limit: Boolean
    $kilometer_limit_data: kilometerLimitData
    $delivery_available: Boolean
    $cities_available: [citiesAvailable]
    $duration_discount: [durationDiscount]
    $minimumDuration: Int
    $minimum_duration_available: Boolean
    $insurance_category_cdw: insuranceSelected
    $insurance_category_pai: insuranceSelected
    $whereId:ID!
    $transfer_package:transfer_package
    $is_with_driver:Boolean

) {
      updateVehicleStep4(
      data: {
            price: $price
            kilometer_limit: $kilometer_limit
            kilometer_limit_data: $kilometer_limit_data
            delivery_available: $delivery_available
            cities_available: $cities_available
            duration_discount: $duration_discount
            minimumDuration: $minimumDuration
            minimum_duration_available: $minimum_duration_available
            insurance_category_cdw: $insurance_category_cdw
            insurance_category_pai: $insurance_category_pai
            transfer_package: $transfer_package
            is_with_driver : $is_with_driver
      }
      whereId: $whereId
      ) {
      vehicle {
            id
      }
      billing_id
      }
}
`


export const UPDATE_VEHICLE_STEP5=gql`
mutation updateVehicleStep5(
  $attributes:JSON
  $whereId:ID!

) {
updateVehicleStep5(
    data: {
      attributes: $attributes
    }
    whereId: $whereId
  ) {
    vehicle {
      id
    }
    billing_id
  }
}
`

export const UPDATE_VEHICLE_STEP6=gql`
mutation updateVehicleStep6(
  $status:VehicleStatus!
  $whereId:ID!

) {
updateVehicleStep6(
    data: {
      status: $status
    }
    whereId: $whereId
  ) {
    vehicle {
      id
      document_status
    }
    billing_id
  }
}
`

export const UPDATE_VEHICLE_DOCS_STEP = gql`
      mutation(
            $files: [Upload],
            $documentData: [_vehicleDoc]
            $whereId:ID!
      ){
         uploadVehicleDocuments( 
             data: {
                documentData: $documentData
                images: $files
             }
             whereId: $whereId
      )
      {
         vehicle {
            id
         }
         billing_id
       }
}`

export const DELETE_VEHICLE=gql`
      mutation deleteHostVehicle(
      $verify_status:VerifyStatus!
      $userType:String!
      $vehicleId: ID!

      ) {
      deleteHostVehicle(
            verify_status: $verify_status
            userType: $userType
            vehicleId: $vehicleId
      )
      }
`



export const SetIsVATInsurance = gql`
      mutation updateIsVATInsurance($isVATInsurance: Boolean) {
            updateIsVATInsurance(isVATInsurance: $isVATInsurance)
      }
`;

export const REPORT_VEHICLE = gql`
      mutation reportVehicle($whereId: ID!,$message: String){
            reportVehicle(whereId: $whereId, message: $message)
      }
`;

export const GET_WHATSAPP_NUMBER = gql`
      mutation whatsappClicks($category_id:ID!){
            whatsappClicks(category_id :$category_id){
                  whatsapp {
                        number  
                        click_count
                        active_index
                  }
            }
      }
`

export const AddNewInsurance = gql`
      mutation create_insurance($data: [insuranceBody]){
            create_insurance(data : $data){
                  name
            }
      }
`;

export const UpdateInsurance = gql`
      mutation update_insurance($data: [insuranceBody],$newInsurance: [insuranceBody]){
            update_insurance(data : $data, newInsurance: $newInsurance){
                  name
            }
      }
`;

export const AddDriver = gql` 
      mutation add_driver($has_driver:Boolean , $driver_charge :Float , $not_accepted_nationality:[ID],$accepted_driver_license_age:Int,$accepted_age_limit:Int,  $has_free_delivery : Boolean , $free_delivery : [freeDeliveryData],$with_driver_charge : Float,$with_driver :Boolean ){
            add_driver(has_driver:$has_driver , driver_charge : $driver_charge,not_accepted_nationality:$not_accepted_nationality,accepted_driver_license_age:$accepted_driver_license_age,accepted_age_limit:$accepted_age_limit,has_free_delivery : $has_free_delivery , free_delivery : $free_delivery,with_driver_charge:$with_driver_charge ,with_driver : $with_driver ) {
                  has_driver
                  driver_charge
            }  
      }
`;


export const CONFIEM_BOOKING_WITHOUT_PAYMENT = gql`
      mutation confirmBookingWithoutPayment($billing_id: ID!,$token: String!, $cryptoData: cryptoInput){
            confirmBookingWithoutPayment(billing_id : $billing_id, token: $token, cryptoData: $cryptoData){
                  billing_id
                  host_name
                  instance_booking
            }
      }
`;

export const CONFIEM_BOOKING_WITHOUT_PAYMENT_EUROPCAR = gql`
       mutation confirmBooking_global($billing_id: ID!,$token: String!, $cryptoData: cryptoInput){
            confirmBooking_global(billing_id : $billing_id, token: $token, cryptoData: $cryptoData){
                  billing_id
                  host_name
                  instance_booking
            }
                           
      }`

export const IDA_PAYMENT = gql`
      mutation IDA_Payment($billing_id: ID!,$token: String!){
            IDA_Payment(billing_id : $billing_id, token: $token){
                  billing_id
                  host_name
                  instance_booking
            }
      }
`;


export const UPDATE_WORKING_HOURS = gql`
      mutation updateworkingHours($data: updateworkingHours!){
            updateworkingHours(data : $data){
                  week_working_hours{
                        day_name
                        start
                        end
                        holiday
                  }
                  custom_working_hours{
                        day_name
                        date
                        start
                        end
                        holiday
                  }
                  working_24
            }
      }
`;

export const TRIPS = gql`
      mutation trips($filter: String, $limit:Int, $skip:Int){
            trips(filter : $filter, limit : $limit, skip : $skip){
                  booking_type
                  trip_completed
                  refund_status
                  delivery_reason
                  delivery_status
                  vehicle_data
                  reject_Description
                  reject_reason{text}
                  cancel_Description canceled_reason{text}
                   package
                   transfer
                        status 
                        reference_number 
                        previous_booking
                        renter {
                              id
                              phone
                              profile {
                                first_name,
                                last_name,
                                selfie_image
                              }
                        }
                        vehicle
                        {
                              price
                              status
                              transfer_package{
                                    id
                                    type
                                    package{
                                      id
                                      name
                                      price
                                      description
                                      price_per_person
                                      price_per_child
                                      child_price
                                      active
                                      start
                                      ending
                                      working_hours
                                    }
                                    transfer{
                                      from{
                                        cityId {
                                          _id
                                          name
                                        }
                                        areas{
                                          _id
                                          name
                                        }
                                      }
                                      to{
                                        cityId {
                                          _id
                                          name
                                        }
                                        areas{
                                          _id
                                          name
                                        }
                                      }
                                      price
                                      active
                                    }
                                  }
                          id 
                          attributes 
                          booking_type
                          thumb 
                          host_rate_avg 
                          reviews {
                              id
                              vehicle_rate
                              vehicle_review
                              host_rate
                              host_review
                              user {
                              id
                              profile {
                                    first_name
                                    last_name
                                    selfie_image
                              }
                              }
                         }
                          brand:brandNew {
                                 name
                              }
                          model:modelNew {
                                 name
                              }
                          trim :trimNew{
                              name
                              }
                            attributes
                            thumb
                          rate_avg 
                          owner
                          {
                              adminId{
                                 profile{
                                    companyName
                                 }
                              }    
                            id 
                            rate_avg 
                            phone 
                            show_phone
                            profile
                            {
                              first_name 
                              last_name 
                              selfie_image
                            }
                          }
                        }
                        billing
                        {
                          currency
                          final_amount
                          id
                          driver_charge {
                              amount
                              tax
                              finalAmount
                          }
                          with_driver_charge
                          insurance_cdw {
                              name
                              amount
                              tax
                              finalAmount
                          }
                          insurance_pai {
                              amount
                              name
                              tax
                              finalAmount
                          }
                        }
                          id 
                          start_at 
                          end_at 
                          currentTime 
                          vehicle
                          {
                          
                          images
                          {
                            imageUrl
                          }
                        }
                  }
      }  
`
//host profile Add locations
export const ADD_LOCATIONS = gql`
      mutation addLocations($data: UpdateLocations!){
            addLocations(data : $data){
                  locations{
                        id
                        cityName
                         cityID
                          areaName
                           areaID
                           address
                           mapCoordinates
                           delivery_options{
                              id
                              cityName
                               cityID
                                areaName
                                 areaID
                                 charge
                                 collectionCharge
                                 isTwoDelivery
                        }
                  }
            }
      }
`;

export const DELETE_LOCATION = gql`
      mutation deleteLocations($id: ID!){
            deleteLocations(id : $id){
                  locations{
                        id
                        cityName
                         cityID
                          areaName
                           areaID
                           address
                           mapCoordinates
                           delivery_options{
                              id
                              cityName
                               cityID
                                areaName
                                 areaID
                                 charge
                                 collectionCharge
                                 isTwoDelivery
                        }
                  }
            }
      }
`;

//host profile updated locations
export const UPDATE_LOCATIONS = gql`
      mutation updateLocations($data: UpdateLocations!,$id: ID){
            updateLocations(data : $data,id:$id){
                  locations{
                        id
                        cityName
                         cityID
                          areaName
                           areaID
                           address
                           mapCoordinates
                           delivery_options{
                              id
                              cityName
                               cityID
                                areaName
                                 areaID
                                 charge
                                 collectionCharge
                                 isTwoDelivery
                        }
                  }
            }
      }
`;

//host profile update delivery locations
export const UPDATE_DELIVERY_LOCATIONS = gql`
      mutation updateDeliveryLocations($data: UpdateDeliveryLocations!){
            updateDeliveryLocations(data : $data){
                  locations{
                        id
                        cityName
                         cityID
                          areaName
                           areaID
                           address
                           mapCoordinates
                           delivery_options{
                              id
                              cityName
                               cityID
                                areaName
                                 areaID
                                 charge
                                 collectionCharge
                                 isTwoDelivery
                        }
                  }
                 
            }
      }
`;
export const SET_FULLY_BOOKED = gql`mutation changeVehicleAvailability($host_vehicle_available : Boolean!){
      changeVehicleAvailability(host_vehicle_available : $host_vehicle_available)
}`


export const IDA_STEP1 = gql`
      mutation IDA_step1($data: IDA_input_1){
            IDA_step1(data : $data)
      }
`;

export const IDA_STEP2 = gql`
      mutation IDA_step2($data: IDA_input_2){
            IDA_step2(data : $data)
      }
`;

export const IDA_STEP3 = gql`
      mutation IDA_step3($data: IDA_input_3){
            IDA_step3(data : $data)
      }
`;
export const UPDATECOUNTERSEEN = gql`mutation updateCounterSeen ($data : [ID!]!){
      updateCounterSeen(data:$data)
}
`

export const UPDATENOTIFICATIONSEEN = gql`mutation updateNotificationSeen ($id : ID!){
      updateNotificationSeen(id : $id)
}
`


export const ADMIN_LOGIN = gql`
      mutation adminLoginUserAccount($token:String!){
            adminLoginUserAccount(token : $token){
                  token
                  user {
                        admin_id
                        allowRoutes
                        id
                        userType
                        email
                        nickname
                        verifiedEmail
                        vehicle_limit
                        verified_phone
                        companyName
                        documents {
                              goverment
                              licens
                        }
                        phone
                        nat_type
                        status
                        profile {
                              responseRate
                              approvedRate
                              losses
                              earning
                              spending
                              first_name
                              last_name
                              nat_no
                              gender
                              brithday
                              selfie_image
                              international_license
                              residing_in {
                                    name
                                    active
                                    verified
                                    countryId {
                                          id
                                          is_peer_enabled
                                    }
                                    documents {
                                          expiry_date
                                          name
                                          code
                                          card_image
                                    }
                                    renting_in {
                                          cityId {
                                                id
                                                name
                                                country {
                                                      id
                                                      name
                                                      skey
                                                      serviceId
                                                }
                                          }
                                          name
                                    }
                              }
                              
                              visa {
                                    id
                                    number
                                    expired_date
                              }
                              credits {
                                    id
                                    number
                                    name
                                    type
                                    expire_month
                                    expire_year
                              }
                        }
                  }
            }
      }
`
