import { Typography } from '@mui/material'

export const ExmTypography = ({ children, ...props }) => {
    return (
        <Typography variant='h6' {...props}>
            {children}
        </Typography>
    )
}

