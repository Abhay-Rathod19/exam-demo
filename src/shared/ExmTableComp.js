import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { Box } from "@mui/material";
import { ExmButton } from "./ExmButton";
import { objectKeys, ternary } from "../utils/javaScript";
import { ExmTypography } from "./ExmTypography";

export const ExmTableComponent = ({
    objectArray,
    btnRequire = true,
    showNotes = false,
    btnLabel = "View Details",
}) => {
    const [currPage, setCurrPage] = useState(1);

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

                                                    {
                                                        showNotes ?
                                                            (
                                                                <td>
                                                                    {typeof data[v] === "object"
                                                                        ? data[v]?.map((data, idx) => (
                                                                            <ExmTypography sx={{ fontSize: '16px' }} key={`n-${idx}`}>
                                                                                {data}
                                                                            </ExmTypography>
                                                                        ))
                                                                        : data[v]}
                                                                </td>
                                                            )
                                                            :
                                                            (
                                                                <td>
                                                                    {
                                                                        ternary(
                                                                            typeof data[v] === "object",
                                                                            "Answers",
                                                                            data[v]
                                                                        )}
                                                                </td>
                                                            )
                                                    }
                                                </React.Fragment>
                                            );
                                        })}

                                        {btnRequire ? (
                                            <td>
                                                <Link to={`/dashboard/StudentDetails?id=${data._id}`}>
                                                    <ExmButton sx={{ height: "25" }}>
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
