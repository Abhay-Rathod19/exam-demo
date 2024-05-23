import { RenderFormFields } from "../shared/ExmFormFields";
import { signUpFormInput } from "../constants/userModule/signupFmData";
import { ExmTypography } from "../shared/ExmTypography";
import { Stack } from "@mui/material";

export const UserSignup = () => {
    return (
        <div className="user-sign-login-container">
            <Stack direction="column" justifyContent="center" alignItems="center">
                <ExmTypography variant="h4" sx={{ textAlign: "center", my: "20px" }}>Sign up</ExmTypography>
                <RenderFormFields fieldsObject={signUpFormInput} />
            </Stack>
        </div>
    )
}