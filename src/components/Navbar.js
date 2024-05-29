import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ExmButton } from '../shared/ExmButton';
import { useNavigate } from 'react-router';

export const Navbar = ({ userName = 'user' }) => {

    const navigate = useNavigate();

    const onUserLogout = () => {
        localStorage.removeItem('LogInUser');
        navigate('/');
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
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
            <nav>

            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    )
};
