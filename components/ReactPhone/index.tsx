import ReactLoader from 'components/ReactLoader'
import React ,{useEffect,useState} from 'react'
import PhoneInput from 'react-phone-input-2'
import _ from 'lodash'



export type ReactPhoneType = {
    phone?: string,
    onChange?: (val: any, country?:any) => void
    inputStyle?:any
    onlyCountries?:any
    dropdownStyle?:any
    disabled?:any
}
export default function ReactPhone({ phone, onChange, inputStyle ,onlyCountries,dropdownStyle,disabled }: ReactPhoneType) {
    const [countries,setCountries] = useState<any>([]);
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const filteredCountries = onlyCountries && onlyCountries.map((country:any) => country.code.toLowerCase());
        setCountries(filteredCountries)
        !_.isEmpty(filteredCountries) && setLoading(false)

        return () => {
            setLoading(true)
        }
         
    }, [onlyCountries])

    if(loading){
       return <ReactLoader loading={loading}/>
    }
    return (
           <PhoneInput
            disabled={disabled ? disabled : false}
            disableCountryCode={disabled ? disabled :false}
            value={phone?.toString().replace(/^0+/, '')}
            onChange={(e:any, country:any)=>{ 
                    const countryid = onlyCountries.find((a:any) => a.code.toLowerCase() == country.countryCode)
                    onChange && onChange(`00${e}`, countryid.id)
            }}
            inputStyle={inputStyle}
            dropdownStyle ={dropdownStyle}
            onlyCountries={countries}
            countryCodeEditable={true}
            buttonStyle={{direction:"ltr"}}
        /> 
    )
}
