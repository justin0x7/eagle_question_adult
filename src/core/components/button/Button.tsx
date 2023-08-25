import { Button, styled } from "@mui/material";

export const ButtonPrimary = styled(Button)({
  minWidth: "166px",
  backgroundColor: "#007A5E",
  padding: "14px 10px",
  borderRadius: "999px",
  fontWeight: "bold",
  color: "white",
  "&:hover": {
    backgroundColor: "#005743",
  }
});

export const ButtonSecondary = styled(Button)({
  minWidth: "166px",
  backgroundColor: "#7BC29A",
  padding: "14px 10px",
  borderRadius: "999px",
  fontWeight: "bold",
  color: "white",
  "&:hover": {
    backgroundColor: "#569772",
  }
});