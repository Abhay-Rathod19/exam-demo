import { exmStore } from "../../redux/store/store";
import { fetchApiData } from "../../redux/slices/apiSlice";
import { API_REQ_SUCCESS_CODE } from "../../constants/userModule/apiConstants";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/javaScript";
import { addToLogUser } from "../../redux/slices/userSlice";

export const onUserSignUp = async (formData, navigate, setFormData) => {
  const data = {
    name: formData?.name,
    email: formData?.email,
    password: formData?.password,
    role: formData?.userRole,
  };

  const request = await exmStore.dispatch(
    fetchApiData({
      url: "/users/SignUp",
      method: "post",
      data,
    })
  );

  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    navigate("/", { replace: true });
    setFormData({});
  }
};

export const onUserLogIn = async (formData, navigate, setFormData) => {
  const data = {
    email: formData?.email,
    password: formData?.password,
  };
  const request = await exmStore.dispatch(
    fetchApiData({
      url: "/users/Login",
      method: "post",
      data,
    })
  );

  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    setToLocalStorage("LogInUser", JSON.stringify(request.payload.data));
    const role = JSON.parse(getFromLocalStorage("LogInUser")).role;
    navigate(`/dashboard/${role}`, { replace: true });
    setFormData({});
    exmStore.dispatch(addToLogUser(request.payload.data));
  }
};

export const onUserForgetPass = async (formData, navigate, setFormData) => {
  const data = {
    email: formData?.email,
  };
  const request = await exmStore.dispatch(
    fetchApiData({
      url: "/users/ForgotPassword",
      method: "post",
      data,
    })
  );

  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    // navigate("/signup", { replace: true });
    setFormData({});
  }
};

export const onUserNewPass = async (formData, navigate, setFormData) => {
  const data = {
    Password: formData?.password,
    ConfirmPassword: formData?.confirmPassword,
  };

  const newPassToken = getFromLocalStorage("token");
  const request = await exmStore.dispatch(
    fetchApiData({
      url: `/users/ForgotPassword/Verify?token=${newPassToken}`,
      method: "post",
      data,
    })
  );

  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    navigate("/", { replace: true });
    setFormData({});
  }
};

export const onUserResetPass = async (formData, navigate, setFormData) => {
  const data = {
    oldPassword: formData?.oldPassword,
    Password: formData?.newPassword,
    ConfirmPassword: formData?.confirmPassword,
  };
  const request = await exmStore.dispatch(
    fetchApiData({
      url: "/users/ResetPassword",
      method: "post",
      data,
    })
  );

  if (request.payload?.statusCode === API_REQ_SUCCESS_CODE) {
    setFormData({});
  }
};
