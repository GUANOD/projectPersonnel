import mainConfig, { httpConfig } from "./config";
import routes from "./routes";

export const getContent = (ufbody = {}, token) => {
  //  ufBody should contain an 'options' object
  // typsecript would be great here
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(ufbody);
    const req = { ...httpConfig("POST", token), body };
    fetch(mainConfig.PORT + routes.content.read, req)
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          reject(data.err);
        }
        resolve(data.res);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};
