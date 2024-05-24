import { errorMsg } from "../constants/userModule/errorMsg";
import { objectKeys, objectValues } from "../utils/javaScript";

export const validateFormFields = (
    field,
    value,
    data,
    formError,
    setFormError
) => {
    switch (field) {
        case "name":
            console.log("I am running");
            const regex = /^[A-Za-z\s]+$/;
            if (value.trim() === "") {
                return errorMsg.name.require;
            } else if (!regex.test(value)) {
                return errorMsg.name.inValidName;
            } else {
                return "";
            }

        case "email":
            let inputEmail = value;
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
            if (inputEmail.trim() === "") {
                return errorMsg.email.require;
            } else if (!emailRegex.test(inputEmail)) {
                return errorMsg.email.inValidEmail;
            } else {
                return "";
            }

        case "userRole":
            let selectedVal = value;
            if (selectedVal === "-- Select your role --") {
                return errorMsg.userRole.require;
            } else {
                return "";
            }

        case "password":
            const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            let inputPass = value;
            // if (inputPass === "") {
            //     return errorMsg.password.require;
            // } else if (inputPass.length > 16) {
            //     return errorMsg.password.passMaxLength;
            // } else if (inputPass.length > 7) {
            //     if (!passRegex.test(inputPass)) {
            //         return errorMsg.password.inValidPassword;
            //     } else {
            //         return "";
            //     }
            // } else {
            //     return errorMsg.password.passLength;
            // }
            if (inputPass?.length < 2) {
                return errorMsg.password.passLength;
            } else {
                return "";
            }

        case "confirmPassword":
            let confirmPassword = value;
            if (confirmPassword?.length < 2) {
                return errorMsg.password.passLength;
            } else {
                return "";
            }

        case "oldPassword":
            let oldPassword = value;
            if (oldPassword?.length < 2) {
                return errorMsg.password.passLength;
            } else {
                return "";
            }

        case "newPassword":
            let newPassword = value;
            if (newPassword?.length < 2) {
                return errorMsg.password.passLength;
            } else {
                return "";
            }

        case "allFields":
            const errorData = {};
            const formData = value
                ?.map((field) => field.name)
                ?.filter((value) => value !== undefined);
            formData.forEach(element => {
                if (!data[element]) {
                    errorData[element] = errorMsg[element]?.require;
                }
            });

            if (objectKeys(errorData).length) {
                setFormError({ ...formError, ...errorData });
            }
            return objectValues(errorData).length === 0;

        default:
            console.log("You got default case.");
            return "";
    }
};
