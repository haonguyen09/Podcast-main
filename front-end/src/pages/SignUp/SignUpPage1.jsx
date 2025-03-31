import React, { useState } from 'react'
import logo from '../../asset/images/Logo.png'
import HeaderSigup from './HeaderSigup'
// import { unstable_HistoryRouter } from 'react-router-dom';
import SignUpStep1 from './SignUpStep1';
import SignUpStep2 from './SignUpStep2';
import SignUpStep3 from './SignUpStep3';
import SignUpStep4 from './SignUpStep4';
import { useNavigate } from 'react-router-dom';

const SignUpPage1 = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    // const history = unstable_HistoryRouter();
    
    const steps = [
        { step: 1, nameStep: 'Setup Your Account', title: 'Setup Your Account', des: '🤘Let’s start your Podcast journey' },
        { step: 2, nameStep: 'What topics are you interested in?', title: 'What topics are you interested in?', des: '⚡ We use topics to personalize your feed and make it easier for you to discover relevant content' },
        { step: 3, nameStep: 'Pick Some Podcast', title: 'Pick Some Podcast', des: '⚡ We use topics to personalize your feed and make it easier for you to discover relevant content' },
        { step: 4, nameStep: 'Follow some people', title: 'Follow some people', des: '⚡ We use topics to personalize your feed and make it easier for you to discover relevant content' }
    ];

    const handleStepChange = (step) => {
        if (step === 5) {
            navigate('/sign-in');
        } else {
            setCurrentStep(step);
        }
    };

    const currentStepInfo = steps.find(step => step.step === currentStep);

    return (
        <div class="signUp-s1-wrapper d-flex justify-content-center align-items-center">
            <div className='signUp-s1 d-flex justify-content-center align-items-start flex-column'>
                <HeaderSigup 
                    step={currentStepInfo.step}
                    nameStep={currentStepInfo.nameStep}
                    title={currentStepInfo.title}
                    des={currentStepInfo.des}
                    onStepChange={handleStepChange}
                />

                    {currentStep === 1 && (
                        <SignUpStep1 
                        currentStep={currentStep}
                        handleStepChange={handleStepChange}
                        />
                    )}
                    {currentStep === 2 && (
                        <SignUpStep2 
                        currentStep={currentStep}
                        handleStepChange={handleStepChange}
                        />
                    )}
                    {currentStep === 3 && (
                        <SignUpStep3 
                        currentStep={currentStep}
                        handleStepChange={handleStepChange}
                        />
                    )}
                    {currentStep === 4 && (
                        <SignUpStep4 
                        currentStep={currentStep}
                        handleStepChange={handleStepChange}
                        />
                    )}
            </div>
        </div>
    )
}

export default SignUpPage1
