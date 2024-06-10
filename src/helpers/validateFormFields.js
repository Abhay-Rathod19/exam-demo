import { errorMsg } from "../constants/userModule/errorMsg";
import { areEqual, objectKeys, objectValues } from "../utils/javaScript";

const validatePass = (inputPass) => {
  if (areEqual(inputPass, "")) {
    return errorMsg.password.require;
  } else if (inputPass?.length < 6) {
    return errorMsg.password.passLength;
  } else {
    return "";
  }
};

export const validateFormFields = (
  field,
  value,
  data,
  formError,
  setFormError
) => {
  // console.log("Error-now-are:", formError);

  switch (field) {
    case "name":
      console.log("I am running");
      const regex = /^[A-Za-z\s]+$/;
      if (areEqual(value?.trim(), "")) {
        return errorMsg.name.require;
      } else if (!regex.test(value)) {
        return errorMsg.name.inValidName;
      } else {
        return "";
      }

    case "email":
      let inputEmail = value;
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
      if (areEqual(inputEmail?.trim(), "")) {
        return errorMsg.email.require;
      } else if (!emailRegex.test(inputEmail)) {
        return errorMsg.email.inValidEmail;
      } else {
        return "";
      }

    case "userRole":
      let selectedVal = value;
      if (areEqual(selectedVal, "-- Select your role --")) {
        return errorMsg.userRole.require;
      } else {
        return "";
      }

    case "oldPassword":
      let oldPassword = value;
      return validatePass(oldPassword);

    case "password":
      let inputPass = value;
      let confirmPass = data?.confirmPassword;
      if (confirmPass && inputPass !== confirmPass) {
        return "Both password not matching..";
      }
      return validatePass(inputPass);

    case "confirmPassword":
      let passwd = data?.newPassword || data?.password;
      let confirmPassword = value;
      if (confirmPassword.length > 1) {
        if (passwd) {
          if (passwd !== confirmPassword) {
            return "Enter Same password";
          }
        }
      }
      return validatePass(confirmPassword);

    case "newPassword":
      let newPassword = value;
      let confPass = data?.confirmPassword;
      if (confPass && newPassword !== confPass) {
        return "Both password not matching..";
      }
      return validatePass(newPassword);

    case "allFields":
      const errorData = {};
      const formData = value
        ?.map((field) => field.name)
        ?.filter((value) => value !== undefined);
      formData.forEach((element) => {
        if (!data[element]) {
          errorData[element] = errorMsg[element]?.require;
        }
      });

      if (objectKeys(errorData).length) {
        setFormError({ ...formError, ...errorData });
      }
      return areEqual(objectValues(errorData)?.length, 0);

    default:
      console.log("You got default case.");
      return "";
  }
};
