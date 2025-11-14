import React, { memo, useCallback } from "react";
import { useAppSelector as useSelector } from "../../hooks.ts/redux_hooks";
import { RootState } from "../../config/store";
import { Box } from "@mui/material";
import {
  CELL_MAX_HEIGHT,
  CELL_MAX_WIDTH,
  CELL_FONT_SIZE,
  CELL_BORDER_STYLE,
  ACTION_ORDER,
} from "../../const/const";
import { CellInfo } from "../../const/types";

interface Props {
  label: string;
  row: number;
  col: number;
  totalCombos: number;
  selectable: boolean;
  selected: boolean;
  setHoveringCell: React.Dispatch<React.SetStateAction<string>>;
  handleOnMouseDown: (combo: string) => void;
  cellInfo?: CellInfo;
}

const Cell: React.FC<Props> = memo(
  ({
    label,
    row,
    col,
    totalCombos,
    selectable,
    selected,
    setHoveringCell,
    handleOnMouseDown,
    cellInfo,
  }) => {
    /** Style selectors */
    const colors: { [action: string]: string } = useSelector(
      (state: RootState) => state.style.colors
    );
    const {
      selected: selected_color,
      suited_bg,
      offsuit_bg,
      pp_bg,
      suited_unselectable: suited_unsel_bg,
      pp_unselectable: pp_unsel_bg,
      offsuit_unselectable: offsuit_unsel_bg,
    } = colors;
    const fontSize =
      useSelector((state: RootState) => state.style.gridFontSize) ??
      CELL_FONT_SIZE;

    const bg_color = selected
      ? selected_color
      : selectable && label.length === 2
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

    const getBackground = useCallback((): string => {
      if (selected) {
        return selected_color;
      }
      const selectableBg =
        label.length === 2
          ? pp_bg
          : label[2].toLowerCase() === "s"
          ? suited_bg
          : offsuit_bg;
      const unselectableBg =
        label.length === 2
          ? pp_unsel_bg
          : label[2].toLowerCase() === "s"
          ? suited_unsel_bg
          : offsuit_unsel_bg;
      if (!cellInfo) {
        return selectable ? selectableBg : unselectableBg;
      }
      let act_combo_count = 0;
      const act_counts_arr = Object.entries(cellInfo.actions)
        .map((e) => e)
        .sort(
          ([action1, count1], [action2, count2]) =>
            ACTION_ORDER.indexOf(action1) - ACTION_ORDER.indexOf(action2)
        );
      let last_pct: number = 0;
      let act_counts_str = "";
      for (let i = 0; i < act_counts_arr.length; i++) {
        const [action, count] = act_counts_arr[i];
        act_counts_str += `, ${colors[action]} ${last_pct}% `;
        const pct = last_pct + Math.round((count / totalCombos) * 100);
        act_counts_str += `${pct}%`;
        last_pct = pct;
      }
      act_counts_str += `, ${bg_color} ${last_pct}% 100%`;
      return `linear-gradient(to top${act_counts_str})`;
      return "red";
    }, [
      selected,
      label,
      cellInfo,
      selected_color,
      pp_bg,
      suited_bg,
      offsuit_bg,
      pp_unsel_bg,
      suited_unsel_bg,
      offsuit_unsel_bg,
    ]);

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
          background: getBackground(),
          userSelect: "none",
        }}
        onMouseOver={() => setHoveringCell(label)}
        onMouseDown={() => handleOnMouseDown(label)}
      >
        {label}
      </Box>
    );
  }
);
export default Cell;
