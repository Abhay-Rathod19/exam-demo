import { Stack } from "@mui/material";
import { ExmTypography } from "../shared/ExmTypography";
import { RenderFormFields } from "../shared/ExmFormFields";
import { loginFormData } from "../constants/userModule/loginFmData";
import { signUpFormInput } from "../constants/userModule/signupFmData";
import { ternary } from "../utils/javaScript";

export const UserAction = ({ actionType = "Sign up" }) => {
    return (
        <>
            <div className="user-sign-login-container">
                <Stack direction="column" justifyContent="center" alignItems="center">
                    <ExmTypography variant="h4" sx={{ textAlign: "center", my: "20px" }}>
                        {ternary(actionType === "Log in", "Log in", "Sign up")}
                    </ExmTypography>
                    <RenderFormFields
                        fieldsObject={ternary(
                            actionType === "Log in",
                            loginFormData,
                            signUpFormInput
                        )}
                    />
                </Stack>
            </div>
        </>
    );
};
