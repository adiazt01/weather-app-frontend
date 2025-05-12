import http from "@config/http";

import { mapAuthResponseToUser } from "../mappers/auth.mapper";
import type { AuthUser } from "../interface/auth-user.interface";
import type { SignInParams, SignUpParams } from "../interface/auth-service.interface";
import type { AuthResponse } from "../interface/auth-api.interface";
import { mapResponseError } from "@/features/shared/mappers/errors.mappers";

export const signIn = async ({ email, password }: SignInParams): Promise<AuthUser> => {
  try {
    const response = await http.post<AuthResponse>('/auth/signin', {
      email,
      password,
    });

    return mapAuthResponseToUser(response.data);
  } catch (error) {
    throw mapResponseError(error);
  }
};

export const signUp = async ({ email, password, username }: SignUpParams): Promise<AuthUser> => {
  try {
    const response = await http.post<AuthResponse>("/auth/signup", {
      email,
      password,
      username,
    });

    return mapAuthResponseToUser(response.data);
  } catch (error) {
    throw mapResponseError(error);
  }
}