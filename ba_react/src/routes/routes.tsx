import React from "react";
import { RouteObject } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import RedirectIfLoggedIn from "./RedirectIfLoggedIn";
import RequireAuth from "./RequireAuth";
import StudentPage from "../page/StudentPage";
import TempPage from "../page/TempPage";
import StudentRegisterPage from "../page/StudentRegisterPage";
import HelperSettingPage from "../page/HelperSettingPage";
import HelperSearchPage from "../page/HelperSearchPage";

const routes: RouteObject[] = [
  {
    path: '/suketto/setting',
    element: (
      <RequireAuth redirectTo="/login">
        <HelperSettingPage />
      </RequireAuth>
    ),
  },
  {
    path: '/mystudents/register',
    element: (
      <RequireAuth redirectTo="/login">
        <StudentRegisterPage />
      </RequireAuth>
    ),
  },
  {
    path: '/mystudents',
    element: (
      <RequireAuth redirectTo="/login">
        <StudentPage />
      </RequireAuth> 
    ),
  },
  {
    path: '/login',
    element: (
      <RedirectIfLoggedIn redirectTo="/home">
        <LoginPage />
      </RedirectIfLoggedIn>
    ),
  },
  {
    path: '/suketto/search',
    element: <HelperSearchPage/>,
  },
  {
    path: '*',
    element: <TempPage/>,
  },
];

export default routes;