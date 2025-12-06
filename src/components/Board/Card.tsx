/** Single Card displayed in BoardDisplay */

import React from "react";
import {
  SHEET_WIDTH,
  SHEET_HEIGHT,
  SHEET_CARD_HEIGHT,
  SHEET_CARD_WIDTH,
  SHEET_SUIT_IDX,
  DEFAULT_CARD_WIDTH,
  CARD_MARGIN,
  SHOW_BACK,
  BACK_SHEET_WIDTH,
  BACK_SHEET_HEIGHT,
  CARD_BACK_WIDTH,
  CARD_BACK_HEIGHT,
} from "../../const/const";
import { Box } from "@mui/material";
import CardSheet from "../../assets/cards2.png";
import CardBack from "../../assets/card_back.jpg";
import { f2v } from "shufflez-calc";

interface Props {
  card: string;
  card_width?: number;
  card_height?: number;
}

const Card: React.FC<Props> = ({ card_width, card_height, card }) => {
  const sc_width = card === SHOW_BACK ? CARD_BACK_WIDTH : SHEET_CARD_WIDTH;
  const sc_height = card === SHOW_BACK ? CARD_BACK_HEIGHT : SHEET_CARD_HEIGHT;

  // get scalars
  let width_scale: number | undefined = undefined;
  let height_scale: number | undefined = undefined;
  if (card_width !== undefined && card_height !== undefined) {
    // can stretch the cards if we want
    width_scale = card_width / sc_width;
    height_scale = card_height / sc_height;
  } else if (card_width !== undefined && card_height === undefined) {
    width_scale = height_scale = card_width / sc_width;
  } else if (card_height !== undefined && card_width === undefined) {
    width_scale = height_scale = card_height / sc_height;
  } else {
    width_scale = height_scale = DEFAULT_CARD_WIDTH / sc_width;
  }
  if (!width_scale || !height_scale) {
    throw new Error("A scalar is undefined");
  }

  // scale the cards
  const card_height_scaled = height_scale * sc_height;
  const card_width_scaled = width_scale * sc_width;

  // scale the background

  const sheet_scaled_width =
    (card === SHOW_BACK ? BACK_SHEET_WIDTH : SHEET_WIDTH) * width_scale;
  const sheet_scaled_height =
    (card === SHOW_BACK ? BACK_SHEET_HEIGHT : SHEET_HEIGHT) * height_scale;

  // get starting corner pixel
  const rank = card === SHOW_BACK ? 0 : f2v[card[0]];
  const suit = card === SHOW_BACK ? 0 : card[1];

  const left_px = (rank - 1) * card_width_scaled;
  const top_px = SHEET_SUIT_IDX[suit] * card_height_scaled;

  return (
    <Box
      sx={{
        marginTop: `${CARD_MARGIN}px`,
        marginBottom: `${CARD_MARGIN}px`,
        width: card_width_scaled,
        height: card_height_scaled,
        backgroundImage:
          card !== SHOW_BACK ? `url(${CardSheet})` : `url(${CardBack})`,
        backgroundPosition: `-${left_px}px -${top_px}px`,
        backgroundSize: `${sheet_scaled_width}px ${sheet_scaled_height}px`,
      }}
    ></Box>
  );
};

export default Card;
