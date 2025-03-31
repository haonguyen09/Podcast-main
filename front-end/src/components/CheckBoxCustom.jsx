import React from 'react'

const CheckBoxCustom = ({ checked, onChange }) => {
    return (
        <label className="custom-checkbox-container">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="custom-checkbox-checkmark"></span>
        </label>
    )
}

export default CheckBoxCustom
