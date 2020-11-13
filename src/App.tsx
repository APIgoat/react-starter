import { Icon, Intent, Spinner } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";
import ConfirmEmail from "./components/Account/ConfirmEmail";
import ResetPassword from "./components/Account/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import axios, { getToken } from "./utils/axios";
import { getUser, removeUserSession, setUserSession } from "./utils/Common";
import HomePage from "./views/HomePage";
import Login from "./views/Login";

const App = () => {
  const [authLoading, setAuthLoading] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(false);
  const currentUser = getUser();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get("ApiGoat/account")
      .then((response) => {
        setUserSession(token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get("ApiGoat/account")
      .then((response) => {
        setUserSession(token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, [forceUpdate]);

  if (authLoading && getToken()) {
    return (
      <div className="projects-loading">
        <Spinner intent={Intent.PRIMARY} />
      </div>
    );
  }

  const handleLogout = () => {
    delete axios.defaults.headers.common["Authorization"];
    removeUserSession();
    setForceUpdate(!forceUpdate);
  };

  return (
    <div className="app">
      {currentUser && (
        <div className="header">
          <button type="button" className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <div className="content">
        {getToken() && (
          <div>
            <button onClick={() => removeUserSession()}>
              <Icon icon="log-out" />
            </button>
          </div>
        )}
        <Router>
          <Switch>
            <PublicRoute path="/reset-password" component={ResetPassword} />
            <PublicRoute path="/confirm" component={ConfirmEmail} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/" component={HomePage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
