import { jwtDecode } from "jwt-decode"
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
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
import { useMutationHooks } from '../../hooks/useMutationHooks'
import { updateUser } from '../../redux/Slice'
import { getDetailsUser, loginUser } from '../../services/UserService'

const SignInPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [email,setEmail] = useState("haonguyen@gmail.com")
    const [password, setPassword] = useState("1234567")
    const [errorMessage, setErrorMessage] = useState("")
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const mutation = useMutationHooks(
        data => loginUser(data),
        {
            onSuccess: (data) => {
                console.log('Login successful:', data);
                // Additional logic after successful login
                const token = data?.access_token;
                const refreshToken = data?.refresh_token;
                localStorage.setItem('access_token', JSON.stringify(token));
                localStorage.setItem('refresh_token', JSON.stringify(refreshToken));
                if (token) {
                    const decoded = jwtDecode(token);
                    if (decoded?.id) {
                        handleGetDetailsUser(decoded.id, token, decoded.role);
                    } else {
                        console.error('JWT does not contain user ID.');
                    }
                }
            }, onError: (err) => {
                // Start with a default error message
                let message = 'Email or password invalid'; // Default message for empty error objects
            
                if (err.response && err.response.data) {
                    // If the response data has a message and it's not an empty object
                    if (err.response.data.message && Object.keys(err.response.data.message).length > 0) {
                        // Extracting the message as a string
                        message = err.response.data.message;
                    }
                } else if (err.request) {
                    // Handle case where there's no response (network error, timeout, etc.)
                    message = 'No response from the server.';
                } else {
                    // Other errors (possibly in request setup, etc.)
                    message = err.message || 'An unknown error occurred.';
                }
            
                // Set the error message state
                setErrorMessage(message);
            }
            
        }
    )
    
    const { data, isSuccess, isError, error } = mutation
    
    useEffect(() => {
        if(isSuccess) {
            console.log('data', data)
            const token = data?.access_token
            const refreshToken = data?.refresh_token
            localStorage.setItem('access_token', JSON.stringify(token))
            localStorage.setItem('refresh_token', JSON.stringify(refreshToken))
            if (token) {
                const decoded = jwtDecode(token);
                console.log('decoded', decoded)
                if (decoded?.id) {
                handleGetDetailsUser(decoded?.id, token, decoded?.role)
                }else {
                    // Handle the case where the JWT doesn't contain the expected user ID
                    console.error('JWT does not contain user ID.');
                    // Add any additional error handling here
                }
            }
        } else if (isError) {
            // message.error()
            console.error('Login error');
        }
      }, [isSuccess, isError, data, navigate, dispatch])
    
    
    const handleGetDetailsUser = async (id, token, role) => {
        try {
            const storage = localStorage.getItem('refresh_token')
            const refreshToken = JSON.parse(storage)
            const res = await getDetailsUser(id, token);
            if (res?.data) {
                // Extract the necessary user details here, if different from what's already in the token
                console.log("res?.data", res?.data)
                const userDetails = {
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    access_token: token, refreshToken // Assuming you want to store the token as well
                };
                dispatch(updateUser(userDetails));
                if (role === 'admin') {
                    navigate('/admin/manage-users')
                } else if (role === 'user') {
                    navigate('/')
                } else {
                    console.error("User not defined")
                }
            } else {
                console.error('No user details were returned from the service.');
            }
            
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }   

    console.log("Data exported", data)
    console.log("Data mutation", mutation)
    
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            mutation.mutate({ email, password });
        } catch (error) {
            // This will catch any error that occurs during the mutation
            // Set the login error message here
            console.error("error", error)
        }
    };

    const handleSignUp = () => {
        navigate('/sign-up')
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
                <h3>Welcome Back</h3>
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
                    <button className='button button--primary width-full' onClick={handleLogin}>Sign In</button>
                </div>
            </div>
        </div>
        <div className='signUp-right d-flex justify-content-center align-items-center'>
            <div className='signUp-rightIn d-flex justify-content-center align-items-start flex-column'>
                <div className='signUp-rightIn-text text-end width-full'>Don't Have an account?<span style={{cursor:"pointer"}} onClick={handleSignUp}>Sign Up</span></div>
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

export default SignInPage
