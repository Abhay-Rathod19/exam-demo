import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Stack } from "@mui/material";
import { ExmTypography } from "../shared/ExmTypography";
import { ExmButton } from "../shared/ExmButton";
import { removeExmPaper, rmvNoticeMsg } from "../redux/slices/studentSlice";

export const AlreadyExmGiven = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBackClick = () => {
        navigate(-1);
        dispatch(removeExmPaper());
        dispatch(rmvNoticeMsg());
    };

    return (
        <>
            <Stack sx={{ m: "0 5px 5px 20px" }}>
                <ExmTypography variant="h6" className="text-danger">
                    Notice :  This exam is already given.
                </ExmTypography>
                <ExmButton sx={{ width: "280px", m: "10px 0" }} onClick={handleBackClick}>Go back</ExmButton>
            </Stack>
        </>
    )
}

