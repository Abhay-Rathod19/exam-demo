import { Button } from '@mui/material';
import React from 'react';

export const ExmButton = ({ children, ...props }) => {
    return (
        <Button variant="contained" {...props}>
            {children}
        </Button>
    )
}

// export const ButtonComponent = ({ ...props }) => {
//     return (
//         <Button variant="contained" className={props.className} onClick={props.onClick} disabled={props.disabled}>
//             {props.buttonValue}
//         </Button>
//     )
// }
