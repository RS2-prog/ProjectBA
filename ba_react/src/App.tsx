//import React from "react";
import { useRoutes } from "react-router-dom";
import routes from './routes/routes'
import Header from "./layouts/Header";
import ErrorList from "./layouts/ErrorList";

function App() {
  return (
    <div className="w-full h-full flex flex-col">
      <ErrorList/>
      <Header/>
      <main className="flex-1 bg-sky-50 overflow-auto justify-center flex items-center">
        {useRoutes(routes)}
      </main>
    </div>
  );
}

export default App;
