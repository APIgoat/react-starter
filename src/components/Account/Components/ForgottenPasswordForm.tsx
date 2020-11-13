import React, { FC, Fragment, useState } from "react";
import cx from "classnames";
import Input, { useFormInput } from "../../Input";
import axios from "../../../utils/axios";
import handleApiMessages from "../../../utils/handleApiMessages";
import style from "../login.module.scss";
import { Button } from "../../Button";
import { Icon } from "@blueprintjs/core";

interface Props {
  goBackToLogin: () => void;
}

const ForgottenPassword: FC<Props> = ({ goBackToLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);
  const username = useFormInput("");

  const handleForgottenPwd = (e: any) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    axios
      .post("ApiGoat/sendEmail", {
        email: username.value,
        template_name: "Forgotten password email",
        debug: true,
      })
      .then((response: any) => {
        setLoading(false);
        setError(null);
        setMessage(handleApiMessages(response));
      })
      .catch((error) => {
        setLoading(false);
        setError(handleApiMessages(error.response));
      });
  };

  return (
    <form className={style.loginForm} onSubmit={handleForgottenPwd}>
      <h1>Forgotten Password</h1>
      {message && <small className="message">{message}</small>}
      {!message && (
        <Fragment>
          <p>
            Enter your email and we'll send you a link to reset your password
          </p>
          <Input required placeholder="Email" {...username} />

          {error && <small className="error">{error}</small>}
          <button className={style.submitBtn} type="submit" disabled={loading}>
            Send Email
          </button>
        </Fragment>
      )}
      <Button
        className={cx("minimal", "small", style.backBtn)}
        onClick={() => goBackToLogin()}
        disabled={loading}
      >
        <Fragment>
          <Icon icon="chevron-left" />
          <span>Back to login</span>
        </Fragment>
      </Button>
    </form>
  );
};

export default ForgottenPassword;
