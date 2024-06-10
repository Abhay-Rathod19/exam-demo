import React from "react";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

export const ExmSelectList = ({ ...props }) => {
  const { listData } = props;

  return (
    <>
      <FormControl
        className="select-country"
        size="small"
        sx={{ width: 300, display: "block", margin: "10px 0 20px 0" }}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          onChange={props.onChange}
          sx={{ width: "400px" }}
        >
          {Array.isArray(listData) ? (
            listData.map((list, index) => {
              return (
                <MenuItem key={index} value={list}>
                  {list}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem key="index" value=""></MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  );
};
