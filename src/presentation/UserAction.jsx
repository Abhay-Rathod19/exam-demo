import { Stack, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Message } from "../containers/Message";
import { resetLoader } from "../redux/slices/apiSlice";
import { ExmTypography } from "../shared/ExmTypography";
import { RenderFormFields } from "../shared/ExmFormFields";
import { areEqual, setToLocalStorage } from "../utils/javaScript";
import { useDispatch } from "react-redux";
import { useLayoutEffect } from "react";

export const UserAction = ({
  actionType = "Sign up",
  formImage,
  formData,
  formName = "SignupData",
  onFormSubmit,
}) => {
  const [serchPara] = useSearchParams();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(resetLoader());
  }, []);

  if (areEqual(formName, "NewPassData")) {
    setToLocalStorage("token", serchPara?.get("token"));
  }

  return (
    <>
      <Box sx={{ display: "flex" }} className="user-action-main-container">
        <Box>
          <img className="user-action-img" src={formImage} alt="demo" />
        </Box>
        <div className="user-sign-login-container">
          <Message />
          <Stack direction="column" justifyContent="center" alignItems="center">
            <ExmTypography
              variant="h4"
              sx={{ textAlign: "center", my: "20px" }}
            >
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
