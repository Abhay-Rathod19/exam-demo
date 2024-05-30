import React from 'react'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import { removeApiMsg } from '../redux/slices/apiSlice';
import { ternary } from '../utils/javaScript';

export const Message = () => {

    const dispatch = useDispatch();
    const apiMsg = useSelector((state) => state?.api?.apiMessage);
    const apiStatusCode = useSelector((state) => state?.api?.apiResponse?.statusCode);

    const setSeverity = (code) => {
        if (code === 200) return "success";
        if (code === 500) return "error";
        else return "info";
    };

    setTimeout(() => dispatch(removeApiMsg()), 4000);

    return (
        <Box sx={{ width: '500px' }} className="api-response-msg">
            {
                ternary((apiMsg),
                    (
                        <Collapse in={true}>
                            <Alert
                                severity={setSeverity(apiStatusCode)}
                                sx={{ mb: 2 }}
                            >
                                {apiMsg}
                            </Alert>
                        </Collapse>
                    ),
                    (""))
            }
        </Box>
    )
};
