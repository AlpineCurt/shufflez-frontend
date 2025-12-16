/** Display of made hands and draws when given a range
 * and a board
 */

import { Box } from "@mui/material";
import HandDropDown from "./HandDropDown";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AnyAction } from "../../const/types";

interface Props {
  actionsArr: AnyAction[];
  res?: { [handType: string]: string[] };
}

const Flopzilla: React.FC<Props> = ({ actionsArr }) => {
  return (
    <Box
      sx={{
        minWidth: "250px",
        minHeight: "500px",
        padding: "5px",
        backgroundColor: "lightblue",
      }}
    >
      <HandDropDown label="derp" actionsArr={actionsArr}>
        <HandDropDown label="hurr" actionsArr={actionsArr} />
      </HandDropDown>
    </Box>
  );
};

export default Flopzilla;
