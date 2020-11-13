import { Icon } from "@blueprintjs/core";
import cx from "classnames";
import md5 from "md5";
import React, { FC, Fragment, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import axios from "../../../utils/axios";
import { validateEmail } from "../../../utils/form.util";
import handleApiMessages from "../../../utils/handleApiMessages";
import Input, { useFormInput } from "../../Input";
import { Button } from "../../Button";
import style from "../login.module.scss";

interface Props {
  goBackToLogin: () => void;
}

const SignIn: FC<Props> = ({ goBackToLogin }) => {
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const confirmPassword = useFormInput("");
  const [error, setError] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);

  const validateRegister = () => {
    if (password.value !== confirmPassword.value) {
      setError("Password and Confirm Password must match");
    } else {
      setError(null);
    }
  };

  /**
   * Registration requests: create user and send email
   */
  const handleRegister = (e: any) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (validateEmail(username.value as string)) {
      axios
        .post("Authy", {
          email: username.value,
          passwd_hash: md5(password.value as string),
          id_authy_group: 1,
        })
        .then((response: any) => {
          setLoading(false);
          // send confirmation email
          axios
            .post("ApiGoat/sendEmail", {
              email: username.value,
              template_name: "Confirm your email",
              debug: true,
            })
            .then((response: any) => {
              setLoading(false);
              if (response.data.status === "success") {
                setMessage(
                  "An email has been sent to you to confirm your email and activate your account."
                );
              }
            })
            .catch((error) => {
              setLoading(false);
              setError(handleApiMessages(error.response));
            });
        })
        .catch((error) => {
          setLoading(false);
          setError(handleApiMessages(error.response));
        });
    } else {
      setLoading(false);
      setError("Tis email is not valid, try again!");
    }
  };

  return (
    <form className={style.loginForm} onSubmit={handleRegister}>
      <h1>Register</h1>
      {!message && (
        <Fragment>
          <Input required placeholder="Email" {...username} />

          <Input
            required
            placeholder="Password"
            onBlur={validateRegister}
            type="password"
            {...password}
          />
          <PasswordStrengthBar
            className={style.passwordStrengthBar}
            password={password.value as string}
          />
          <Input
            required
            placeholder="Confirm password"
            onKeyUp={validateRegister}
            type="password"
            autoComplete="new-password"
            {...confirmPassword}
          />

          {error && <small className="error">{error}</small>}
          <button className={style.submitBtn} type="submit" disabled={loading}>
            Register
          </button>
        </Fragment>
      )}
      {message && (
        <Fragment>
          <small className="message">{message}</small>
          <Button
            className={cx("minimal", style.backBtn)}
            onClick={goBackToLogin}
            disabled={loading}
          >
            <Fragment>
              <Icon icon="chevron-left" />
              <span>Back to login</span>
            </Fragment>
          </Button>
        </Fragment>
      )}
    </form>
  );
};

export default SignIn;
