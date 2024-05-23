import { Stack } from "@mui/material";
import { ExmTypography } from "../shared/ExmTypography";
import { RenderFormFields } from "../shared/ExmFormFields";
import { forgotPassData } from "../constants/userModule/forgotPsData"

export const UserForgotPass = () => {
    return (
        <>
            <div className="user-sign-login-container">
                <Stack direction="column" justifyContent="center" alignItems="center">
                    <ExmTypography variant="h4" sx={{ textAlign: "center", my: "20px" }}>
                        Forgot password
                    </ExmTypography>
                    <RenderFormFields
                        fieldsObject={forgotPassData}
                    />
                </Stack>
            </div>
        </>
    )
}