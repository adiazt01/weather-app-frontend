import type { AuthResponse } from "../interface/auth-api.interface";
import type { AuthUser } from "../interface/auth-user.interface";

export const mapAuthResponseToUser = (authResponse: AuthResponse): AuthUser => {
    return {
        id: authResponse.id,
        email: authResponse.email,
        token: authResponse.token,
        username: authResponse.username,
    };
}