import React, { useState, useEffect, useCallback } from "react";
import Cell from "./Cell";
import { f2v, CELL_MAX_WIDTH } from "../../const/const";
import { Box } from "@mui/material";

interface Props {
  selectableRange?: string[];
}

const RangeMatrix: React.FC<Props> = ({ selectableRange }) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  /** true = adding combos to seleciton. false = removing combos from selection */
  const [selecting, setSelecting] = useState<boolean>(false);

  /** All selected combos */
  const [selectedCombos, setSelectedCombos] = useState<{
    [combo: string]: string[];
  }>({});

  /** Cell over which the mouse currently is */
  const [hoveringCell, setHoveringCell] = useState<string>("");

  const handleOnMouseDown = () => {
    // determine if we are selecing or deselecting combos
    /** Check if current number of selected combos is less than maximum
     * selectable combos?  How do we determine and store maximum selectable combos?
     */
  };

  useEffect(() => {
    if (isMouseDown) {
      // select or deselect combos; update selectedCombos
    }
  }, [isMouseDown, hoveringCell]);

  const ranks = ["A", "K", "Q", "J", "T", 9, 8, 7, 6, 5, 4, 3, 2];
  const cells = ranks
    .map((r1, i) =>
      ranks.map((r2, j) => {
        const r1_: number = f2v[r1];
        const r2_: number = f2v[r2];
        let label = r1_ > r2_ ? `${r1}${r2}` : `${r2}${r1}`;
        if (j > i) {
          label += "s";
        } else if (j < i) {
          label += "o";
        }
        return (
          <Cell
            key={label}
            label={label}
            row={i + 1}
            col={j + 1}
            selectable={
              selectableRange && !selectableRange.includes(label) ? false : true
            }
            setHoveringCell={setHoveringCell}
          />
        );
      })
    )
    .flat();
  return (
    <Box
      component={"div"}
      sx={{
        display: "grid",
        gridAutoColumns: "max-content",
        width: CELL_MAX_WIDTH * 13,
      }}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {cells}
    </Box>
  );
};

export default RangeMatrix;
