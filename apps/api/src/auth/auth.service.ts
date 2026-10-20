import {type AuthRepository} from "./auth.repository.ts";

interface AuthService {}

const createAuthService = (authRepository: AuthRepository) => {};

export {type AuthService, createAuthService};
