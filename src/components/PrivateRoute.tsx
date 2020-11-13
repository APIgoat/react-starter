import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "../utils/axios";

interface Props {
  component: any;
  path: string;
}

// handle the private routes
const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
