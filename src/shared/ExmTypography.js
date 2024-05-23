import { Typography } from '@mui/material'

export const ExmLabel = ({ children, ...props }) => {
    return (
        <Typography variant='h6' {...props}>
            {children}
        </Typography>
    )
}

