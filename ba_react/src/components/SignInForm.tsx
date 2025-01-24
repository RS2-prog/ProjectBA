import React, { useState } from 'react'
import Input from './Input'
import Button from './Button';
import api from '../api/api';

interface LoginResponse {
  access: string;
}

const SignInForm = () => {
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post<LoginResponse>('/accounts/login/', { email, password });
      const access = response.data.access;
      localStorage.setItem('access', access);
      window.location.href = '/mystudents';
    } catch (error) {
      alert('ログインに失敗しました');
    }
  };

  return (
    <form 
      onSubmit={handleLogin}
      className='flex flex-col'
    >
      <div className='mb-4 mt-10'>
        <label
          className='block text-sm font-medium text-gray-600'
        >メールアドレス</label>
        <Input
          type='text'
          name='email'
          value={email}
          placeholder='mail@address.com'
          autocomplete='sign-in-email'
          onChange={onChangeEmail}
        />
      </div>
      <div className='mb-4 mt-10'>
        <label
          className='block text-sm font-medium text-gray-600'
        >パスワード</label>
        <Input
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          onChange={onChangePassword}
          autocomplete='sign-in-password'
        />
      </div>
      <div className='mb-4 mt-10 h-9'>
        <Button
          text='Sign In'
          type='submit'
        />
      </div>
    </form>
  )
}

export default SignInForm