import queryString from "query-string";
import React from "react";

const OAuthCallback = (props: any) => {
  const m = queryString.parse(window.location.search);
  console.log(m);
  return <p>test</p>;
};

export default OAuthCallback;
