import { Stack } from "@mui/material";
import { ExmTypography } from "../shared/ExmTypography";
import { RenderFormFields } from "../shared/ExmFormFields";
import { loginFormData } from "../constants/userModule/loginFmData";

export const UserLogin = () => {
    return (
        <div className="user-sign-login-container">
            <Stack direction="column" justifyContent="center" alignItems="center">
                <ExmTypography variant="h4" sx={{ textAlign: "center", my: "20px" }}>Log in</ExmTypography>
                <RenderFormFields fieldsObject={loginFormData} />
            </Stack>
        </div>
    )
}

