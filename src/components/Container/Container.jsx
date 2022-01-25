import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const StyledBox = styled(Box)`
  min-width: 320px;
  margin-top: 8px;
`;
const StyledCard = styled(Card)`
  min-width: 300px;
`;

export default function Container(props) {
  return (
    <StyledBox>
      <StyledCard variant="outlined">
        <CardContent>
          <Typography variant="h4" component="div">
            {props.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.quantity == 1
              ? props.quantity + " tarefa"
              : props.quantity + " tarefas"}
          </Typography>
          <div style={{ overflow: "auto", padding: "2px", maxHeight: "700px" }}>
            {props.children}
          </div>
        </CardContent>
        <CardActions></CardActions>
      </StyledCard>
    </StyledBox>
  );
}
