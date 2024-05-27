import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { ExmButton } from "../shared/ExmButton";
import { ExmTypography } from "../shared/ExmTypography";

export const DashBoardComp = () => {
    const sideList = [
        "Show all student data",
        "Verified students",
        "Create exam",
        "View exam",
        "View exam details",
    ];

    return (
        <Box
            sx={{ width: 1, display: "flex", height: "100%" }}
            className="dashboard-main-container"
        >
            <Box className="dashboard-sidebar" sx={{ width: 1 / 5, borderRight: 2, }}>
                <ExmTypography
                    variant="h4"
                    sx={{ textAlign: "left", p: "15px 0 15px 10px ", borderBottom: 2 }}
                >
                    Dashboard
                </ExmTypography>

                {sideList?.map((element, index) => {
                    return (
                        <ExmButton
                            key={`btn-${index}`}
                            variant="text"
                            sx={{
                                p: "15px 10px",
                                width: 1,
                                display: "block",
                                my: "1px",
                                textAlign: "left",
                                fontSize: "15px",
                                borderBottom: 1,
                                borderRadius: 0,
                            }}
                        >
                            {element}
                        </ExmButton>
                    );
                })}
            </Box>
            <Box
                className="dashboard-content-container"
                sx={{ width: "75%", p: "20px 10px" }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};
