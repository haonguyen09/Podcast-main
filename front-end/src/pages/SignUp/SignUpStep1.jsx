import React, { useEffect, useRef, useState } from 'react'
import CheckBoxCustom from '../../components/CheckBoxCustom'
import { getObjectFromLocalStorage, updateObjectInLocalStorage } from '../../utils/handleLocalStorage'
import { createUser } from '../../services/UserService'

const SignUpStep1 = (props) => {

  const { currentStep, handleStepChange } = props
  
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const avatarRef = useRef(null);

  const data = getObjectFromLocalStorage('signUpData');

  useEffect(() => {
    if (data) {
      setEmail(data.email)
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setAvatarPreview(data.avatarPreview || '');
    }
  }, [])
  
  const handleNext = async () => {
    const avatarFile = avatarRef.current.files[0]
    handleStepChange(currentStep + 1);
    
    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", data.password)
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("image", avatarFile)
    formData.append("role", "user")
    const response = await createUser(formData)
    console.log("response", response)
    updateObjectInLocalStorage('signUpData', { id: response.data._id ,email: email, firstName: firstName, lastName: lastName, avatar: avatarFile, avatarPreview: avatarPreview });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(file.name);
        setAvatarPreview(reader.result);
        updateObjectInLocalStorage('signUpData', { ...data, avatar: file.name, avatarPreview: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setAvatar('');
      setAvatarPreview('');
    }
  };

  return (
    <div  className='signUp-s1-main'>
      <div class="signUp-s1-info d-grid">
          <div>
              <h4>First Name</h4>
              <input type='text' placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)}/>
          </div>
          <div>
              <h4>Last Name</h4>
              <input type='text' placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)}/>
          </div>
          <div>
              <h4>Email</h4>
              <input type='text' placeholder='Your Email' value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div>
            <h4>Avatar</h4>
            <div class="signUp-s1-avatar d-flex">
              <input type='file' className='signUp-s1-avatarInput' ref={avatarRef} onChange={handleAvatarChange} />
              {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" style={{ width: '100px', height: '100px' }} />}
            </div>
          </div>
      </div>
      <div className='d-flex'>
        <CheckBoxCustom />
        <p className='signUp-s1-checkbox'>By continuing to the next step, you agree to gocast’s <span>privacy policy</span> and <span>terms of use</span></p>
      </div>
      <button className='button button--primary signUp-s1-button' onClick={handleNext}>Next</button>
  </div>
  )
}

export default SignUpStep1
