import React from 'react'
import { Box, Button, Typography } from "@mui/material";
import { ChairOutlined } from "@mui/icons-material";

export default function Seat({ seat, isBooked, isSelected, onSeatSelection }) {

  return (
    <Button
            style={{
              position: "absolute",
              left: seat.position[0],
              top: seat.position[1],
              width: "60px",
              height: "60px",
              minWidth: "60px",
              minHeight: "60px",
              backgroundColor: isBooked ? "#ff9999" : isSelected ? "#99ff99" : "white",
              border: "1px solid black",
              borderRadius: "4px",
              transition: "background-color 0.3s",
            }}
            // onMouseEnter={(e) =>
            //   (e.currentTarget.style.backgroundColor = "#ddd")
            // }
            // onMouseLeave={(e) =>
            //   (e.currentTarget.style.backgroundColor = "white")
            // }
            disabled={isBooked}
            onClick={() => onSeatSelection(seat._id)}
          >
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <ChairOutlined
              style={{ color: "black", fontSize: "32px" }}
              sx={{
                "& path": {
                  stroke: "black",
                  strokeWidth: "0.02", // Make the chair outline thinner
                },
              }}
            />
            <Typography color="initial" variant="body2" >
              {seat.name}
            </Typography>
            </Box>
          </Button>
  )
}
