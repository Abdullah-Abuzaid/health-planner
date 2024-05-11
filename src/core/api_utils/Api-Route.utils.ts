import { ApiError } from "next/dist/server/api-utils";
export type ApiResponse<T> = {
  data: T | null;
  message: string | null;
  succeeded: boolean;
  status: number;
};
export default class API {
  static async get<ReturnType>(url: string): Promise<ApiResponse<ReturnType>> {
    return await fetch(url)
      .then(async (res) => {
        const result = await res.json();
        if (res.status == 200) {
          return { data: result, message: null, succeeded: true, status: 200 };
        } else {
          return {
            message: result.message,
            status: res.status,
            succeeded: false,
            data: null,
          };
        }
      })
      .catch((error) => {
        console.error(error);
        return {
          message: "An error occurred while fetching the data",
          succeeded: false,
          status: 500,
          data: null,
        };
      });
  }
  static async post<ReturnType, Parameter>(
    url: string,
    payload: Parameter
  ): Promise<ApiResponse<ReturnType>> {
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status == 200) {
          return { data: result, message: null, succeeded: true, status: 200 };
        } else {
          console.error(result);
          return {
            status: res.status,
            data: null,
            succeeded: false,
            message: result.message,
          };
        }
      })
      .catch((error) => {
        console.error(error);
        return {
          data: null,
          succeeded: false,
          message: "An error occurred while fetching the data",
          status: 500,
        };
      });
  }
}
