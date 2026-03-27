import { AUTH_API_ROUTES } from "@/constants/api-routes";
import useApiManager from "@/constants/controllers/mainController";
import { AxiosError } from "axios";

export const useResendOtp = () => {
  const { callApi, data, isLoading, isSuccess, isError, error } = useApiManager<
    any,
    AxiosError,
    { email: string }
  >({
    endpoint: AUTH_API_ROUTES.RESEND_OTP,
    method: "POST",
    isAuth: false,
    showSuccessToast: true,
    queryKey: ["user"],
  });

  const resendOtp = async (formData: { email: string }) => {
    return await callApi(formData);
  };

  return {
    resendOtp,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
