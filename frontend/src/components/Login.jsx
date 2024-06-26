import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import{FcGoogle} from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client.ts';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log("Login Response:", response); 

    // Decode JWT token
    const decoded = jwtDecode(response.credential);
    console.log("Decoded JWT:", decoded);

    const { name, sub: googleId, picture: imageUrl } = decoded;

    localStorage.setItem('user', JSON.stringify({name, googleId, imageUrl}));

    const doc = {
      _id: googleId,
      _type: 'user',
      username: name, 
      image: imageUrl,
    };

    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', {replace: true});
    })
    .catch(error => {
      console.error('Failed to create or find the document:', error.message);
      console.log(error); 
    });
  } 

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video src={shareVideo} 
        type = "video/mp4"
        loop
        controls = {false}
        muted
        autoPlay
        className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
              <img src={logo} width="130px" alt="logo"/>
          </div>

          <div className='shadow-2xl'>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={renderProps => ( 
                <button 
                  type='button'
                  className="bg-mainColor flex items-center justify-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick} // This will trigger the login process
                  disabled={renderProps.disabled} // This will be true when the authentication library is initializing
                >
                  <FcGoogle className="mr-4" size={24} /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy='single_host_origin'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login