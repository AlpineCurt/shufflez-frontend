import React from "react";
import { useAppSelector as useSelector } from "../../hooks.ts/redux_hooks";
import { RootState } from "../../config/store";
import { Box } from "@mui/material";

const DEFAULT_WIDTH = 16;
const DEFAULT_HEIGHT = 16;

interface Props {
  actionType: string;
  width?: number;
  height?: number;
}

const ActionBox: React.FC<Props> = ({ actionType, width, height }) => {
  const colors: { [action: string]: string } = useSelector(
    (state: RootState) => state.style.colors
  );
  return (
    <Box
      sx={{
        width: width ?? DEFAULT_WIDTH,
        height: height ?? DEFAULT_HEIGHT,
        backgroundColor: colors[actionType],
        marginLeft: "4px",
        marginRight: "4px",
      }}
    ></Box>
  );
};

export default ActionBox;
