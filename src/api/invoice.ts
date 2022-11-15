import { AxiosError } from "axios";
import { CreateInvoice } from "../invoice/CreateInvoiceForm";
import { responseObject } from "../invoice/CreateInvoiceFormContainer";
import { backendAPI } from "./base";

export interface InvoiceResponseObject {
  invoice_number: string;
  client_id: string;
  date: number;
  dueDate: number;
  projectCode: string | undefined;
  meta: {
    items: {
      price: number;
      description: string;
    }[];
  };
  value: number;
}
export const InvoiceApi = {
  createInvoice: async (params: InvoiceResponseObject) => {
    try {
      const response = await backendAPI.post("/invoices", params);
      console.log("Invoice creation response", response.data);

      //Json validation to make sure we get the right info back
      return response.data as Record<string, string>;
    } catch (error) {
      console.log(error, "in create Invoice");
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
  updateInvoice: async (params: InvoiceResponseObject) => {
    try {
      const response = await backendAPI.put("/invoices", params);
      console.log("Invoice creation response", response.data);

      //Json validation to make sure we get the right info back
      return response.data as Record<string, string>;
    } catch (error) {
      console.log(error, "in update Invoice");
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
  getInvoiceById: async (params: { invoiceId: string }) => {
    try {
      const response = await backendAPI.get(`/invoices/${params.invoiceId}`);
      console.log("Invoice fetch response", response.data, params);

      //Json validation to make sure we get the right info back
      return response.data.invoice as responseObject;
    } catch (error) {
      console.log(error, "in create Invoice");
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
