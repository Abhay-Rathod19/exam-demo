import { Stack } from "@mui/material";
import { ExmTypography } from "../shared/ExmTypography";
import { RenderFormFields } from "../shared/ExmFormFields";


export const UserAction = ({ actionType = "Sign up", formData, formName = "SignupData" }) => {
    return (
        <>
            <div className="user-sign-login-container">
                <Stack direction="column" justifyContent="center" alignItems="center">
                    <ExmTypography variant="h4" sx={{ textAlign: "center", my: "20px" }}>
                        {actionType}
                        {/* {ternary(actionType === "Log in", "Log in", "Sign up")} */}
                    </ExmTypography>
                    <RenderFormFields
                        fieldsObject={formData}
                        formName={formName}
                    />
                </Stack>
            </div>
        </>
    );
};
