import React, { useState } from 'react'
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthForm = () => {

  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  const handleSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsSignUp(true);
  };

  const handleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsSignUp(false);
  };

  const redirectToLoginPage = () => {
    setIsSignUp(false);
  }

  return (
    <div className='w-4/5 mx-auto h-full flex flex-col'>
      <div className='mt-6 mb-6 flex place-content-between'>
        <button
          onClick={handleSignUp}
          className={`w-1/3 text-center text-2xl py-2 font-bold ${isSignUp ? 'border-b-2 text-sky-600 border-sky-600' : 'text-gray-600'}`}
        > 新規登録
        </button>
        <button
          onClick={handleSignIn}
          className={`w-1/3 text-center text-2xl py-2 font-bold ${isSignUp ? 'text-gray-600' : 'border-b-2 text-sky-600 border-sky-600'}`}
        > ログイン
        </button>
      </div>
      <div className='relative h-full overflow-hidden space-y-7 flex-1'>
        <div className={`absolute inset-0 transition-transform duration-500 transform
                        ${isSignUp ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
        >
          <SignUpForm redirectTo={redirectToLoginPage}/>
        </div>
        <div className={`absolute inset-0 transition-transform duration-500 transform
                        ${isSignUp ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}
        >
          <SignInForm/>
        </div>
      </div>
      <div className='mb-9'>
        <a href="#" className='font-bold text-gray-600 text-xl'>
          パスワードを忘れました?
        </a>
      </div>
    </div>
  )
}

export default AuthForm