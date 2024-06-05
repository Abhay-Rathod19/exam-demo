import { signUpFormInput, loginFormData } from "./signFmData";
import { newPassData, resetPassData, forgotPassData } from "./pswdFormData";
import { onUserLogIn, onUserSignUp, onUserForgetPass, onUserNewPass, onUserResetPass } from "../../helpers/userModules/userActions";
import LoginImg from '../../assets/images/login.jpg';
import SignUpImg from '../../assets/images/signup.jpg';
import ResetPsImg from '../../assets/images/Reset.jpg';
import ForgetPs from '../../assets/images/ForgetPs.png';

export const userLoginProps = {
    actionType: "Log in",
    formData: loginFormData,
    formName: "LoginData",
    onFormSubmit: onUserLogIn,
    formImage: LoginImg,
};

export const userSignUpProps = {
    actionType: "Sign up",
    formData: signUpFormInput,
    formName: "SignupData",
    onFormSubmit: onUserSignUp,
    formImage: SignUpImg,
};

export const userFgtPsProps = {
    actionType: "Forgot password",
    formData: forgotPassData,
    formName: "ForgotPassData",
    onFormSubmit: onUserForgetPass,
    formImage: ForgetPs,
};

export const userNewPsProps = {
    actionType: "New password",
    formData: newPassData,
    formName: "NewPassData",
    onFormSubmit: onUserNewPass,
    formImage: LoginImg,
};

export const userRstPsProps = {
    actionType: "Reset password",
    formData: resetPassData,
    formName: "ResetPassData",
    onFormSubmit: onUserResetPass,
    formImage: ResetPsImg,
};