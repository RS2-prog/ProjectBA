import React, { useEffect, useState } from 'react'
import api from '../api/api';
import { useError } from '../context/ErrorContext';
import Input from '../components/Input';
import Button from '../components/Button';

type TeacherInfo = {
  username: string;
  friend_code: string;
}

const TeacherPage: React.FC = () => {
  // 状態管理
  // 先生情報
  const [teacher, setTeacher] = useState<TeacherInfo>({username:'', friend_code:''});
  const [originTeacher, setOriginTeacher] = useState<TeacherInfo>({username:'', friend_code:''});
  // 表示モード
  const [displayMode, setDisplayMode] = useState<boolean>(true);
  // エラー管理
  const {addError} = useError();

  // モード切り替え
  const switchMode = () => {
    setDisplayMode(!displayMode);
  }

  // 編集内容ハンドル
  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTeacher = { ...teacher, [event.target.name]: event.target.value };
    setTeacher(updatedTeacher);
  };

  // 編集内容チェック
  const validChanges = (teacher: TeacherInfo) => {
    if (!teacher.username) {
      addError("名前は必須項目です");
      return false;
    }
    if (teacher.friend_code.length !== 8) {
      addError("8桁のフレンドコードをご入力ください");
      return false;
    }
    return true;
  };

  // 編集内容保存
  const applyChanges = async () => {
    if (!validChanges(teacher)) {
      return;
    }
    try {
      const response = await api.post('/accounts/detail/', teacher);
      getTeacherDetail();
      switchMode();
    } catch (error) {
      addError(String(error));
    }
  };

  // 先生情報取得
  const getTeacherDetail = async () => {
    try {
      const responseData = await api.get('/accounts/detail/');
      setTeacher({username: responseData.data.username, friend_code: responseData.data.friend_code});
      setOriginTeacher({username: responseData.data.username, friend_code: responseData.data.friend_code});
    } catch (error) {
      addError("先生情報の取得に失敗しました");
    }
  };

  useEffect(() => {
    getTeacherDetail();
  }, []);

  return (
    <div className='w-[95%] h-[95%] m-auto flex'>
      <div className='w-1/3 h-full py-8 my-auto shadow-lg rounded-lg bg-white flex flex-col place-content-between'>
        <div className='h-3/5 w-2/3 flex flex-col mx-auto'>
          <div className='h-1/4 flex items-center'>
            <div className='p-2 text-2xl font-bold text-gray-600 border-b-[3px] border-sky-400'>
              名前
            </div>
          </div>
          <div className='h-1/4 w-full py-4 flex items-center'>
            {displayMode ? (
              <div className='text-2xl p-2'>
                {teacher.username}
              </div>
            ) : (
              <Input
                type='text'
                name='username'
                value={teacher.username}
                placeholder=''
                onChange={handleChanges}
              />
            )}
          </div>
          <div className='h-1/4 flex items-center'>
            <div className='p-2 text-2xl font-bold text-gray-600 border-b-[3px] border-sky-400'>
              フレンドコード
            </div>
          </div>
          <div className='h-1/4 w-full py-4 flex items-center'>
            {displayMode ? (
              <div className='text-2xl p-2'>
                {teacher.friend_code}
              </div>
            ) : (
              <Input
                type='text'
                name='friend_code'
                value={teacher.friend_code}
                placeholder=''
                onChange={handleChanges}
              />
            )}
          </div>
        </div>
        {displayMode ? (
          <div className='w-2/3 flex items-center mx-auto'>
            <Button
              text='編集'
              type='button'
              onClick={switchMode}
            />
          </div>
        ) : (
          <div className='w-2/3 flex items-center place-content-between mx-auto'>
            <Button
              text='取り消し'
              type='button'
              onClick={() => {switchMode(); setTeacher(originTeacher)}}
            />
            <Button
              text='保存'
              type='button'
              onClick={applyChanges}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TeacherPage;
