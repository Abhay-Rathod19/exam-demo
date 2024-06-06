import React from "react";
import { Button } from "@mui/material";

export const ExmButton = ({ children, ...props }) => {
    return (
        <Button
            variant="contained"
            disableElevation
            disableRipple
            sx={{
                my: "15px",
                height: 70,
            }}
            type={props.type}
            {...props}
        >
            {children}
        </Button>
    );
};
