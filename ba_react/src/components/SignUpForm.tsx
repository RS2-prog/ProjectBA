import React, { useState } from 'react'
import Input from './Input'
import Button from './Button';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ApiErrorResponse } from '../types/ApiErrorResponse';

interface Errors {
  [key: string]: string[];
}

type SignUpFormProps = {
  redirectTo: () => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ redirectTo }) => {

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm_password, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/accounts/register/', 
        { email, username, password, confirm_password });
      
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      redirectTo();
      navigate('/login');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (error instanceof AxiosError && error.response && error.response.data) {
        const apiError: ApiErrorResponse = error.response.data;
        setErrors(apiError.errors);
      } else {
        setErrors({ global: ['サーバーエラーが発生しました'] });
      }
    }
  };

  return (
    <form className='flex flex-col' onSubmit={handleRegister}>
      <div className='mb-4 mt-8'>
        <label
          className='block text-sm font-medium text-gray-600'
        >メールアドレス</label>
        <Input
          type='text'
          name='email'
          value={email}
          placeholder='mail@address.com'
          autocomplete='sign-up-email'
          onChange={onChangeEmail}
          errors={errors}
        />
      </div>
      <div className='mb-4 mt-8'>
        <label
          className='block text-sm font-medium text-gray-600'
        >名前</label>
        <Input
          type='text'
          name='username'
          value={username}
          placeholder='ゲーム内の名前'
          autocomplete='sign-up-username'
          onChange={onChangeUsername}
          errors={errors}
        />
      </div>
      <div className='mb-4 mt-8'>
        <label
          className='block text-sm font-medium text-gray-600'
        >パスワード</label>
        <Input
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          autocomplete='sign-up-password'
          onChange={onChangePassword}
          errors={errors}
        />
      </div>
      <div className='mb-4 mt-8'>
        <label
          className='block text-sm font-medium text-gray-600'
        >パスワード(確認用)</label>
        <Input
          type='password'
          name='confirm_password'
          value={confirm_password}
          placeholder='Confirm Password'
          autocomplete='sign-up-confirmpassword'
          onChange={onChangeConfirmPassword}
          errors={errors}
        />
      </div>
      <div className='mb-4 mt-8 h-9'>
        <Button
          text='Sign Up'
          type='submit'
        />
      </div>
    </form>
  )
}

export default SignUpForm