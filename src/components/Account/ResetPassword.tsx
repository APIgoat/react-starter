import { Icon, Intent, Spinner } from "@blueprintjs/core";
import cx from "classnames";
import md5 from "md5";
import * as QueryString from "query-string";
import React, { Fragment, useEffect, useState } from "react";

import { Button } from "../Button";
import axios from "../../utils/axios";
import handleApiMessages from "../../utils/handleApiMessages";
import Input, { useFormInput } from "../Input";

import style from "./login.module.scss";

const ResetPassword = (props: any) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);
  const [validationKey, setValidationKey] = useState(false);
  const password = useFormInput("");
  const confirmPassword = useFormInput("");

  const updateAuthy = (user: any) => {
    setError(null);
    setLoading(true);
    axios
      .post(`ApiGoat/reset/${validationKey}`, {
        passwd_hash: md5(password.value as string),
      })
      .then((response: any) => {
        setLoading(false);
        setMessage("Good job! You can login now.");
        // hide the input and button
      })
      .catch((error) => {
        setLoading(false);
        setError(handleApiMessages(error.response));
      });
  };

  useEffect(() => {
    const params = QueryString.parse(props.location.search);
    setError(null);
    setLoading(true);
    if (params?.validationKey) {
      setValidationKey(!!params?.validationKey);
      axios
        .post("Authy", {
          query: {
            select: ["validation_key", "id_authy", "email"],
            filter: {
              Authy: [["validation_key", params?.validation_key]],
            },
            table: "authy",
            limit: 1,
          },
          debug: true,
        })
        .then((response: any) => {
          setLoading(false);
          if (response.data.data?.[0]) {
            setUser(response.data.data?.[0]);
          } else {
            setError("The Validation Key is invalid");
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(handleApiMessages(error.response));
          setLoading(false);
        });
    } else {
      setError("The Validation Key is invalid");
      setLoading(false);
    }
  }, [props.location]);

  const validate = () => {
    if (password.value !== confirmPassword.value) {
      setError("Password and Confirm Password must match");
    } else {
      setError(null);
    }
  };

  // weird that this is a submit ...
  return (
    <div className={style.loginWrapper}>
      {loading && (
        <div className="projects-loading">
          <Spinner intent={Intent.PRIMARY} />
        </div>
      )}
      <form className={style.loginForm}>
        <h1>Reset Password</h1>
        {!user && !loading && <small className="error">{error}</small>}
        {user && (
          <Fragment>
            <Input
              required
              type="password"
              placeholder="Password"
              onBlur={validate}
              {...password}
              autoComplete="new-password"
            />
            <Input
              required
              type="password"
              placeholder="Confirm Password"
              {...confirmPassword}
              onKeyUp={validate}
              autoComplete="new-password"
            />
            {message && <small className="message">{message}</small>}
            {error && <small className="error">{error}</small>}
            <button
              className={style.submitBtn}
              type="button"
              disabled={loading || error}
              onClick={updateAuthy}
            >
              Save
            </button>
          </Fragment>
        )}

        <Button
          className={cx("minimal", "small", style.backBtn)}
          onClick={() => props.history.push("/login")}
          disabled={loading}
        >
          <Fragment>
            <Icon icon="chevron-left" />
            <span>Back to login</span>
          </Fragment>
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
