/** Display and select the board cards */

import { Box } from "@mui/material";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Card from "./Card";
import { SHOW_BACK } from "../../const/const";

interface Props {
  card_width?: number;
  card_height?: number;
  board?: string[];
}

const BoardDisplay: React.FC<Props> = ({ board, card_height, card_width }) => {
  const cards: string[] = [];

  if (board && (board.length < 3 || board.length > 5)) {
    throw new Error("board must be 3-5 cards");
  }

  for (let i = 0; i < 5; i++) {
    if (board && board[i]) {
      cards.push(board[i]);
    } else {
      cards.push(SHOW_BACK);
    }
  }

  return (
    <Box
      sx={{
        width: "300px",
        height: "101",
        backgroundColor: "rgba(179, 179, 179, 1)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {cards.map((c, i) => (
        <Card
          key={`${c}_${i}`}
          card={c}
          card_width={card_width}
          card_height={card_height}
        />
      ))}
    </Box>
  );
};

export default BoardDisplay;
