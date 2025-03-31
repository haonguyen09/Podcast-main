import React from 'react'
import logo from '../../asset/images/Logo.png'

const HeaderSigup = ({ step, nameStep, title, des, onStepChange }) => {

    return (
        <>
            <div className='width-full signUp-s1-img'>
                <img src={logo} />
            </div>
            <div className='signUp-s1-header'>
                <h3>{`Step ${step}`} <span>{ nameStep }</span></h3>
                <div className='signUp-s1-lines d-flex align-items-center'>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className={step === num ? 'active' : ''} onClick={() => onStepChange(num)}></div>
                    ))}
                </div>
                <h4>{ title }</h4>
                <span className='signUp-s1-subtitle'>{ des }</span>
            </div>
        </>
    )
}

export default HeaderSigup
