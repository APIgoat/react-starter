import { Button, Intent, Spinner } from "@blueprintjs/core";
import * as QueryString from "query-string";
import React, { Fragment, useEffect, useState } from "react";

import axios from "../../utils/axios";
import handleApiMessages from "../../utils/handleApiMessages";

import style from "./login.module.scss";

const ConfirmEmail = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [message, setMessage] = useState<string>("Looking...");

  const updateAuthy = (validation_key: any) => {
    setError(null);
    setLoading(true);
    axios
      .patch(`Authy`, {
        query: {
          filter: {
            Authy: [["validation_key", validation_key]],
          },
        },
        validation_key: "",
        deactivate: "No",
      })
      .then((response: any) => {
        if (response.data.status === "success") {
          setMessage("Congrats, you can login now!");
        } else {
          setError(handleApiMessages(response));
          setMessage("Oups, something is not right with your key!");
        }
      })
      .catch((error) => {
        console.log(error);
        setError(handleApiMessages(error.response));
        setMessage("Oups!");
      });
  };

  useEffect(() => {
    const params = QueryString.parse(props.location.search);
    setError(null);
    setLoading(true);
    if (params?.validationKey) {
      axios
        .post("Authy", {
          query: {
            select: ["validation_key", "id_authy", "username"],
            filter: {
              Authy: [["validation_key", params?.validationKey]],
            },
            table: "authy",
            limit: 1,
          },
          debug: true,
        })
        .then((response: any) => {
          if (response?.data?.data?.[0]?.id_authy) {
            updateAuthy(response.data.data[0].validation_key);
            setLoading(false);
          } else {
            setLoading(false);
            setMessage("Oups, your key is invalid!");
          }
        })
        .catch((error) => {
          setError(handleApiMessages(error.response));
          setLoading(false);
          setMessage("Oups!");
        });
    } else {
      setError("Oups, your key is missing!");
    }
  }, [props.location]);

  return (
    <div className={style.loginWrapper}>
      {loading && (
        <div className="projects-loading">
          <Spinner intent={Intent.PRIMARY} />
        </div>
      )}
      <form className={style.loginForm} onSubmit={updateAuthy}>
        <h1>{message}</h1>
        {!loading && <small className="error">{error}</small>}
        <Fragment>{error && <small className="error">{error}</small>}</Fragment>

        <Button
          minimal
          small
          className={style.backBtn}
          icon="chevron-left"
          onClick={() => props.history.push("/login")}
          disabled={loading}
        >
          Back to login
        </Button>
      </form>
    </div>
  );
};

export default ConfirmEmail;
