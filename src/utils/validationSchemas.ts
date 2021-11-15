import * as yup from "yup";

export const userSchema = {
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required()
};

export const authSchema = {
    email: yup.string().email().required(),
    password: yup.string().required()
};
