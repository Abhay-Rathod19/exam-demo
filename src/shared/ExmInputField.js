import { TextField } from "@mui/material";

export const ExmInputField = ({ ...props }) => {
  return (
    <>
      <TextField
        className="form-input-field"
        sx={{
          width: 400,
          margin: "10px 0 20px 0",
        }}
        label={props.fieldlabel}
        variant="outlined"
        autoComplete="true"
        inputProps={{
          style: {
            height: "5px",
          },
        }}
        {...props}
      />
    </>
  );
};
