import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { ExmButton } from "./ExmButton";
import { areEqual, objectKeys, ternary } from "../utils/javaScript";
import { ExmTypography } from "./ExmTypography";
import { putExmDetailsRdx } from "../helpers/studentModule/studentActions";
import { ExmInputField } from "./ExmInputField";
import { ExmLabel } from "./ExmLabel";

export const ExmTableComponent = ({
  objectArray,
  btnRequire = true,
  showNotes = false,
  btnLabel = "View Details",
  urlPath,
  deleteBtn,
  removeData,
}) => {
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cloneArray = structuredClone(objectArray);

  useEffect(() => {}, [cloneArray]);

  if (cloneArray?.[0]) {
    const column = objectKeys(cloneArray[0]);
    const headerArr = ternary(
      btnRequire,
      column?.map((item) => item?.toUpperCase()).concat("DETAILS"),
      column?.map((item) => item?.toUpperCase())
    );
    const dataLimit = 8;
    const lastInd = currPage * dataLimit;
    const startInd = lastInd - dataLimit;
    const totalPage = Math.ceil(cloneArray?.length / dataLimit);
    const tableData = cloneArray
      ?.filter((value) => {
        for (let field of column) {
          if (value[field]) {
            if (
              value[field]
                ?.toString()
                ?.toLowerCase()
                ?.includes(search?.trim()?.toLowerCase())
            ) {
              return value;
            }
          }
        }
        return false;
      })
      ?.slice(startInd, lastInd);

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction="row" alignItems="baseline" spacing={3}>
          <ExmLabel>Search for data here :</ExmLabel>
          <ExmInputField
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Stack>
        <table className="table-edit my-3">
          <thead>
            <tr>
              {headerArr?.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <th>
                      <strong>{item}</strong>
                    </th>
                  </React.Fragment>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {tableData?.map((data, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    {column?.map((v, index) => {
                      return (
                        <React.Fragment key={index}>
                          {showNotes ? (
                            <td>
                              {areEqual(typeof data[v], "object")
                                ? data[v]?.map((data, idx) => (
                                    <ExmTypography
                                      sx={{ fontSize: "16px" }}
                                      key={`n-${idx}`}
                                    >
                                      {data}
                                    </ExmTypography>
                                  ))
                                : data[v]}
                            </td>
                          ) : (
                            <td>
                              {ternary(
                                areEqual(typeof data[v], "object"),
                                "Answers",
                                data[v]
                              )}
                            </td>
                          )}
                        </React.Fragment>
                      );
                    })}

                    {btnRequire ? (
                      <td>
                        <Link to={`${urlPath}${data._id}`} state={data}>
                          <ExmButton
                            sx={{ height: "25" }}
                            onClick={() => putExmDetailsRdx(data, dispatch)}
                          >
                            {btnLabel}
                          </ExmButton>
                        </Link>

                        {deleteBtn ? (
                          <ExmButton
                            sx={{ height: "25", m: "5px" }}
                            onClick={() => removeData(objectArray, data._id)}
                          >
                            {`Delete`}
                          </ExmButton>
                        ) : (
                          ""
                        )}
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        {/* {ternary(
          tableData?.length >= dataLimit,
          <Pagination
            count={totalPage}
            onChange={(e, value) => setCurrPage(value)}
            color="primary"
          />,
          ""
        )} */}
        {ternary(
          totalPage > 1,
          <Pagination
            count={totalPage}
            onChange={(e, value) => setCurrPage(value)}
            color="primary"
          />,
          ""
        )}
      </Box>
    );
  }
};
