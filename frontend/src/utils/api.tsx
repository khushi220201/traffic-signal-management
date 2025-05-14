import axios from "axios";
const endPoint = process.env.REACT_APP_BASE_URL;

const configApi = (flag = false) => {
  return {
    headers: {
      "Content-Type": flag ? "multipart/form-data" : "application/json",
    },
    method: "PUT,DELETE,POST,GET",
  };
};

export const postApi = (url: string, data: any) => {
  return axios.post(`${endPoint}${url}`, data, configApi());
};

export const getApi = (url?: string, params?: any) => {
	return axios.get(`${endPoint}${url}`, {
		params: params,
		...configApi(),
	});
};
