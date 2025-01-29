import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import TabButton from "./TabButton";
import SearchBarH from "./SearchBarH";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const tabs = [
  {path: "/sensei", label: "先生"},
  {path: "/mystudents", label: "生徒"},
  {path: "/suketto/setting", label: "助っ人"},
];

const Header = () => {
  // ログイン状態管理
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  if (!authContext) {
    throw new Error('AuthContext is undefined. Make sure you are using the AuthProvider.');
  }
  const { isLoggedIn, logout } = authContext;

  // ログアウト処理
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 状態管理
  // 検索パラメータ
  const [searchValue, setSearchValue] = useState<string>('');
  const [contentValue, setContentValue] = useState<string>('1');
  // 検索サジェスト
  const [suggestNames, setSuggestNames] = useState<string[]>([]);

  // タブ選択
  const handleSelected = (event: React.MouseEvent<HTMLButtonElement>)  => {
    if (event.target instanceof HTMLButtonElement) {
      navigate(event.target.name);
    }
  };

  // 検索変更、実行
  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  const handleContentValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setContentValue(event.target.value);
  }

  const handleSearchClick = () => {
    const url = `/suketto/search?name=${searchValue}&content=${contentValue}`;
    const curl = window.location.pathname + window.location.search;
    if (url === curl) {
      window.location.reload();
    } else {
      navigate(url);
    }
  }

  // サジェスト取得
  const getStudentNames = async () => {
    try {
      const response = await api.get('/students/get_student_names/');
      console.log(response.data)
      setSuggestNames(response.data);
    } catch (error) {
      console.log("サジェストの取得に失敗しました");
    }
  }

  useEffect(() => {
    getStudentNames();
  }, []);

  return (
    <header className="w-full h-28 pt-3 border-b-2 boder-sky-200 sticky flex flex-col bg-sky-50 shrink-0 top-0 z-50">
      <div className="flex w-11/12 m-auto place-content-between">
        <div className="flex">
          <p className="text-sky-600 font-extrabold text-3xl italic">Blue</p>
          <p className="text-gray-600 font-extrabold text-3xl italic">Appointment</p>
        </div>
        <SearchBarH
          contentValue={contentValue}
          searchValue={searchValue}
          suggestions={suggestNames}
          onContentChange={handleContentValue}
          onSearchChange={handleSearchValue}
          onClick={handleSearchClick}
        >
          <option value="1" className="text-center text-gray-600">総力戦/大決戦</option>
          <option value="2" className="text-center text-gray-600">合同火力演習</option>
          <option value="3" className="text-center text-gray-600">占領戦</option>
          <option value="4" className="text-center text-gray-600">制約解除決戦</option>
        </SearchBarH>
        {isLoggedIn? (
          <Button text='ログアウト' type='button' onClick={handleLogout}/>
        ) : (
          <Button text='ログイン' type='button'/>
        )}
        
      </div>
      <div className="w-full bg-sky-200 mt-3">
        <div className="flex w-11/12 m-auto">
          {tabs.map((tab, index) => (
            <TabButton
              key={index}
              path={tab.path}
              label={tab.label}
              onClick={handleSelected}
            />
          ))}
        </div>
      </div>  
    </header>
  );
};

export default Header;