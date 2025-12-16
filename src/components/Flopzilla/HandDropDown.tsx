/** Displays a made hand type, basic stats, and three boxes
 * for selecing which action to place it in.
 * Expandable if given child components.
 */

import { Box } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  JSX,
  PropsWithChildren,
} from "react";
import ExpandArrow from "../common/ExpandArrow";
import { BET, CALL, CHECK, FOLD, RAISE } from "../../const/const";
import { AnyAction } from "../../const/types";
import ActionBox from "./ActionBox";

interface Props {
  label: string;
  actionsArr: AnyAction[];
  children?: React.ReactNode;
}

const HandDropDown: React.FC<Props> = ({
  label,
  actionsArr,
  children,
}: PropsWithChildren<Props>) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Box key={label} sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          minWidth: "200px",
          minHeight: "20px",
          backgroundColor: "blue",
          border: "1px solid black",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ExpandArrow
          disabled={!children}
          expanded={expanded}
          setExpanded={setExpanded}
        />

        <Box sx={{ paddingLeft: "4px", paddingRight: "4px", width: "150px" }}>
          {label}
        </Box>
        {actionsArr.map((a) => (
          <ActionBox key={`${label}${a}`} actionType={a} />
        ))}
      </Box>
      {expanded && children && (
        <Box sx={{ marginLeft: "10px" }}>{children}</Box>
      )}
    </Box>
  );
};

export default HandDropDown;
