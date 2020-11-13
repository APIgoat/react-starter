import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "../utils/axios";

interface Props {
  component: any;
  path: string;
}

// handle the public routes
const PublicRoute: FC<Props> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/dashboard" }} />
        )
      }
    />
  );
};

export default PublicRoute;
