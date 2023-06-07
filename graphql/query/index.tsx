import { gql } from '@apollo/client';


export const GET_CONTACTS = gql`
  query languages {
    languages {
      id
    }
  }
`;

export const GET_RESIDING_COUNTRIES_QUERY = gql`
  query countries($where: CountryWhereInput,$orderBy:CountryOrderByInput) {
    countries (where:$where,orderBy:$orderBy) {
      id 
      name
      code 
      skipOtp 
      shortCode 
      country_code
      is_vat_enabled
      vat_details {
        value
        vat_type_label
      }
      currency
      currency_symbol

    }
  }
`;

export const TOP_REVIEWS = gql`
query ($skip: Int, $limit:Int, $show_all: Boolean, $first_name_contains: String){
  topReviews( skip:$skip, limit: $limit, show_all: $show_all, first_name_contains: $first_name_contains) { 
    host_rate
    host_review
    createdAt
    trip_count
    userReview {
      profile {
        first_name
      }
    }
    user {
      id
      rate_count
      profile {
        first_name
      }
    }
    vehicle {
      owner {
        trips_approved_count
        profile {
          first_name
          last_name
          selfie_image
        }
      }
    }
    
  } 
}
`

export const MOST_SEARCHED = gql`
query ($limit:Int,$cityID:ID){
  mostSearchedCars(limit: $limit,cityID:$cityID) { 
    promotions  
    transfer_package{
        id
        type
        package{
          name
          price
          description
          price_per_child
          price_per_person
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
      trim {name}
      attributes
      brand {   name  }
      model {name }
      price
      thumb
      instance_booking
      images{ imageUrl }
      location{ coordinates}
      owner {
          id
          rate_avg
          rate_count
          profile {
              first_name
              last_name
              selfie_image
          }
      }
      category{
      id
       }
      rate_avg
      host_rate_avg
      host_rate_avg
      booking_type
      duration_discount{
          duration 
          price
      }
      duration_discount1{
        duration 
        price
      }
    }
}
`

export const GET_RESIDING_COUNTRY_QUERY = (whatYouWant: any, id: any) => gql`
  query {
    country(id:${id}) {
      ${whatYouWant}
    }
  }
`;


export const FULLYBOOKED = gql`
query getVehicleAvailability($user:ID!){ getVehicleAvailability(user:$user){host_vehicle_available}}`


export const GET_CITIES_QUERY = gql`
  query ($where:CityWhereInput) { 
    cities(where:$where){
      id 
      name 
      code 
      country 
        { 
          id 
          name
          country_code
        }
    }
  }`;

export const GET_COUNTRY_WISE_CITIES_QUERY = gql`
query cities($where: CityWhereInput) {
  cities (where:$where) {
    id 
    name 
    code 
    country 
      { 
        id
        name
        country_code
        is_vat_enabled
        vat_details {
           vat_type_label
           value
        }
        currency
        currency_symbol 
      }
  }
}`;




export const GET_CITY_QUERY = (whatYouWant: any, id: any) => gql`
  query {
    city(id:${id}) {
      ${whatYouWant}
    }
  }`;


export const GET_CITIES_AREAS_QUERY = gql`
query { 
  cities_areas{
    id 
    name 
    code 
    area 
      { 
        id 
        name
        code
      }
  }
}`;


export const MY_PROFILE_QUERY = gql`
query {
  myProfile {
    is_required_vehicles_registration_upload
      id
      driving_license{
        status
      }
      userType
      status
      email
      phone
      vehicle_limit
      verifiedEmail
      nickname
      verified_phone
      documents{
        goverment
        licens
        reason
      }
      profile {
        nationality{
          name
          id
        }
        rateVal
        has_free_delivery
        free_delivery {
          city_name
          city_id
          days
          id
        }
        accepted_age_limit
         accepted_driver_license_age
         not_accepted_nationality{
         id
         name
         }
        brithday
        gender
        earning
        spending
        losses
        approvedRate
        responseRate
        has_collection_charge
        collection_charge {
          city_name
          id
          city_id
          charge
        }
        first_name
        last_name
        selfie_image
        with_driver
        with_driver_charge
        international_license
		    residing_in{
           name
           active
           verified
           gcc_member
           countryId {
             id
             is_peer_enabled
             currency
             currency_symbol 
             country_code
             is_crypto_enabled
           }
           documents{
            expiry_date
            name
            code
            card_image
          }
           renting_in{
              cityId {
                country {
                  id
                  name
                  currency
                  conversion_rate
                  country_code
                  currency_symbol
                  is_vat_enabled
                  vat_details{
                    value
                    vat_type_label
                    vat_type_percentage
                  }
                  skey
                  serviceId
                }
                id
                name
              }
              name
           }
        }
        credits {
          id
          token
          number
          name
          type
          expire_month
          expire_year
          is_primary
          payment_service
        }
        isVATInsurance
        driver_charge
        has_driver
        Insurance{
          id
          type
          name
          daily_price
          weekly_price
          monthly_price
        }
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
        locations{
            id
            cityName
            cityID
            areaName
            areaID
            address
            mapCoordinates
            delivery_options{
              _id
              id:_id
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
        response_average
        response_count
        approved_count
        rejected_count
    }
}`;

//For Recent Vehicle Query
export const RECENT_VEHICLES = gql`
query ($skip: Int, $limit:Int, $residing_in: ID, $categoryId: ID, $cityId: ID){
  vehicles(orderBy: createdAt_DESC,  skip:$skip, limit: $limit, residing_in: $residing_in, categoryId: $categoryId, cityId: $cityId) {
    promotions
    transfer_package{
      id
      type
      package{
        name
        price
        description
        price_per_child
        price_per_person
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
      booking_type
      approved_count
      instance_booking
      createdAt
      trim {
          name
      }
      attributes
      rate_avg
      thumb
      host_rate_avg
      price
      brand {
          name
      }
      model {
          name
      }
      category{
          id
      }
      youtube_url
      is_with_driver
      owner {
          id
          rate_count
          rate_avg
          profile {
              first_name
              selfie_image
              with_driver
              with_driver_charge
          }
      }
      images {
          imageUrl
      }
      duration_discount{
              duration 
              price
          }
  }
}
`;

//For featured vehicles
export const FEATURE_VEHICLES = gql`query featuredHostVehicle( $limit: Int, $category:ID, $cityId: ID) {
  featuredHostVehicle(  limit : $limit, category:$category, cityId: $cityId) {
      vehicles{
          id
          is_with_driver
          trim {name}
          attributes
          brand {   name  }
          model {name }
          price
          thumb
          instance_booking
          images{ imageUrl }
          location{ coordinates}
          owner {
              id
              rate_avg
              rate_count
              profile {
                  first_name
                  last_name
                  selfie_image
                  with_driver
                  with_driver_charge
              }
          }
          rate_avg
          host_rate_avg
          host_rate_avg
          booking_type
          duration_discount{
              duration 
              price
          }
        }
}
}
`;



export const CATEGORIESWHERE = gql`
    query ($id: ID!){
        category(id:$id){
            id 
            names {
              name
              language
            }
            image
            icon
            active
            booking_type
            attributes{ 
                id 
                alias
                order 
                is_requried
                name 
                type 
                page
                image 
                options { 
                    id 
                    name
                }
            }
            filter_duration
            sub_category_type
            is_custom_title_exist
            brand_label
            model_label
            trim_label
        }
    }
`;  

export const COUNTRYWHERE = gql`
    query ($id: ID!){
        country(id:$id){
            id 
            vehicle_document_list{
              code
              name
            }
        }
    }
`;  

export const GET_PRICE_RANGE = gql`
  query ($category:ID!) {
    getPriceRang(category:$category){  
      min 
      max 
      minMonthly 
      maxMonthly 
      minWeekly 
      maxWeekly
    } 
  }
`;


export const CONVERSATIONS_QUERY = gql`
    query conversations($skip: Int, $limit: Int){
        unSeenMessagesCount
        
        conversations(skip: $skip, limit: $limit){
            id
            last_message{
                id
                body
                createdAt
            }
            hide_conversation
            un_seen_count
            vehicle{
              id
              brand {
                name
              }
              model {
                name
              }
              trim {
                name
              }
              trim {
                name
              }
              owner{
                id
              }
              thumb
              host_rate_avg
              rate_avg
              price
              attributes
            }
            booking{
              id
              start_at
              end_at
              status
              billing{
                amount
                final_amount
              }
              canceled_reason{
                text
                reasonType
              }
              reject_reason{
                text
                reasonType
              }
              vehicle {
                id
                brand {
                  name
                }
                model {
                  name
                }
                trim {
                  name
                }
                trim {
                  name
                }
                owner{
                  id
                  show_phone
                }
                thumb
                host_rate_avg
                rate_avg
                price
                attributes
              }
            }
            members{
                id
                rate_avg
                userType
                profile{
                    selfie_image
                    first_name
                    last_name
                }
            }
        }
    }
`;

export const GET_CONVERSATION_MESSAGES = gql`
    query Conversation($Id :ID!){
        conversation(conversation:$Id){
            messages{
              type
              image
                id
                body
                seen
                createdAt
                sender{
                    id
                    profile{
                        first_name
                        last_name
                        selfie_image
                    }
                }
            }
        }
    }
`;


export const CATEGORIES = (lang_code:string, whatYouWant:string) => gql`query{categories(lang_code:"${lang_code}") {${whatYouWant}}}`;


export const GET_VEHICLES = gql`
      query ($where:VehicleWhereInput, $input:VehicleQueryInput, $orderBy: VehicleOrderByInput, $skip: Int, $limit:Int, $residing_in: ID, $categoryId: ID, $random:Boolean, $monthlyDeal:monthlyDealInput, $cityId: ID,$durationInput:Int) {
        vehiclesQuery(where:$where input:$input orderBy:$orderBy pagination: {page: $skip limit: $limit} residing_in: $residing_in categoryId: $categoryId, random:$random, monthlyDeal:$monthlyDeal, cityId: $cityId,durationInput:$durationInput)
        {
          vehicles{
            promotions
            transfer_package{
              id
              type
              package{
                name
                price
                description
                price_per_child
                price_per_person
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
            approved_count
            trim {name}
            attributes
            brand {   name  }
            model {name }
            price
            thumb
            youtube_url
            is_with_driver
            instance_booking
            images{ imageUrl }
            location{ coordinates}
            owner {
                id
                rate_avg
                rate_count
                profile {
                    first_name
                    last_name
                    selfie_image
                    with_driver
                    with_driver_charge
                }
            }
            category{
            id
             }
            rate_avg
            host_rate_avg
            host_rate_avg
            booking_type
            duration_discount{
                duration 
                price
            }
            duration_discount1{
              duration 
              price
            }
          },
          totalDocs
        }
    }
`;

export const TOPRATEDHOSTS = gql`
    query topHost ($residing_in: ID, $categoryId : ID,  $skip: Int, $limit:Int, $first_name_contains: String, $cityId: ID, $show_all: Boolean) {
        topHost(residing_in: $residing_in, categoryId: $categoryId, skip:$skip, limit: $limit, first_name_contains: $first_name_contains, cityId: $cityId, show_all : $show_all) {
            id
            email
            adminId {
              profile {
                companyName
              }
            }
            profile {
                first_name
                selfie_image
            }
            adminId {
              profile {
                companyName
              }
            }
            rate_avg
            rate_count
        }
    }
`;

export const GET_HOST_PROFILE = gql`
  query ($user_id: ID!, $cityId: ID){ 
    hostPublicData(user_id:$user_id, cityId:$cityId){ 
      response_count
      response_average
      approved_count
      rejected_count
      first_name 
      last_name 
      userId
      reviews_count 
      host_count 
      host_rate 
      reviews { 
        vehicle_rate 
        vehicle_review 
        host_rate 
        host_review  
        user {
          profile {
            first_name 
            last_name
          }
        } 
      } 
      nationality 
      selfie_image
      adminId {
        profile {
          first_name
          last_name
          companyName
        }
      } 
      vehicles
        {
          id 
          transfer_package{
            id
            type
            package{
              id
              name
              price
              description
              maxperson
              price_per_child
              price_per_person
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
          promotions
          booking_type 
          category { 
            id
          } 
          duration_discount{ 
            duration  
            price
          }  
          title 
          price 
          instance_booking 
          approved_count 
          address 
          attributes 
          featured 
          rate_avg 
          rate_count 
          images {
            imageUrl
          } 
          thumb 
          owner {
            id
            rate_count
            rate_avg
            profile {
              first_name 
              selfie_image
            }
          } 
          brand {
            name
          } 
          model {
            name
          } 
          trim  {
            name  
          }
        } 
    } 
  }`;

export const GET_HOST_REVIEWS =  gql`
  query ($user_id: ID!, $skip: Int, $limit: Int) {
    hostReviews(user_id: $user_id, skip: $skip, limit: $limit){
                id
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
}
`;

export const VEHICLES_SEARCH_INCOUNTS  = gql`
  query vehiclesSeachInCounts($keyword: String, $residing_in: ID, $categoryId: ID, $input:VehicleQueryInput, $cityId: ID ) {
    vehiclesSeachInCounts(where:{keyword:$keyword}, residing_in: $residing_in, categoryId : $categoryId, input:$input, cityId:$cityId) {
      brand
      model
      trim
      address
      plate_city
      brand_model   
    }
  }
`;

export const GET_BRANDS = gql`
  query ($category : ID!){ 
    brands(where:{ category: $category }){ 
      id
      name 
    }
  }
`;

export const GET_MODELS = gql`
  query ($brand : ID) { 
    models (where: { brand: $brand }) { 
      id
      name
    }
  }
`;

export const GET_TRIMS = gql`
  query ($model: ID!) {
    getTrims(where:{model:$model}) {
      id
      name
      model{
        id
        name
      }
    }
  }
`;
export const GET_VEHICLE_BY_ID = gql`
  query ($id:ID!, $cityId: ID) {
    vehicle(id:$id, cityId:$cityId){  
      id
      qty
      is_with_driver
      promotions
      transfer_package{
        id
        type
        package{
          id
          name
          price
          description
          maxperson
          price_per_child
          price_per_person
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
            approved_count
            trim{ name }
            images {
                imageUrl
            }
            always_availble
            featured
            owner {
              citywise_delivery_charge
                id
                rate_avg
                rate_count
                profile {
                    first_name
                    last_name
                    selfie_image
                    isVATInsurance
                    driver_charge
                    has_driver
                    with_driver_charge
                    with_driver
                    has_free_delivery
                    free_delivery {
                      city_name
                      city_id
                      days
                    }
                    has_collection_charge,
                    collection_charge{
                      id
                      city_id
                      city_name
                      charge
                    }
                    Insurance{
                        id
                        type
                        name
                        daily_price
                        weekly_price
                        monthly_price
                    }
                }
            }
            category{
                id
                icon
                whatsapp_number
            }
            rate_avg
            location {
                coordinates
            }
            delivery_type
            host_rate_avg
            thumb
            brand {
                id
                name
            }
            model {
                id
                name
            }
            price
            youtube_url
            check_in_time
            featured
            instance_booking
            emirates
            address
            rate_count
            title
            attributes
            kilometer_limit_data {
              daily
              weekly
              monthly
              dailyCharge
              weeklyCharge
              monthlyCharge
            }
            attributesImage{
                name
                image
            }
            createdAt
            reviews {
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
            availble_dates {
                from
                to
            }
            booked_dates {
                from
                to
            }
            cities_available{
              city
              charge
            }
            booking_type
            duration_discount{
                duration
                price
            }
            minimumDuration
            insurance_category_cdw{
              insurance_id
              type
              name
              daily_price
              weekly_price
              monthly_price
            }
            insurance_category_pai{
                insurance_id
              type
              name
              daily_price
              weekly_price
              monthly_price
            }
            host_locations{
                 id
                cityName
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
            pick_up_location {
                cityName
                areaName
                address
                mapCoordinates
                delivery_options {
                    city:cityName
                    cityID
                    areaName
                    areaID
                    charge
                    collectionCharge
                    isTwoDelivery
                }
            }
            pick_up_coordinates {
                coordinates
            }
            currency
    } 
  }
`;

export const GET_VEHICLE_BY_ID_STEP_1 = gql`
      query vehicle($id:ID!) {
            vehicle(id:$id){
              currency
                  registration_front
                  registration_back
                        id 
                        qty
                        booking_type
                        trim{
                          id
                          name
                        }
                  emirates
                  images{
                        id 
                        imageUrl
                  } 
                  category
                  {
                        id
                        icon
                        sub_category_type
                        is_custom_title_exist
                        brand_label
                        model_label
                        trim_label
                  }
                  plate
                  {
                        number 
                        code 
                        category
                        {
                              id 
                              name
                        } 
                        emirate
                        {
                              id 
                              name
                        }
                  } 
                  thumb 
                  attributes 
                  steps  
                  youtube_url
                  brand
                  {
                        id 
                        name
                  }
                  model
                  {
                        id 
                        name
                  }
                  promotions
          transfer_package{
            id
            type
        }
        documents{
          name
          code
          card_image
        }
        document_status
      }
}
`;

export const GET_VEHICLE_BY_ID_STEP_2 = gql`
      query vehicle($id:ID!) {
            vehicle(id:$id){
              currency
              id 
              always_availble 
              availble_dates{
                from 
                to
              }
              owner {
                has_instant_booking
              } 
              instance_booking 
              working_hours 
              sun_thurs_start 
              sun_thurs_end 
              friday 
              friday_start 
              friday_end 
              saturday 
              saturday_start 
              saturday_end 
              public_holiday 
              public_holiday_start 
              public_holiday_end
      }
}
`;

export const GET_VEHICLE_BY_ID_STEP_3 = gql`
      query vehicle($id:ID!) {
            vehicle(id:$id){
              currency
              id 
              address 
              addressNote 
              location
              {
                type
                coordinates
              }
              host_locations{
                 id
                cityName
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

export const GET_HOST_LOCATIONS_STEP_3 = gql`
      query hostLocations($id: ID!){
        hostLocations(id : $id){
                        id
                        cityName
                         cityID{
                           id
                           name
                           code
                           country{
                            country_code
                           }
                         }
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
`;

export const GET_VEHICLE_BY_ID_STEP_4 = gql`
      query vehicle($id:ID!) {
            vehicle(id:$id){
              currency
              id 
              price 
              is_with_driver
              booking_type 
              kilometer_limit 
              kilometer_limit_data
              {
                daily 
                dailyCharge 
                weekly 
                weeklyCharge 
                monthly 
                monthlyCharge
              } 
              delivery_available 
              cities_available
              { 
                city 
                charge
              } 
              duration_discount
              { 
                duration 
                price 
              } 
              minimum_duration_available 
              minimumDuration 	
					    insurance_category_cdw
              {
                insurance_id 
                type 
                name 
                daily_price 
                weekly_price 
                monthly_price
              }
					    insurance_category_pai
              {
                insurance_id 
                type 
                name 
                daily_price 
                weekly_price 
                monthly_price
              } 
              owner 
              { 
                profile 
                  { 
                    isVATInsurance
                    Insurance
                      {
                        id
                        type
                        name
                        daily_price
                        weekly_price
                        monthly_price
                      } 
                  }
              }
              promotions
              transfer_package{
                id
                type
                package{
                  name
                  price
                  description
                  price_per_child
                  price_per_person
                  child_price
                  maxperson
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
      }
}
`;

export const GET_VEHICLE_BY_ID_STEP_5= gql`
      query vehicle($id:ID!) {
            vehicle(id:$id){
              id 
              attributes 
      }
}
`;

export const GET_VEHICLE_BY_ID_STEP_6= gql`
      query vehicle($id:ID!) {
            vehicle(id:$id){
              id 
              status 
      }
}
`;


export const GET_MY_TRIPS =gql`
  query($page:Int,  $limit:Int)
  {
    currentTrip(skip:$page,limit:$limit)
      {
        status 
        reference_number 
        previous_booking
        vehicle
        {
          id 
          attributes 
          booking_type
          thumb 
          host_rate_avg 
          rate_avg 
          owner
          {
            id 
            rate_avg 
            phone 
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
          final_amount
        }
          id 
          start_at 
          end_at 
          currentTime 
          vehicle
          {
            brand
          {
            name
          }
          model
          {
            name
          }
          images
          {
            imageUrl
          }
          }
    }
  }`


export const VEHICLE_SEARCH_FOR_USER = gql`
query ($input:VehicleQueryInput, $limit:Int, $skip:Int, $status:VehicleStatus){
  vehiclesSearchForUserQuery(input:$input, limit:$limit, skip:$skip, status:$status)
  {
          vehicles{
            id
            currency
            trim {name}
            attributes
            brand {   name  }
            model {name }
            price
            thumb
            instance_booking
            steps
            status
            images{ imageUrl }
            location{ coordinates}
            owner {
                id
                rate_avg
                rate_count
                profile {
                    first_name
                    last_name
                    selfie_image
                }
            }
            category{
            id
             }
            rate_avg
            host_rate_avg
            host_rate_avg
            booking_type
            duration_discount{
                duration 
                price
            }
            plate{number code}
            emirates
            document_status
          },
          totalDocs
        }
}
`;



export const RENTERCANCELREASON = gql`
query reasons{
reasons(where:{reasonType:RENTER_CANCEL}){
    id
    text
  }
}
`;

export const REJECT_REASONS_QL = gql`
query reasons{
 reasons(where:{reasonType:REJECT}){
    id
    text
  }
}
`;

export const TRIPS_HISTORY =gql`
  query historyTrip($skip:Int, $limit:Int){
        historyTrip(skip:$skip,limit:$limit)
        {
          status 
          reference_number
          previous_booking
          reject_Description 
          reject_reason{
            text
            } 
          cancel_Description 
          canceled_reason{text} 
          vehicle{
            id 
            attributes 
            thumb 
            host_rate_avg 
            reviews{
              id 
              user 
              { 
                id 
              }
            } 
            rate_avg owner{
              id 
              rate_avg 
              phone 
              profile{
                first_name 
                last_name 
                selfie_image
              }
              }
            } 
            billing{
              final_amount
            } 
            id 
            start_at 
            end_at 
            vehicle{ 
              brand 
            {name} 
            model 
            {name}  
            images{  
              imageUrl
              }
            }
          }
}`;

export const HOST_BOOKINGS = gql`
query hostBookings($skip: Int, $limit: Int){
  hostBookings(skip: $skip, limit: $limit){
    id
    start_at
    end_at
    status
    reference_number
    previous_booking
    renter{
      renterId : id
      id
      rate_count
      rate_avg
      phone
      profile{
        first_name
        last_name
        selfie_image
      }
    }
    reject_reason{
        text
    }
    reject_Description
    createdAt
    canceled_reason{
      text
    }
    cancel_Description
    billing{
      final_amount
    }
    vehicle{
      id
      title
      booking_type
      model{
        name
      }
      brand{
        name
      }
      trim{
        name
      }
      attributes
      thumb
    }
  }
}
`;

export const MAPAREA_VEHICLES = gql`
  query mapAreaVehicles($location:PolygonLocation,$skip: Int, $limit: Int, $residing_in: ID, $categoryId: ID, $cityId: ID){
    mapAreaVehicles(location : $location , skip : $skip, limit : $limit, residing_in : $residing_in, categoryId : $categoryId, cityId: $cityId){
      _id {
        coordinates
        type
      }
      totalDocs
      vehicles {
        id
        price
      }
    }
  }
`;

export const NEARBY_VEHICLES = gql`
  query nearVehicles($location:Location,$skip: Int, $limit: Int, $residing_in: ID, $categoryId: ID, $orderBy: VehicleOrderByInput, $cityId: ID){
    nearVehicles(location:$location, skip:$skip, limit:$limit, residing_in : $residing_in categoryId:$categoryId, orderBy:$orderBy, cityId: $cityId){
      vehicles{
        id  
        trim {
          name 
        }  
        attributes    
        brand {
          name
        }
        model {
          name 
        } 
        title 
        price
        thumb
        instance_booking 
        images { 
          imageUrl 
        } 
        location { 
          coordinates
        } 
        dist {
          calculated
        } 
        owner {
          id 
          profile { 
            first_name 
            selfie_image 
          } 
          rate_avg 
          rate_count
        }
        address
        featured
        rate_avg
        rate_count
        approved_count 
        booking_type 
        duration_discount{
          duration price
        }
      },
      totalDocs
    }
  }
`;

export const RENTER_DETAILS = gql`
  query retnerPublicData($user_id : ID!){
    retnerPublicData(user_id : $user_id){
      email 
      phone 
      rate_avg
      profile {
        first_name
        last_name
        selfie_image
        residing_in{
          active
          documents{
            card_image
            name
          }
        } 
      }
    }
  }
`;

export const HOST_DETAILS = gql`
  query retnerPublicData($user_id : ID!){
    retnerPublicData(user_id : $user_id){
      email 
      phone 
      show_phone
      rate_avg
      profile {
        first_name
        last_name
        selfie_image
        residing_in{
          active
          documents{
            card_image
            name
          }
        } 
      }
    }
  }
`;

export const MYFAVOURITES = gql`
  query favorite {
    favorites { 
      promotions
      transfer_package{
        id
        type
        package{
          name
          price
          description
          price_per_child
          price_per_person
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
      duration_discount{
        duration price
      }
      price
      id 
      title
      attributes
      trim {
        name
      } 
      model { 
        name 
      } 
      host_rate_avg 
      brand {
        name
      } 
      owner { 
        rate_avg 
        profile { 
          first_name 
          last_name 
        }  
      } 
      images { 
        imageUrl 
      } 
      thumb
      booking_type 
      category { 
        id 
        icon
      } 
    }
  }
`;

export const LISTNOTIFICATIONS = gql`
query getNotifications($skip: Int, $limit: Int) {
  getNotifications(skip: $skip, limit: $limit){
    from{
      profile{
        first_name
        last_name
        selfie_image
      }
    } 
    type
    vehicle {
      thumb
      attributes
      brand:brandNew {
        name
      }
      model:modelNew {
        name
      }
      owner {
        profile {
          first_name
          last_name
        }
      }
    }
    is_seen
    id
    is_counter_seen
    createdAt
    updatedAt
    status
    booking{
      start_at
    }
    conversation{
      id
    }
    admin {
      first_name
    }
  }
}
`;
      


export const TRNASACTION_HISTORY=  gql`
  query transactions($skip: Int, $limit: Int){
    transactions(skip:$skip, limit:$limit)
  }
`;


export const MY_VEHILCLES=  gql`
  query myVehicles($skip: Int, $limit: Int, $status: VehicleStatus){
    myVehicles(skip:$skip, limit:$limit, status:$status){
      promotions
      transfer_package{ 
        id 
        type 
					package
            { 
              id 
              name 
              price 
              description  
              price_per_child 
              price_per_person 
              child_price 
              active 
              start 
              ending 
              working_hours
            }
    				transfer{ 
              from{ 
                cityId 
              { 
                _id 
                name 
              } 
              areas
                { 
                  _id 
                  name 
                } 
              } 
              to
              { 
                cityId 
                { 
                  _id 
                  name 
                } 
                areas
                { 
                  _id 
                  name 
                } 
              } 
              price 
              active 
            } 
      } 
      currency
      id 
      title 
      trim{
        name
      }
      plate{
        number 
        code
      } 
      emirates 
      status 
      featured 
      verify_status 
      thumb 
      instance_booking 
      attributes 
      thumb 
      images{ 
        imageUrl 
        order  
      } 
      price 
      rate_avg 
      rejected_count 
      approved_count 
      is_booked 
      model{
        name
      } 
      brand{
        name
      } 
      booking_type
      document_status
    }
  }
`;


export const GET_LIST_CATEGORIES=  gql`
  query categories($lang_code: String){
    categories(lang_code:$lang_code){
      id 
      name 
      image 
      booking_type 
      order 
      active 
      icon
      sub_category_type
    is_custom_title_exist
    brand_label
    model_label
    trim_label
    }
  }
`

export const MyReview = gql`
  query myReview{
    myReviews{
      id
      vehicle_rate
      status
      vehicle_review
      host_rate
      host_review
      vehicle{
        id
        trim{
          name
        }
        title
        brand{
          name
        }
        model{
          name
        }
        attributes
        thumb
        owner{
          profile{
            first_name
            last_name
          }
        }
        images{
          imageUrl
        }
      }
      user{
        id
      }
    }
  }
`;

export const  EMIRATES_PLATES = gql`query {
  emiratesPlate {
    id
    name
  }
}
`;

export const EMIRATES_PLATES_BY_ID = gql `
query ($id: ID!) {
  emiratePlate(id: $id) {
    id
    name
    category {
      id
      name
    }
  }
}
`;


export  const PLATECODE_BY_CATEGORY = gql`
query($id:ID!) {
  codeByCategory(id: $id)
}
`;

export  const MY_VEHILCLES_VERIFIED_COUNT = gql`
query {
  myVehiclesCount
}
`;

export const GETBOOKING_DETAILS = gql`query ($id:ID!){
  hostBooking(id: $id) {
    booking_type
    package
    vehicle_data
    transfer
    id
    start_at
    end_at
    reference_number
    renter{
      id
      nat_type
      profile{
        first_name
        last_name
        selfie_image
      }
    } 
    billing{
      currency
      amount
      collection_charge
      host_earnings
      final_amount
      commission_with_vat
      tax
      tax_rate
      drop_location {
        latitude
        longitude
      }
      discount_amount
      duration_discount_amount
      duration_discount_type{
        booking_type
      }
      insurance_cdw{
        name
        tax 
        amount
        finalAmount
      }
    insurance_pai{
        name
        tax 
        amount
        finalAmount
      }
    driver_charge {
      tax 
      amount
      finalAmount
    }
    
    }
    canceled_at
    canceled_reason{
      text
      reasonType
    }
    reject_reason{
      text
      reasonType
    }
    vehicle {
      id
      
      thumb
      delivery_type
      kilometer_limit
      kilometer_limit_data{
        daily
        weekly
        monthly
        extra_kilometer
      }
      approved_count
      images {
        imageUrl
      }
      featured
      host_rate_avg
      owner {
        id
        rate_count
        rate_avg
        profile {
          first_name
          last_name
          selfie_image
        }
      }
      rate_avg
      location {
        coordinates
      }
      pick_up_location {
        cityName
        address
        mapCoordinates
      }
      pick_up_coordinates {
        coordinates
      }
      delivery_type
      host_rate_avg
      thumb
      brand:brandNew {
        name
      }
      model:modelNew {
        name
      }
      trim :trimNew{
        name
      }
      price
      check_in_time
      featured
      instance_booking
      emirates
      address
      rate_count
      title
      attributes
      createdAt
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
      availble_dates {
        from
        to
      }
      booked_dates {
        from
        to
      }
      booking_type
    }
    delivery_city{
      city
      charge
      cityId {
        id
        name
      }
      isTwoDelivery
    }
    status
  }
}
`;


export const TRANSACTION_SEARCH_BY_BOOKING_REF = gql`
    query($skip:Int, $limit:Int, $searchBookingRef:Int){
      transactionsSearchByBookingRef(skip:$skip, limit:$limit, searchBookingRef:$searchBookingRef)
    }
`;
export const FETCH_AREAS= gql`  
query areas($where: AreaWhereInput) {
  areas(where: $where) {
    id
    name
    code
    city{
    id
    name
    code
    country{
      name
    }
    }
  }
}`;

export const ALL_COUNTRIES_LIST=gql`
query countries($limit: Int!, $skip: Int!, $where: CountryWhereInput) {
  countries(limit: $limit, skip: $skip, where: $where) {
    id
    name
    code
    country_code
  }
}
`;
export const COUNTRIES = gql`query{countries{id name, code skipOtp shortCode country_code}}`;



export const SYNCTODB =  gql` 
  query data {
    getNotificationCount
  }

`;

export const CITY_WISE_AREA = gql`
      query hostLocationAreas($cityId: ID!){
        hostLocationAreas(cityId : $cityId){
                        areaName
                        areaID
            }
      }
`;
export const IDASTEPS = gql`
query{
  idasteps{
      step1{
        residence_country,
    dl_country
    delivery
    pkg{
      name
    price
    }
    shipment{
        country
    city
    region
    street
    house
    apartment
    }

    }
    step2{
        firstname
    lastname
    birth_city
    birth_country
    residence_address {
        country
    city
    region
    street
    house
    }
    driving_license {
        year_obtain_dl
    national_dl_no
    dl_expire_data
    }
    dl_category

    }
    step3{
        images {
             imageUrl
    slug
        }
    }
    status
    billingId
    billing_status
    package_price{
        price
        index
    }
  }
}
`
export const APPCONFIG = gql`query {
  appconfig
  {
    id
  	speed_size
    isDeliveryEnabled
    enableEuropCar
  }

}`;


export const GET_BLOGS = gql`
  query ($where:BlogWhereInput,$skip: Int, $limit: Int) {
    blogs(where:$where,skip:$skip, limit:$limit){  
      count
      data {
        id,
      title,
      content,
      keywords,
      desc,
      status,
      poster
      createdAt
      }
        } 
  }
`;

export const LIST_ALL_STATIONS = gql`
      query getStations($countryCode: String! , $cityName:String!){
        getStations(countryCode : $countryCode , cityName:$cityName){
              stationCode
              stationName
              prestige
              truckAvailable
            }
      }
`;

export const STATION_OPEN_CLOSE_HOURS = gql`
      query getOpenHours($stationID: String! , $date:String!){
        getOpenHours(stationID : $stationID , date:$date){
            beginTime
            endTime
            type
            afterHourCharge
            afterHourChargeCurrency
            }
      }
`;
export const EUROP_CAR_VEHICLES = gql`
      query getMultipleRates($reservationInput: getMultipleRatesInput!){
            getMultipleRates(reservationInput : $reservationInput){
                reservation{  
                  reservation{
                    IATANumber
                    contractID
                    duration
                    resStationID
                    type
                    xrsPartnerCallerID
                    checkin{
                        date
                        stationID
                        time
                    }
                    checkout{
                        date
                        stationID
                        time
                    }
  									equipmentList {
                          equipment{
                            type,
                            statusCode,
                            rentalMaxAI,
                            priceInBookingCurrency,
                            price,
                            rentalMax,
                            code,
                            descr
                            qty,
                            rentalpriceInBookingcurrencyAI,
                            tax,
                            rentalPriceAI,
                            per,
                            rentalMaxInBookingcurrencyAI
                          }
                        }
                  }
                  driver {
                        countryOfResidence
                  }
                  reservationRateList {
                        reservationRate {
                        IATANumber
                        basePrice
                        bookingCurrencyOfPrepaidAmount
                        bookingCurrencyOfTotalRateEstimate
                        carCategoryAirCond
                        carCategoryAutomatic
                        carCategoryBaggageQuantity
                        carCategoryCO2Quantity
                        carCategoryCode
                        carCategoryDoors
                        carCategoryModelHeight
                        carCategoryModelLength
                        carCategoryModelWeight
                        carCategoryModelWidth
                        carCategoryName
                        carCategoryPowerHP
                        carCategoryPowerKW
                        carCategorySample
                        carCategorySeats
                        carCategoryStatusCode
                        carCategoryType
                        contractID
                        currency
                        exchangeRate
                        fuelTypeCode
                        includedKm
                        includedKmScr
                        includedKmType
                        includedKmUnit
                        extraKmPrice
                        isPrepaid
                        isPriceSecret
                        prepaidAmountInBookingCurrency
                        prepaidPercentage
                        productCode
                        productFamily
                        productLevel
                        productVersion
                        rateId
                        resStationID
                        totalRateEstimate
                        totalRateEstimateInBookingCurrency
                        type
                        xrsBasePrice
                        xrsBasePriceInBookingCurrency
                        links {
                        link {
                              id
                              value
                        }
                        }
                        ageLimit {
                        minAgeForCategory
                        minAgeForCountry
                        minLicencePeriod
                        youngDriverAge
                        }
                        insuranceList {
                        insurance {
                              bkExcessWithPOM
                              code
                              excessWithPOM
                              price
                              priceInBookingCurrency
                              rentalPriceAI
                              rentalPriceInBookingCurrencyAI
                              type
                        }
                        }
                        taxList {
                        tax {
                              taxCode
                              taxRate
                        }
                        }
                        includeList {
                        include {
                              code
                        }
                        }
                        }
                  }
                },
                owner {
                  citywise_delivery_charge
                  id
                  rate_count
                  rate_count
                  profile{
                        driver_charge
                        first_name
                        has_collection_charge
                        has_driver
                        has_free_delivery
                        isVATInsurance
                        last_name
                        selfie_image
                  }
                }														
            }
      }
`;




