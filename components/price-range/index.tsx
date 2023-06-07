import React from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

type PriceRangeType={
    max?:number,
    min?:number,
    value:number,
    onChange:(values:any)=>void
}

export default function PriceRange({max, min, value, onChange}:PriceRangeType) {
    return (
        <InputRange
        formatLabel={value => `${value} AED`}
        draggableTrack={true}
        maxValue={max}
        minValue={min}
        value={value}
        onChange={onChange} />
    )
}


