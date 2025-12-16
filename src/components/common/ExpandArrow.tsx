import { Box } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Dispatch } from "react";

interface Props {
  disabled: boolean;
  expanded: boolean;
  setExpanded: Dispatch<boolean>;
}

const ExpandArrow: React.FC<Props> = ({ disabled, expanded, setExpanded }) => {
  return (
    <Box
      sx={{ width: "24px", height: "24px" }}
      onClick={() => setExpanded(!expanded)}
    >
      {disabled ? <></> : expanded ? <ExpandLess /> : <ExpandMore />}
    </Box>
  );
};

export default ExpandArrow;
