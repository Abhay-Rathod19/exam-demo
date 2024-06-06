import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { ExmButton } from '../shared/ExmButton';
import { getFromLocalStorage, rmvFromLclStorage } from '../utils/javaScript';

export const Navbar = () => {

    const navigate = useNavigate();
    const userName = JSON.parse(getFromLocalStorage("LogInUser"))?.name;

    const onUserLogout = () => {
        rmvFromLclStorage('LogInUser');
        navigate('/');
    }

    return (
        <Box sx={{ display: 'flex', mb: '30px' }}>
            <AppBar component="nav" sx={{ position: "static", height: 70 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Welcome {userName}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <ExmButton
                            sx={{
                                ml: 1,
                                color: "White",
                                bgcolor: "black",
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: "black"
                                }
                            }}
                            disableElevation
                            disableRipple
                            onClick={onUserLogout}
                        >
                            Log out
                        </ExmButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
};
