import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { ExmButton } from "./ExmButton";
import { objectKeys, ternary } from "../utils/javaScript";
import { ExmTypography } from "./ExmTypography";
import { putExmDetailsRdx } from "../helpers/studentModule/studentActions";
import { ExmInputField } from "./ExmInputField";
import { ExmLabel } from "./ExmLabel";
import { deleteExam } from "../helpers/teacherModule/teacherActions";

export const ExmTableComponent = ({
  objectArray,
  btnRequire = true,
  showNotes = false,
  btnLabel = "View Details",
  urlPath,
  deleteBtn,
}) => {
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  if (objectArray[0]) {
    const column = objectKeys(objectArray[0]);
    const headerArr = ternary(
      btnRequire,
      column?.map((item) => item?.toUpperCase()).concat("DETAILS"),
      column?.map((item) => item?.toUpperCase())
    );
    const dataLimit = 8;
    const lastInd = currPage * dataLimit;
    const startInd = lastInd - dataLimit;
    const totalPage = Math.ceil(objectArray?.length / dataLimit);
    const tableData = objectArray
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
      })?.slice(startInd, lastInd);

    const removeElement = (id) => {
      const index = tableData?.findIndex((element) => element?._id === id);
      tableData?.splice(index, 1);
      console.log(`Data are : `, tableData);
    }

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
                    <th>{item}</th>
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
                              {typeof data[v] === "object"
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
                                typeof data[v] === "object",
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
                        <Link to={`${urlPath}${data._id}`}>
                          <ExmButton
                            sx={{ height: "25" }}
                            onClick={() => putExmDetailsRdx(data, dispatch)}
                          >
                            {btnLabel}
                          </ExmButton>
                        </Link>

                        {deleteBtn ? (
                          <ExmButton
                            sx={{ height: "25", m: "0 10px" }}
                            onClick={() => {
                              // deleteExam(data._id, navigate);
                              removeElement(data._id);
                            }
                            }
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
