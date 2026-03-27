import { AUTH_API_ROUTES } from "@/constants/api-routes";
import useApiManager from "@/constants/controllers/mainController";
import { AxiosError } from "axios";
import { TVerifyEmailFormValues } from "../lib/types";

export const useVerifyMfa = () => {
  const { callApi, data, isLoading, isSuccess, isError, error } = useApiManager<
    any,
    AxiosError,
    TVerifyEmailFormValues
  >({
    endpoint: AUTH_API_ROUTES.VERIFY_MFA,
    method: "POST",
    isAuth: false,
    showSuccessToast: true,
    queryKey: ["user"],
  });

  const verifyMfa = async (formData: TVerifyEmailFormValues) => {
    return await callApi(formData);
  };

  return {
    verifyMfa,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
