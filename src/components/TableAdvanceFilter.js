import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Box, IconButton, Typography } from "@mui/material";

const TableAdvanceFilter = ({ title, filterData, deleteFilter }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {filterData?.length > 0 && (
        <Box sx={{ display: "flex", marginTop: "24px" }}>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "secondary.main",
              width: "100%",
              paddingX: "10px",
              gap: "8px",
              alignItems: "center",
              borderRadius: "4px",
            }}
          >
            <IconButton
              sx={{ paddingX: "4px", paddingY: "4px" }}
              onClick={() => deleteFilter()}
            >
              <CloseIcon
                sx={{
                  fontSize: "14px",
                  color: "white",
                }}
              />
            </IconButton>

            <Typography
              sx={{
                color: "white",
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Typography>
          </Box>

          {filterData?.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  width: "100%",
                  paddingX: "8px",
                  alignItems: "center",
                }}
              >
                <DoneIcon sx={{ color: "secondary.main" }} />
                <Typography
                  sx={{ color: "secondary.main", whiteSpace: "nowrap" }}
                >
                  {item}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default TableAdvanceFilter;
