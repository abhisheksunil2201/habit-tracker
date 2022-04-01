import { Tooltip as MaterialTooltop, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Tooltip = styled(({ className, ...props }) => (
  <MaterialTooltop {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000",
  },
}));
