import { ApiError } from "next/dist/server/api-utils";
type ApiResponse<T> = {
  data: T;
  message: string | null;
  succeeded: boolean;
};
export default class API {
  static async get<ReturnType>(url: string): Promise<ApiResponse<ReturnType>> {
    return await fetch(url)
      .then(async (res) => {
        const result = await res.json();
        if (res.status == 200) {
          return result;
        } else {
          return {
            message: result.message,
            status: res.status,
          };
        }
      })
      .catch((error) => {
        console.error(error);
        return {
          message: "An error occurred while fetching the data",
          status: 500,
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
          return result;
        } else {
          return {
            message: result.message,
            status: res.status,
          };
        }
      })
      .catch((error) => {
        console.error(error);
        return {
          message: "An error occurred while fetching the data",
          status: 500,
        };
      });
  }
}
