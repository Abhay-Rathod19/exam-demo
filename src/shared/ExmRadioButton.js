import React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

export const ExmRadioButton = ({ ...props }) => {

    const radioField = props.radioField;

    return (
        <>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                {
                    radioField?.map((field, index) => {
                        return (
                            <React.Fragment key={`radio-${index}`}>
                                <FormControlLabel value={field} control={<Radio onClick={props.onClick} />} label={field} />
                            </React.Fragment>
                        )
                    })
                }
            </RadioGroup>
        </>
    )
}