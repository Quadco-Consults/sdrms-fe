export enum AUTH_API_ROUTES {
  REGISTER_USER = "/api/proxy/auth/signup",
  VERIFY_EMAIL = "/users/verify_mfa/",
  VERIFY_MFA = "/api/proxy/auth/mfa/verify",
  RESEND_OTP = "/api/proxy/users/resend_otp/",
  LOGIN = "/api/proxy/auth/login",
  FORGOT_PASSWORD = "/users/forgot_password/",
  RESET_PASSWORD = "/users/forgot_password_confirm/",
  VERIFY_NEW_USER = "/auth/accounts/verify",
  PASSWORD_RESET_INITIATE = "/api/proxy/auth/password-reset/initiate",
  NEW_PASSWORD_RESET = "/api/proxy/auth/password-reset/confirm",
  NEW_USER_OTP = "/api/proxy/auth/otp/verify",
  ROLES = "/auth/roles",
  PERMISSIONS = "/auth/permissions",
  STAFFS = "/staffs",
  STAFF_PROFILE = "/staffs/profile",
}

export enum USER_API_ROUTES {
  GET_USERS = "/users/",
  CREATE_USER = "/users/create",
  UPDATE_USER = "/users/update",
  DELETE_USER = "/users/delete",
  GET_USER_ROLES = "/users/roles",
  GET_USER_PROFILE = "/users/profile",
}
