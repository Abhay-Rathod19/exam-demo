import { Button, styled } from "@mui/material";

import React from "react";

export const ExmButton = ({ children, ...props }) => {

    // console.log(`Props background : `, props?.sx?.background)
    // const colorDefault = props?.sx?.background || `transparent`;
    // const CustomBtn = styled(Button)`&:hover{
    //                background-color: (${colorDefault})
    //             }`

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
