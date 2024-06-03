import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { ExmButton } from "./ExmButton";
import { objectKeys, setToLocalStorage, ternary } from "../utils/javaScript";
import { ExmTypography } from "./ExmTypography";
import { addExmNameData, removeAllQues } from "../redux/slices/teacherSlice";
import { removeExmPaper, rmvNoticeMsg } from "../redux/slices/studentSlice";


export const ExmTableComponent = ({
  objectArray,
  btnRequire = true,
  showNotes = false,
  btnLabel = "View Details",
  urlPath,
}) => {
  const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();

  const putExmDetailsRdx = (details) => {
    if (details.subjectName && details.notes) {
      dispatch(rmvNoticeMsg());
      dispatch(removeExmPaper());
      dispatch(removeAllQues());
      const exmDetails = { name: details.subjectName, notes: details.notes };
      setToLocalStorage("ExamDetails", JSON.stringify(exmDetails));
      dispatch(addExmNameData(details));
    }
  }

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
    const totalPage = Math.ceil(objectArray.length / dataLimit);
    const tableData = objectArray?.slice(startInd, lastInd);

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
                          <ExmButton sx={{ height: "25" }} onClick={() => putExmDetailsRdx(data)}>
                            {btnLabel}
                          </ExmButton>
                        </Link>
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
