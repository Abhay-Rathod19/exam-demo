import React, { useState } from 'react';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

export const ExmSelectList = ({ ...props }) => {

    const [selValue, setSelValue] = useState(props.listData[0]);
    const { fieldLabel, listData } = props;

    return (
        <>
            <label style={{ margin: '0px 0 10px 0' }}>{fieldLabel}</label>
            <FormControl className='select-country' size="small" >
                <InputLabel id="demo-simple-select-label" >Select role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selValue}
                    label="Country"
                    onChange={(e) => setSelValue(e.target.value)}
                    sx={{ width: "250px" }}
                >
                    {
                        Array.isArray(listData) ?
                            listData.map((list, index) => {
                                return (
                                    <MenuItem key={index} value={list}>{list}</MenuItem>
                                )
                            })
                            : <MenuItem key="index" value=""></MenuItem>
                    }
                </Select>
                {/* <p className='error-msg'>{formError[fieldSelect] ? formError[fieldSelect] : ''}</p> */}
                {/* {formError[fieldSelect] ? <span className='error-msg'>{formError[fieldSelect]}</span> : ''} */}
            </FormControl>
        </>

    )
}

