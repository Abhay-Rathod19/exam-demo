import { Stack } from "@mui/material";
import { ExmTypography } from "../shared/ExmTypography";
import { RenderFormFields } from "../shared/ExmFormFields";
import { newPassData } from "../constants/userModule/forgotPsData"

export const UserNewPass = () => {
    return (
        <>
            <div className="user-sign-login-container">
                <Stack direction="column" justifyContent="center" alignItems="center">
                    <ExmTypography variant="h4" sx={{ textAlign: "center", my: "20px" }}>
                        New password
                    </ExmTypography>
                    <RenderFormFields
                        fieldsObject={newPassData}
                    />
                </Stack>
            </div>
        </>
    )
}
