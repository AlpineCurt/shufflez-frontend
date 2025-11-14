/** Cells update when being dragged, but only after the mouse has left the
 * cell or after button released
 */

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Cell from "./Cell";
import { f2v, CELL_MAX_WIDTH, ranks } from "../../const/const";
import { Box } from "@mui/material";
import { ActionsObj, CellActions } from "../../const/types";
import { combo2CellLabel } from "../../helper/helpers";

interface Props {
  selectableRange?: Set<string>;
}

const test_actionsObject: ActionsObj = {
  raise: ["AhAs", "AhAd", "KsQs", "KsQh", "AsTc", "AsTh", "AsTd"],
  call: [
    "KhKc",
    "KsKh",
    "KsKd",
    "As5s",
    "Ac5c",
    "Ah5h",
    "Ad5d",
    "JsTc",
    "JsTh",
    "JsTd",
  ],
  fold: ["AsAd", "AsAc", "KsKc"],
};

const RangeMatrix: React.FC<Props> = ({ selectableRange }) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  /** true = adding combos to seleciton. false = removing combos from selection */
  const [selecting, setSelecting] = useState<boolean>(false);

  /** All selected combos */
  const [selectedCombos, setSelectedCombos] = useState<Set<string>>(
    new Set<string>()
  );

  const [actionsObj, setActionsObj] = useState<ActionsObj | undefined>(
    undefined
  );

  // useEffect(() => {
  //   /** test code */
  //   setActionsObj({ ...test_actionsObject });
  // }, []);

  const cellActions: CellActions | undefined = useMemo(() => {
    if (!actionsObj) {
      return undefined;
    }
    return Object.entries(actionsObj).reduce(
      (acc: CellActions, [action, combos]) => {
        for (const combo of combos) {
          const cellLabel: string = combo2CellLabel(combo);
          if (!acc[cellLabel]) {
            acc[cellLabel] = {
              selectableCombos: 0,
              actions: {},
            };
          }
          acc[cellLabel].selectableCombos += 1;
          if (!acc[cellLabel].actions[action]) {
            acc[cellLabel].actions[action] = 0;
          }
          acc[cellLabel].actions[action] += 1;
        }
        return acc;
      },
      {}
    );
  }, [actionsObj]);

  /** Cell over which the mouse currently is */
  const [hoveringCell, setHoveringCell] = useState<string>("");

  const handleOnMouseDown = useCallback(
    (combo: string) => {
      // determine if we are selecing or deselecting combos
      if (selectedCombos.has(combo)) {
        setSelecting(false);
      } else {
        setSelecting(true);
      }
    },
    [setSelecting, selectedCombos]
  );

  useEffect(() => {
    if (isMouseDown) {
      if (selecting) {
        setSelectedCombos((sc) => {
          sc.add(hoveringCell);
          return sc;
        });
      } else {
        setSelectedCombos((sc) => {
          sc.delete(hoveringCell);
          return sc;
        });
      }
    }
  }, [isMouseDown, hoveringCell, selecting]);

  const cells = ranks
    .map((r1, i) =>
      ranks.map((r2, j) => {
        const r1_: number = f2v[r1];
        const r2_: number = f2v[r2];
        let label = r1_ > r2_ ? `${r1}${r2}` : `${r2}${r1}`;
        let totalCombos = 6;
        if (j > i) {
          label += "s";
          totalCombos = 4;
        } else if (j < i) {
          label += "o";
          totalCombos = 12;
        }
        return (
          <Cell
            key={label}
            label={label}
            row={i + 1}
            col={j + 1}
            totalCombos={totalCombos}
            selectable={(cellActions && !!cellActions[label]) ?? true}
            selected={selectedCombos.has(label)}
            setHoveringCell={setHoveringCell}
            handleOnMouseDown={handleOnMouseDown}
            cellInfo={cellActions ? cellActions[label] : undefined}
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
