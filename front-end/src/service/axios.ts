import axios from "axios";
import { SYSTEM_CONFIG } from "../shared/constant";

export const Method = { POST: "post", GET: "get", PUT: "put" };

function addParamsToURL(url: any, params: string) {
  if (params) {
    let temp = url;
    temp = temp + "/" + params;
    return temp;
  }
  return url;
}

const getHeaders = async (token: null, adHeaders: any) => {
  if (token !== null) {
    return {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...adHeaders,
      },
    };
  } else {
    return {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...adHeaders,
      },
    };
  }
};

export default async function api(
  method: any,
  header: null,
  endPoint: string | number,
  token: null,
  body: any,
  params: any
) {
  let customURL = addParamsToURL(SYSTEM_CONFIG.SERVER_URI + endPoint, params);
  let headers = await getHeaders(token, header === null ? {} : header);
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: customURL,
      data: body,
      headers: headers.headers,
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error.response);
      });
  });
}
