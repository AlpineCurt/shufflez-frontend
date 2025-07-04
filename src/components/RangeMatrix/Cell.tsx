import React, { memo } from "react";
import { useAppSelector as useSelector } from "../../hooks.ts/redux_hooks";
import { RootState } from "../../config/store";
import { Box } from "@mui/material";
import {
  CELL_MAX_HEIGHT,
  CELL_MAX_WIDTH,
  CELL_FONT_SIZE,
  CELL_BORDER_STYLE,
} from "../../const/const";

interface Props {
  label: string;
  row: number;
  col: number;
  selectable: boolean;
  setHoveringCell: React.Dispatch<React.SetStateAction<string>>;
}

const Cell: React.FC<Props> = ({
  label,
  row,
  col,
  selectable,
  setHoveringCell,
}) => {
  /** Style selectors */
  const fontSize =
    useSelector((state: RootState) => state.style.gridFontSize) ??
    CELL_FONT_SIZE;
  const suited_bg = useSelector((state: RootState) => state.style.suited_bg);
  const offsuit_bg = useSelector((state: RootState) => state.style.offsuit_bg);
  const pp_bg = useSelector((state: RootState) => state.style.pp_bg);
  const suited_unsel_bg = useSelector(
    (state: RootState) => state.style.suited_unselectable
  );
  const offsuit_unsel_bg = useSelector(
    (state: RootState) => state.style.offsuit_unselectable
  );
  const pp_unsel_bg = useSelector(
    (state: RootState) => state.style.pp_unselectable
  );

  const bg_color =
    selectable && label.length === 2
      ? pp_bg
      : selectable && label[2].toLowerCase() === "s"
      ? suited_bg
      : selectable
      ? offsuit_bg
      : label.length === 2
      ? pp_unsel_bg
      : label[2].toLowerCase() === "s"
      ? suited_unsel_bg
      : offsuit_unsel_bg;

  const num_of_combos =
    label.length === 2 ? 6 : label[2].toLowerCase() === "s" ? 4 : 12;

  return (
    <Box
      sx={{
        display: "flex",
        gridRow: row,
        gridColumn: col,
        width: CELL_MAX_WIDTH,
        height: CELL_MAX_HEIGHT,
        borderBottom: CELL_BORDER_STYLE,
        borderRight: CELL_BORDER_STYLE,
        borderTop: row === 1 ? CELL_BORDER_STYLE : "auto",
        borderLeft: col === 1 ? CELL_BORDER_STYLE : "auto",
        fontSize: fontSize,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bg_color,
        userSelect: "none",
      }}
      onMouseOver={() => setHoveringCell(label)}
    >
      {label}
    </Box>
  );
};
export default Cell;
