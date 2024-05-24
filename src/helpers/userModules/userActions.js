import { userDataApi } from "../../apis/userApi";

export const onUserSignUp = (formData) => {

    const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.userRole.toLowerCase(),
    };
    const response = userDataApi.post('/SignUp', { ...data });

    console.log("The response is : ", response);
};