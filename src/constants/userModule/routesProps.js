import { loginFormData } from "./loginFmData";
import { signUpFormInput } from "./signupFmData";
import { newPassData, resetPassData, forgotPassData } from "./forgotPsData";
import { onUserLogIn, onUserSignUp, onUserForgetPass, onUserNewPass, onUserResetPass } from "../../helpers/userModules/userActions";

export const userLoginProps = {
    actionType: "Log in",
    formData: loginFormData,
    formName: "LoginData",
    onFormSubmit: onUserLogIn,
};

export const userSignUpProps = {
    actionType: "Sign up",
    formData: signUpFormInput,
    formName: "SignupData",
    onFormSubmit: onUserSignUp,
};

export const userFgtPsProps = {
    actionType: "Forgot password",
    formData: forgotPassData,
    formName: "ForgotPassData",
    onFormSubmit: onUserForgetPass,
};

export const userNewPsProps = {
    actionType: "New password",
    formData: newPassData,
    formName: "NewPassData",
    onFormSubmit: onUserNewPass,
};

export const userRstPsProps = {
    actionType: "Reset password",
    formData: resetPassData,
    formName: "ResetPassData",
    onFormSubmit: onUserResetPass,
};