import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token?: string;
      first_time_login?: boolean;
      user?: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        mobile_number: string | null;
        created_datetime: string;
        updated_datetime: string;
      };
    };
  }

  interface User {
    token?: string;
    first_time_login?: boolean;
    user?: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      mobile_number: string | null;
      created_datetime: string;
      updated_datetime: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string;
    first_time_login?: boolean;
    user?: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      mobile_number: string | null;
      created_datetime: string;
      updated_datetime: string;
    };
  }
}
