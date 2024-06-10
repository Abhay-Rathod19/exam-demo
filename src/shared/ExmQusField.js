import { Typography } from "@mui/material";

export const ExmQusField = ({ children, ...props }) => {
  return (
    <Typography className="give-exam-qus" {...props}>
      {children}
    </Typography>
  );
};
