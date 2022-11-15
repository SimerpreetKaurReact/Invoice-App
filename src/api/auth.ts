import { backendAPI, Company } from "./base";
import axios, { AxiosError } from "axios";

export const AuthApi = {
  login: async (params: { email: string; password: string }) => {
    try {
      const { email, password } = params;
      const response = await backendAPI.post("/login", { email, password });
      console.log("login response", response.data);

      //Json validation to make sure we get the right info back
      return response.data as Record<string, string>;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          throw new Error(`Invalid credentials ${error.response?.data}`);
        }
        if (error.message === "Network Error") {
          console.log("500");
          throw new Error("Something went wrong, please try again");

          // return onTokenInvalid?.("500");
        }
        console.log("handle errors", error);
        throw new Error(error.message);
      }
      return null;
    }
  },

  updateCompany: async (params: Company) => {
    try {
      const { name, address, vatNumber, regNumber, iban, swift } = params;
      const response = await backendAPI.put("/me/company", {
        name,
        address,
        vatNumber,
        regNumber,
        iban,
        swift,
      });
      console.log(response.data.user);

      //Json validation to make sure we get the right info back
      return response.data.user.companyDetails as Record<string, string>;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          throw new Error(`Invalid credentials ${error.response?.data}`);
        }
        if (error.message === "Network Error") {
          console.log("500");
          throw new Error("Something went wrong, please try again");

          // return onTokenInvalid?.("500");
        }
        console.log("handle errors", error);
        throw new Error(error.message);
      }
      return null;
    }
  },
  signup: async (params: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const { name, email, password, confirmPassword } = params;
      const response = await backendAPI.post("/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      console.log(response.data);

      //Json validation to make sure we get the right info back
      return response.data as Record<string, string>;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          throw new Error("Invalid credentials");
        }
        if (error.message === "Network Error") {
          console.log("500");
          throw new Error("Something went wrong, please try again");

          // return onTokenInvalid?.("500");
        }
        console.log("handle errors", error);
        throw new Error(error.message);
      }
      return null;
    }
  },
};

let requestInterceptor: number;
let responseInterceptor: number;
export const setAPIUserToken = (
  token: string,
  onTokenInvalid?: (value: string) => unknown
) => {
  backendAPI.interceptors.request.eject(requestInterceptor);
  backendAPI.interceptors.response.eject(responseInterceptor);
  requestInterceptor = backendAPI.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      console.log("interceptors running here", config);
      return {
        ...config,
        headers: {
          ...config.headers,
          "x-access-token": token,
        },
      };
    },
    function (error) {
      // Do something with request error
      if (error instanceof AxiosError) {
        console.log(error, error.response?.status, error.response?.data);
        if (error.response?.data === "Invalid Token") {
          console.log(error.response?.data);
          return onTokenInvalid?.("Invalid Token");
        }
      }
      if (error.response?.data === "Invalid Credentials") {
        console.log("Invalid Credentials");
        throw new Error("Invalid Credentials");
        // return onTokenInvalid?.("Invalid Credentials");
      }
      if (error.response?.status === 500) {
        console.log("wintinf request error", "500");
        throw new Error(error.response?.data);

        // return onTokenInvalid?.("500");
      }
      return Promise.reject(error);
    }
  );
  responseInterceptor = backendAPI.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error instanceof AxiosError) {
        console.log(error, error.response?.status, error.response?.data);
        if (error.response?.data === "Invalid Token") {
          console.log(error.response?.data);
          return onTokenInvalid?.("Invalid Token");
        }
      }
      if (error.response?.data === "Invalid Credentials") {
        console.log("Invalid Credentials");
        throw new Error("Invalid Credentials");
        // return onTokenInvalid?.("Invalid Credentials");
      }
      if (error.response?.status === 500) {
        console.log(
          "wintinf response error",
          "500",
          "error",
          error.response?.data,
          error
        );
        throw new Error(error);

        // return onTokenInvalid?.("500");
      }
      console.log("before promise reject", "500", "error", error);
      return Promise.reject(error);
    }
  );
};
