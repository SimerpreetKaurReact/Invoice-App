import axios, { AxiosError } from "axios";
import { InvoiceGroup } from "../../pages/invoices";
export interface Company {
  name: string;
  address: string;
  vatNumber: string;
  regNumber: string;
  iban: string | undefined;
  swift: string | undefined;
}
export interface Client {
  user_id: string;
  email: string;
  name: string;
  companyDetails: Company;
  id: string;
  totalBilled: number;
  invoicesCount: number;
}
export interface InvoiceDTO {
  client: {
    companyDetails: {
      name: string;
      vatNumber: string;
      regNumber: string;
      address: string;
    };
    email: string;
    id: string;
    name: string;
    user_id: string;
  };
  invoice: {
    client_id: string;
    date: number;
    dueDate: number;
    id: string;
    invoice_number: string;
    user_id: string;
    value: number;
    createdAt: number;
  };
}

export const backendAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchClients = async (params?: {
  page?: number;
  sortBy?: string;
  sort?: string;
  limit?: number;
}) => {
  try {
    const { page = 1 } = params ?? {};
    //page=1=> 0, limit5
    //page=2=>5,limit 5
    //page=3=>10,limit 5
    const queryParams = {
      sort: params?.sort,
      sortBy: params?.sortBy,
      limit: params?.limit ?? "5",
      offset: ((page - 1) * 5).toString(),
    };
    const response = await backendAPI.get<{ clients: Client[]; total: number }>(
      `/clients?${new URLSearchParams(
        queryParams as Record<string, string>
      ).toString()}`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log("handle specific axios err", err);
    } else {
      console.log("handle generic error", err);
    }
  }
};

export const fetchInvoices = async (params?: {
  page: number;
  sortBy?: string;

  sort?: string;
  limit?: number;
  clientId?: string;
}) => {
  try {
    const { page = 1 } = params ?? {};
    //page=1=> 0, limit5
    //page=2=>5,limit 5
    //page=3=>10,limit 5
    const queryParams = {
      ...params,
      limit: params?.limit ?? "5",
      offset: ((page - 1) * 5).toString(),
    };
    console.log("within fetchInvoices", queryParams);
    const response = await backendAPI.get<InvoiceGroup>(
      `/invoices?${new URLSearchParams(
        queryParams as Record<string, string>
      ).toString()}`
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log("handle specific axios err", err);
    } else {
      console.log("handle generic error", err);
    }
    return null;
  }
};
export const updateCompany = async () => {
  try {
    const response = await backendAPI.put<{ company: Company[] }>(
      "/me/company"
    );
    console.log(response.data);
    return response.data.company;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log("handle specific axios err", err);
    } else {
      console.log("handle generic error", err);
    }
  }
};
