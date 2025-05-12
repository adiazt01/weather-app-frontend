import { loginSchema, registerSchema } from "../schemas/auth.schemas";
import * as yup from "yup";

export type ILoginFormInputs = yup.InferType<typeof loginSchema>;

export type IRegisterFormInputs = yup.InferType<typeof registerSchema>;