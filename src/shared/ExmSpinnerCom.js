import { CircularProgress } from "@mui/material";

export const ExmSpinnerCom = ({ ...props }) => {
  return <CircularProgress sx={{ m: 5 }} {...props} />;
};
