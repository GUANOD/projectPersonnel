const mainConfig = {
  PORT: "http://localhost:8080",
};

export const httpConfig = (method, token) => {
  return {
    method: method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": mainConfig.PORT,
      Authorization: token,
    },
  };
};

export default mainConfig;
