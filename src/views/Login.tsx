import React, { useState } from "react";

import style from "../components/Account/login.module.scss";
import ForgottenPasswordForm from "../components/Account/Components/ForgottenPasswordForm";
import LoginForm from "../components/Account/Components/LoginForm";
import SignInForm from "../components/Account/Components/SignInForm";

const Login = () => {
  const [form, setForm] = useState("login");

  const renderForm = () => {
    if (form === "forgotten") {
      return <ForgottenPasswordForm goBackToLogin={() => setForm("login")} />;
    } else if (form === "create") {
      return <SignInForm goBackToLogin={() => setForm("login")} />;
    }

    return <LoginForm showForgottenPassword={() => setForm("forgotten")} />;
  };

  return (
    <div className={style.loginWrapper}>
      {renderForm()}
      {form !== "forgotten" && (
        <div className={style.signUpBox}>
          {form === "create" ? "Already have an account?" : "No account?"}
          <button
            type="button"
            onClick={() => {
              setForm(form === "login" ? "create" : "login");
            }}
            className={style.createAccountBtn}
          >
            {form === "create" ? "Sign In" : "Create an Account"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
