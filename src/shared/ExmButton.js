import { Button } from '@mui/material';
import React from 'react';

export const ExmButton = ({ children, ...props }) => {
    return (
        <Button sx={{ my: "15px", height: 50 }} variant="contained" {...props} type={props.type}>
            {children}
        </Button>
    )
}