import React, { useState } from "react";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ExmCheckBox } from "./ExmCheckBox";
import { ExmLabel } from "./ExmLabel";
import { ExmRadioButton } from "./ExmRadioButton";
import { ExmSelectList } from "./ExmSelectList";
import { ExmInputField } from "./ExmInputField";
import { ExmButton } from "./ExmButton";
import { ExmTypography } from "./ExmTypography";
import { validateFormFields } from "../helpers/validateFormFields";
import { areEqual, objectValues, ternary } from "../utils/javaScript";
import { addSubmitedData } from "../redux/slices/userSlice";
import { ExmSpinnerCom } from "./ExmSpinnerCom";

export const RenderFormFields = ({ fieldsObject, formName, onFormSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiLoading = useSelector((state) => state.api.loading);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});

  const handleFormInputChange = (e, fieldName) => {
    const { value } = e.target;

    setFormData({ ...formData, [fieldName]: value });
    setFormError({
      ...formError,
      [fieldName]: validateFormFields(
        fieldName,
        value,
        formData,
        formError,
        setFormError
      ),
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      validateFormFields(
        "allFields",
        fieldsObject,
        formData,
        formError,
        setFormError
      ) &&
      areEqual(objectValues(formError).filter((value) => value)?.length, 0)
    ) {
      const dataToSbmt = { [formName]: formData };
      dispatch(addSubmitedData(dataToSbmt));
      onFormSubmit(formData, navigate, setFormData);
      return true;
    }
    return false;
  };

  return (
    <Box className="form-main-container">
      <form onSubmit={handleFormSubmit}>
        {fieldsObject?.map((fields, index) => {
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
            addActionData,
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
                  <Box
                    component="p"
                    sx={{
                      height: 14,
                      color: "error.main",
                      display: "block",
                      marginTop: "-20px",
                    }}
                  >
                    {formError[name] ? formError[name] : ""}
                  </Box>
                </React.Fragment>
              );

            case "radio":
              return (
                <React.Fragment key={`radio-${index}`}>
                  <ExmLabel className="radio-buttons">{label}</ExmLabel>
                  <ExmRadioButton radioField={radioField} />
                  <p className="error-msg">
                    {formError[name] ? formError[name] : ""}
                  </p>
                </React.Fragment>
              );

            case "select":
              return (
                <React.Fragment key={`sel-${index}`}>
                  <ExmLabel style={{ margin: "0px 0 10px 0" }}>
                    {label}
                  </ExmLabel>
                  <ExmSelectList
                    listData={listData}
                    value={formData[name] || defaultSelValue}
                    onChange={(e) => handleFormInputChange(e, name)}
                  />
                  <Box
                    component="p"
                    sx={{
                      height: 14,
                      color: "error.main",
                      display: "block",
                      marginTop: "-20px",
                    }}
                  >
                    {formError[name] ? formError[name] : ""}
                  </Box>
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
                  <ExmButton
                    type={btnType}
                    sx={{ ...styles, height: 45 }}
                    disabled={ternary(apiLoading, true, false)}
                  >
                    {btnValue}
                    {apiLoading ? <ExmSpinnerCom sx={{ mx: 1, p: 1 }} /> : ""}
                  </ExmButton>
                </Stack>
              );

            case "additionalAction":
              return (
                <Stack direction="row" spacing={28} key={`add-label-${index}`}>
                  {addActionData?.map((data, index) => {
                    return (
                      <Link
                        to={data?.onClickPath}
                        key={`add-label-${index}`}
                        className="text-decoration-none"
                      >
                        <ExmTypography variant="span" sx={{ ...styles }}>
                          {data?.label}
                        </ExmTypography>
                      </Link>
                    );
                  })}
                </Stack>
              );

            default:
              return "";
          }
        })}
      </form>
    </Box>
  );
};
