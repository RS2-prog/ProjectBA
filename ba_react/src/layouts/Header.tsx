import React, { useContext, useState } from "react";
import Button from "../components/Button";
import TabButton from "./TabButton";
import SearchBarH from "./SearchBarH";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const tabs = [
  {path: "/top", label: "トップ"},
  {path: "/mystudents", label: "生徒"},
  {path: "/suketto/setting", label: "助っ人"},
]

const Header = () => {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  if (!authContext) {
    throw new Error('AuthContext is undefined. Make sure you are using the AuthProvider.');
  }
  const { isLoggedIn, logout } = authContext;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [searchValue, setSearchValue] = useState<string>('');
  const [contentValue, setContentValue] = useState<string>('a');

  const handleSelected = (event: React.MouseEvent<HTMLButtonElement>)  => {
    if (event.target instanceof HTMLButtonElement) {
      navigate(event.target.name);
    }
  };

  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  const handleContentValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setContentValue(event.target.value);
  }

  return (
    <header className="w-full h-28 pt-3 border-b-2 boder-sky-200 sticky flex flex-col bg-sky-50 shrink-0 top-0">
      <div className="flex w-11/12 m-auto place-content-between">
        <div className="flex">
          <p className="text-sky-600 font-extrabold text-3xl italic">Blue</p>
          <p className="text-gray-600 font-extrabold text-3xl italic">Appointment</p>
        </div>
        <SearchBarH
          contentValue={contentValue}
          searchValue={searchValue}
          onContentChange={handleContentValue}
          onSearchChange={handleSearchValue}
        >
          <option value="a" className="text-center text-gray-600">総力戦/大決戦</option>
          <option value="b" className="text-center text-gray-600">合同火力演習</option>
          <option value="c" className="text-center text-gray-600">占領戦</option>
          <option value="d" className="text-center text-gray-600">制約解除決戦</option>
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