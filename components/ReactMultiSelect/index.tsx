import React from 'react';
import Multiselect from 'multiselect-react-dropdown'

interface IReactMultiSelect {
    onSelect: (value:any)=>void,
    onRemove: (value:any)=>void
    displayValue:string,
    groupBy:string,
    selectedValue: { name: string, id: string }[] | []
    options: { name: string, id: string }[] | [],
    showCheckbox:boolean,
    placeholder?:string,
    singleSelect:boolean
}

export default function ReactMultiSelect({singleSelect, onSelect, onRemove, displayValue, selectedValue, options, groupBy, showCheckbox, placeholder}:IReactMultiSelect) {
    return (
        <div id="multiSelect_Dropdown">
            <Multiselect
                options={options} // Options to display in the dropdown
                selectedValues={selectedValue} // Preselected value to persist in dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue={displayValue} // Property name to display in the dropdown options
                groupBy={groupBy}
                singleSelect={singleSelect}
                showCheckbox={showCheckbox}
                placeholder={placeholder}
                style={{
                    inputField: {
                        minHeight: "23px",
                        paddingTop: 0
                    },
                    chips:{
                        backgroundColor:"var(--theme_color)"
                    },
                }}
            />
        </div>
    )
}
