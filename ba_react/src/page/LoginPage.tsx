import React from 'react'
import AuthForm from '../components/AuthForm';

const LoginPage: React.FC = () => {
  return (
    <div className='w-[95%] h-[97%] flex place-content-between m-auto spac-x-7'>
      <div className='w-[70%] h-full bg-white rounded-lg shadow-lg shadow-gray-300 overflow-hidden'>

      </div>
      <div className='ml-6 flex-1 bg-sky-200 h-full rounded-lg shadow-lg shadow-gray-300 flex flex-col'>
        <AuthForm/>
      </div>
    </div>
  )
}

export default LoginPage