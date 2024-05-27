import { Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ExmTypography } from "../shared/ExmTypography";
import { RenderFormFields } from "../shared/ExmFormFields";
import { setToLocalStorage } from "../utils/javaScript";


export const UserAction = ({ actionType = "Sign up", formData, formName = "SignupData", onFormSubmit }) => {

    const [serchPara] = useSearchParams();

    if (formName === "NewPassData") {
        setToLocalStorage("token", serchPara?.get('token'));
    }

    return (
        <>
            <div className="user-sign-login-container">
                <Stack direction="column" justifyContent="center" alignItems="center">
                    <ExmTypography variant="h4" sx={{ textAlign: "center", my: "20px" }}>
                        {actionType}
                    </ExmTypography>
                    <RenderFormFields
                        fieldsObject={formData}
                        formName={formName}
                        onFormSubmit={onFormSubmit}
                    />
                </Stack>
            </div>
        </>
    );
};
