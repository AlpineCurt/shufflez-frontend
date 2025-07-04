import React from "react";
import { Box, TextField } from "@mui/material";
import { CELL_MAX_WIDTH } from "../../const/const";

interface Props {
  rangeTextValue: string;
  setRangeTextValue: React.Dispatch<string>;
}

const RangeText: React.FC<Props> = ({ rangeTextValue, setRangeTextValue }) => {
  return (
    <TextField
      sx={{ width: CELL_MAX_WIDTH * 13 + 14 }}
      onChange={(evt) => setRangeTextValue(evt.target.value)}
    />
  );
};

export default RangeText;
