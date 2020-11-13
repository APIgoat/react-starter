import md5 from "md5";
import React, { FC, useState } from "react";

import Input, { useFormInput } from "../../Input";
import axios from "../../../utils/axios";
import handleApiMessages from "../../../utils/handleApiMessages";
import { setUserSession } from "../../../utils/Common";
import style from "../login.module.scss";
import { Button, SubmitBtn } from "../../Button";
import styled from "styled-components";

interface Props {
  showForgottenPassword: () => void;
}

const LoginForm: FC<Props> = ({ showForgottenPassword }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const username = useFormInput("");
  const password = useFormInput("");

  // handle button click of login form
  const handleLogin = (e: any) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    axios
      .post("Authy/auth", {
        u: username.value,
        pw: md5(password.value as string),
      })
      .then((response: any) => {
        setLoading(false);
        setUserSession(response.data.token);
        window.location.href = "/";
      })
      .catch((error) => {
        setLoading(false);
        setError(handleApiMessages(error.response));
      });
  };

  const ForgottenPwdBtn = styled(Button)`
    margin-top: 5px;
    display: flex;
    margin-left: auto;
  `;

  return (
    <form className={style.loginForm} onSubmit={handleLogin}>
      <h1>Sign In</h1>
      <Input required placeholder="Email" {...username} />

      <Input
        required
        placeholder="Password"
        type="password"
        autoComplete="new-password"
        {...password}
      >
        <ForgottenPwdBtn
          className="minimal small"
          onClick={showForgottenPassword}
        >
          Forgot Password?
        </ForgottenPwdBtn>
      </Input>

      {error && <small className="error">{error}</small>}
      <SubmitBtn type="submit" disabled={loading}>
        Sign In
      </SubmitBtn>
    </form>
  );
};

export default LoginForm;
