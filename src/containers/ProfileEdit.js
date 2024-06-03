import { Box, Stack } from "@mui/material";
import { ExmTypography } from "../shared/ExmTypography";
import { getFromLocalStorage } from "../utils/javaScript";
import { RenderFormFields } from "../shared/ExmFormFields";
import { editProfileForm } from "../description/student.description";
import { changeStdName } from "../helpers/studentModule/studentActions";

export const ProfileEdit = () => {

    const userName = JSON.parse(getFromLocalStorage("LogInUser")).name;

    return (
        <Box sx={{ m: "5px 0 0 20px" }}>
            <ExmTypography variant="h4" sx={{ m: "5px 0 20px 0" }}>Edit profile</ExmTypography>
            <Stack sx={{ m: "5px 0 10px 0" }}>
                <ExmTypography variant="h6">Your curent name is : {userName}</ExmTypography>
            </Stack>
            <Stack>
                <RenderFormFields fieldsObject={editProfileForm} formName="Update Profile" onFormSubmit={changeStdName} />
            </Stack>
        </Box>
    )
};

