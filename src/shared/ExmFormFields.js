import React, { useState } from "react";
import { Stack } from "@mui/material";
import { ExmCheckBox } from "./ExmCheckBox";
import { ExmLabel } from "./ExmLabel";
import { ExmRadioButton } from "./ExmRadioButton";
import { ExmSelectList } from "./ExmSelectList";
import { ExmInputField } from "./ExmInputField";
import { ExmButton } from "./ExmButton";
import { ExmTypography } from "./ExmTypography";

export const RenderFormFields = ({ fieldsObject }) => {

    const [formData, setFormData] = useState({});
    // const { formError, setFormError } = useContext(FormErrorContext);

    const handleFormInputChange = (e, fieldName) => {
        setFormData({ ...formData, [fieldName]: e.target.value });
        // setFormError({
        //     ...formError,
        //     [fieldName]: validateFormFields(fieldName, e.target.value),
        // });
    };
    // console.log("Data are : ", formData);

    return (
        <form>

            {
                fieldsObject?.map((fields, index) => {
                    const {
                        label,
                        name,
                        fieldType,
                        inputType,
                        listData,
                        radioField,
                        checkBoxFields,
                        defaultSelValue,
                        btnType,
                        btnValue,
                        styles,
                        onClick
                    } = fields;

                    switch (inputType) {
                        case "input":
                            return (
                                <React.Fragment key={`inp-${index}`}>
                                    <ExmLabel htmlFor={name}>{label}</ExmLabel>
                                    <ExmInputField
                                        type={fieldType}
                                        name={name}
                                        value={formData[name] || ""}
                                        id={name}
                                        onChange={(e) => handleFormInputChange(e, name)}
                                    />
                                    {/* <p className="error-msg">
                                    {formError[fieldName] ? formError[fieldName] : ""}
                                </p> */}
                                </React.Fragment>
                            );

                        case "radio":
                            return (
                                <React.Fragment key={`radio-${index}`}>
                                    <ExmLabel className="radio-buttons">{label}</ExmLabel>
                                    <ExmRadioButton radioField={radioField} />
                                    {/* <p className="error-msg">
                                    {formError[fieldRadio] ? formError[fieldRadio] : ""}
                                </p> */}
                                </React.Fragment>
                            );

                        case "select":
                            return (
                                <React.Fragment key={`sel-${index}`}>
                                    <ExmLabel style={{ margin: "0px 0 10px 0" }}>
                                        {label}
                                    </ExmLabel>
                                    <ExmSelectList listData={listData} value={formData[name] || defaultSelValue} onChange={(e) => handleFormInputChange(e, name)} />
                                    {/* <p className="error-msg">
                                    {formError[fieldSelect] ? formError[fieldSelect] : ""}
                                </p> */}
                                </React.Fragment>
                            );

                        case "textarea":
                            return (
                                <React.Fragment key={`text-${index}`}>
                                    <ExmLabel style={{ margin: "20px 0 10px 0" }}>
                                        {label}
                                    </ExmLabel>
                                    <textarea
                                        className="textarea"
                                        value={formData?.aboutUser || ""}
                                        // onChange={(e) => handleFormInputChange(e, fieldName)}
                                        aria-label="maximum height"
                                        name={name}
                                    ></textarea>
                                </React.Fragment>
                            );

                        case "checkbox":
                            return (
                                <React.Fragment key={`text-${index}`}>
                                    <ExmLabel>{label}</ExmLabel>
                                    <ExmCheckBox checkBoxFields={checkBoxFields} />
                                </React.Fragment>
                            );

                        case "button":
                            return (
                                <Stack key={`text-${index}`}>
                                    <ExmButton type={btnType} sx={{ ...styles }}>
                                        {btnValue}
                                    </ExmButton>
                                </Stack>
                            );

                        case "additionalAction":
                            return (
                                <ExmTypography
                                    key={`add-label-${index}`}
                                    variant="span"
                                    sx={{ ...styles }}
                                    onClick={onClick}
                                >
                                    {label}
                                </ExmTypography>
                            );

                        default:
                            return "";
                    }
                })
            }

        </form>
    );
};
