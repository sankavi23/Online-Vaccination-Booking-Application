const SYSTEM_CONFIG = {
  SERVER_URI: "http://localhost:4001/covid-vaccination/api/v1",
};
let user = JSON.parse(localStorage.getItem("user"));
console.log({ user });

const UTILS = {
  HOS_ID: user?.id,
  USER_ID: user?.id
};
export { SYSTEM_CONFIG, UTILS };
