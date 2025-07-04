import React, { useState, useEffect, useCallback, useRef } from "react";
import RangeMatrix from "../components/RangeMatrix/RangeMatrix";
import RangeText from "../components/RangeText/RangeText";
import { Grid, Box } from "@mui/material";

interface Props {}

const ShufflezPage: React.FC<Props> = () => {
  const [rangeTextValue, setRangeTextValue] = useState<string>("");

  return (
    <Grid container spacing={2}>
      <Grid size={7}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <RangeMatrix />
          <RangeText
            rangeTextValue={rangeTextValue}
            setRangeTextValue={setRangeTextValue}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ShufflezPage;
