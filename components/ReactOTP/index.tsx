import React from 'react'
import OtpInput from 'react-otp-input';

type ReactOTPI = {
    otp?: any,
    onChange: (val: any) => void,
    numInputs: number,
    separator: any

}

export default function ReactOTP({ otp, onChange, numInputs, separator }: ReactOTPI) {
    return (
        <OtpInput
            value={otp}
            onChange={onChange}
            numInputs={numInputs}
            separator={separator}
            inputStyle={{width:"100%", borderRadius:"3px", border:"1px solid black", marginRight:'0.5rem', marginLeft:'0.5rem', height:"3rem"}}
            
        />
    )
}
