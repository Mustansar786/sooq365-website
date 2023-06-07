import React from 'react';
import styles from './style.module.css';
import { useTranslation } from 'react-i18next';

export type _ReactCheckbox = {
    label?: any,
    value?: boolean,
    onChange?: (name: any) => void,
    id: string
}

export default function ReactCheckBox({ label, value, id, onChange }: _ReactCheckbox) {
    const {i18n} = useTranslation();


    return (
        <div className={i18n.language === 'ar' ? styles.newArabic : styles.new}>
            <div className={styles.form_group}>
                <input type="checkbox" id={id} checked={value} onChange={onChange} />
                <label htmlFor={id}>{label}</label>
            </div>
        </div>
    )
}
