import React from "react";
// import "./App.css";
import { useAuth } from "../src/context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticateApp } from "unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";

function App() {
  // 登陆代码写了一大堆，都是为了这一刻（可视化）
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticateApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
