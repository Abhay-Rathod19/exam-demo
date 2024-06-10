import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useDispatch, useSelector } from "react-redux";
import { removeApiMsg } from "../redux/slices/apiSlice";
import { areEqual, ternary } from "../utils/javaScript";
import {
  API_REQ_FAIL_CODE,
  API_REQ_SUCCESS_CODE,
} from "../constants/userModule/apiConstants";

export const Message = () => {
  const dispatch = useDispatch();
  const apiMsg = useSelector((state) => state?.api?.apiMessage);
  const apiStatusCode = useSelector(
    (state) => state?.api?.apiResponse?.statusCode
  );

  const setSeverity = (code) => {
    if (areEqual(code, API_REQ_SUCCESS_CODE)) return "success";
    if (areEqual(code, API_REQ_FAIL_CODE)) return "error";
    else return "info";
  };

  setTimeout(() => dispatch(removeApiMsg()), 1000);

  return (
    <Box sx={{ width: "500px" }} className="api-response-msg">
      {ternary(
        apiMsg,
        <Collapse in={true}>
          <Alert severity={setSeverity(apiStatusCode)} sx={{ mb: 2 }}>
            {apiMsg}
          </Alert>
        </Collapse>,
        ""
      )}
    </Box>
  );
};
