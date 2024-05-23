import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

export const ExmCheckBox = ({ ...props }) => {
    const checkLabel = props.checkLabel;
    const checkBoxField = props.checkBoxField;

    return (
        <>
            {
                checkBoxField?.map((checkValue, index) => {
                    return (
                        <React.Fragment key={`check-${index}`}>
                            {
                                checkValue ?
                                    (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name={checkLabel}
                                                    value={checkValue}
                                                    onClick={props.onClick ? props.onClick : (e) => console.log(`Check-value`, e.target.value)}
                                                />
                                            }
                                            label={checkValue}
                                        />
                                    )
                                    : ``
                            }

                        </React.Fragment>
                    );
                })
            }
        </>
    );
};
