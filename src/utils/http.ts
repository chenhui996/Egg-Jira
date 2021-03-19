import { useAuth } from "./../context/auth-context";
import qs from "qs";
import * as auth from "auth-provider";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

// 由于 data 和 token 不属于 RequestInit，也就是不属虚 fetch 标准的 API。
// 所以需要拓展类型
interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig, // 若是 post请求，将会用 customConfig 覆盖 get 请求，故写在后面
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // 未登录或服务端失效
        await auth.logout();
        window.location.reload();
        return Promise.reject({
          message: "请重新登陆",
        });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
