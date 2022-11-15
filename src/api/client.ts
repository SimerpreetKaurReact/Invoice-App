import { AxiosError } from "axios";
import { CreateClient } from "../clients/CreateClientForm";
import { responseObject } from "../clients/CreateClientFormContainer";
import { backendAPI } from "./base";

export const ClientApi = {
  createClient: async (params: CreateClient) => {
    try {
      const response = await backendAPI.post("/clients", params);
      console.log("client creation response", response.data);

      //Json validation to make sure we get the right info back
      return response.data as Record<string, string>;
    } catch (error) {
      console.log(error, "in create client");
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
      throw new Error(error);
    }
  },
  updateClient: async (params: responseObject) => {
    try {
      const response = await backendAPI.put("/clients", params);
      console.log("client creation response", response.data);

      //Json validation to make sure we get the right info back
      return response.data as Record<string, string>;
    } catch (error) {
      console.log(error, "in create client");
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
      throw new Error(error);
    }
  },
  getClientById: async (params: { clientId: string }) => {
    try {
      const response = await backendAPI.get(`/clients/${params.clientId}`);
      console.log("client fetch response", response.data);

      //Json validation to make sure we get the right info back
      return response.data.client as responseObject;
    } catch (error) {
      console.log(error, "in create client");
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
      throw new Error(error);
    }
  },
};
