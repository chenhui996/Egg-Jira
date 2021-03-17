import React from "react";
import "./App.css";
import { useAuth } from "../src/context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticateApp } from "unauthenticated-app";

function App() {
  // 登陆代码写了一大堆，都是为了这一刻（可视化）
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticateApp />}
    </div>
  );
}

export default App;
