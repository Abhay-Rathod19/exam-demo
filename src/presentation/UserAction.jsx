import { Stack, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Message } from "../containers/Message";
import { ExmTypography } from "../shared/ExmTypography";
import { RenderFormFields } from "../shared/ExmFormFields";
import { setToLocalStorage } from "../utils/javaScript";


export const UserAction = ({ actionType = "Sign up", formImage, formData, formName = "SignupData", onFormSubmit }) => {

    const [serchPara] = useSearchParams();

    if (formName === "NewPassData") {
        setToLocalStorage("token", serchPara?.get('token'));
    }

    return (
        <>
            <Message />
            <Box sx={{ display: 'flex' }} className='user-action-main-container' >
                <Box>
                    <img className="user-action-img" src={formImage} alt="demo" />
                </Box>
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
            </Box>
        </>
    );
};
