import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FacebookIcon from '../../asset/icons/FacebookIcon'
import GoogleIcon from '../../asset/icons/GoogleIcon'
import PauseIcon from '../../asset/icons/PauseIcon'
import PlayIcon from '../../asset/icons/PlayIcon'
import TwitterIcon from '../../asset/icons/TwitterIcon'
import img3 from '../../asset/images/4 7.png'
import img6 from '../../asset/images/Frame 589.png'
import img5 from '../../asset/images/Frame 591.png'
import avatar from '../../asset/images/Image.png'
import logo from '../../asset/images/Logo.png'
import img2 from '../../asset/images/[removal 2.png'
import img4 from '../../asset/images/[removal 3.png'
import img1 from '../../asset/images/side-view-men-recording-podcast 1.png'
import audio from '../../asset/podcasts/3910618-hd_1920_1080_25fps.mp4'
import { updateObjectInLocalStorage } from '../../utils/handleLocalStorage'


const SignUpPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handleSignIn = () => {
        navigate('/sign-in')
    }

    const handleSignUp = () => {
        navigate('/sign-up-step1');
        updateObjectInLocalStorage('signUpData', {email : email, password: password});
    }
    const handlePlayClick = async() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className='signUp d-grid'>
            <div className='signUp-left text-start d-flex justify-content-center align-items-center'>
                <div class="signUp-leftIn d-flex justify-content-start align-items-start flex-column">
                    <img src={logo} alt='logo' className='signUp-logo'/>
                    <span className='signUp-text'>Join 128,000+ podcasters & listeners</span>
                    <div className='signUp-listImg'>
                        <img src={avatar} alt='avatar' />
                        <img src={avatar} alt='avatar' />
                        <img src={avatar} alt='avatar' />
                        <img src={avatar} alt='avatar' />
                        <img src={avatar} alt='avatar' />
                    </div>
                    <h3>Create an Account</h3>
                    <div className='signUp-listSocial d-flex align-items-center width-full justify-content-between'>
                        <button className='button button--blue signUp-btnT'>
                            <TwitterIcon />
                            <span>Sign Up With Twitter</span>
                        </button>
                        <button className='button'><FacebookIcon/></button>
                        <button className='button signUp-buttonG'><GoogleIcon/></button>
                    </div>
                    <span className='signUp-separate width-full text-center'>Or Continue with email</span>
                    <div className='signUp-email width-full'>
                        <h4>Email</h4>
                        <input type='text' placeholder='Your Email' className='width-full' value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className='signUp-password width-full'>
                        <h4>Password</h4>
                        <input type='password' placeholder='Your Password' className='width-full' value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className='width-full'>
                        <button className='button button--primary width-full' onClick={handleSignUp}>Sign Up</button>
                    </div>
                </div>
            </div>
            <div className='signUp-right d-flex justify-content-center align-items-center'>
                <div className='signUp-rightIn d-flex justify-content-center align-items-start flex-column'>
                    <div className='signUp-rightIn-text text-end width-full'>Already a member? <span style={{cursor:"pointer"}} onClick={handleSignIn}>Sign In</span></div>
                    <div className='signUp-right-grid d-grid'>
                        <div className='d-flex justify-content-end signUp-right-img1'>
                            <img src={img1} alt='avatar' />
                        </div>
                        <img src={img2} alt='avatar' className='signUp-right-img2' />
                        <div className='d-flex justify-content-end signUp-right-wrapper3'>
                            <img src={img3} alt='avatar' className='signUp-right-img3 d-flex justify-content-end'/>
                            <img src={img6} alt='avatar' className='signUp-right-img6'/>
                        </div>
                        <div className=''>
                            <img src={img4} alt='avatar' className='signUp-right-img4' />
                            <div>

                            </div>
                        </div>
                    </div>
                    <img src={img5} alt='avatar' className='signUp-right-img5'/>
                    <h1 className='text-start signUp-right-h1'>Discover better insight every single day</h1>
                    <button className='button signUp-right-button text-start' onClick={handlePlayClick}>
                        {isPlaying ? <PauseIcon/> : <PlayIcon />}
                        <span>listen Now</span>
                    </button>
                </div>
            </div>
            <audio ref={audioRef} src={audio} />
        </div>
    )
}

export default SignUpPage
