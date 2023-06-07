import { ImagePrefix,display_image } from 'constants/constants';
import React from 'react'
import Select from 'react-select';
import styles from './react-select.module.css';
type _option = {
    value: string,
    label: string,
    disabled?:boolean
}


type ReactSelectType = {
    options: _option[],
    handleChange: (val: any,action : any) => void
    value: any,
    label?: string
    icon?: string,
    img?:string,
    className?: string,
    placeholder?: any
    menuPlacement?:any
    name?:string,
    isDisabled?:boolean,
    isLoading?:boolean,
    isOptionDisabled?:any
}



export default function ReactSelect({isOptionDisabled, value, handleChange, options, label, icon, img, className, placeholder, menuPlacement, name, isDisabled ,isLoading = false }: ReactSelectType) {

    let labelTag = null;
    if (label && icon) {
        labelTag = <label className={styles.label} ><img width="20px" style={{ marginRight: "5px" ,maxHeight: "20px" }} src={'/assets/vehicle_types/' + icon} alt={`${icon}`} /> {label}</label>
    }else if (label && img) {
        labelTag = <label className={styles.label} ><img width="20px" style={{ marginRight: "5px",maxHeight: "20px" }} src={display_image(ImagePrefix + img)} alt={`${img}`} /> {label}</label>
    }
     else if (label) {
        labelTag = <label className={styles.label} > {label}</label>
    } else if (icon) {
        labelTag = <label className={styles.label} ><img width="20px" style={{ marginRight: "5px",maxHeight: "20px" }} src={'/assets/vehicle_types/' + icon} alt={`${icon}`} /></label>
    }
    const isEmpty =value && Object.values(value).every(x => x === null || x === '') || false;
    // const colourStyles = {
    //     option: (styles:any) => {
    //       return {  
    //           ...styles,          
    //           display:'flex',
    //           flexDirection :'column',
    //           alignItems :'flex-start',
    //           justifyContent :'space-between'
    //       }
    //   }
    // }

    return (
        <>
            {labelTag}
            <Select
                value={isEmpty ? null : value}
                onChange={handleChange}
                options={options}
                className={`${styles.mt} ${className}`}
                placeholder={placeholder}
                menuPlacement={menuPlacement}
                name={name}
                isDisabled={isDisabled}
                isLoading={isLoading} 
                isOptionDisabled={isOptionDisabled}
                components={{ LoadingIndicator: null }}
                menuPortalTarget={name == 'cancel' ? document.body : null} 
                menuPosition='absolute' 
                styles={{
                    menuPortal: base =>
                    ({
                        ...base,
                        zIndex: 9999,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "space-between"
                    }),
                    option: (styles, {isFocused, isSelected}) => ({
                        ...styles,
                        background: isFocused
                            ? 'lightGrey'
                            : isSelected
                                ? 'var(--theme_color)'
                                : undefined,
                        zIndex: 1
                    })
                }}
            />
        </>
    )
}


