// ResponseDisplay.tsx;

import { Card, Typography } from "@mui/material";
import { TicketResponse } from "../types/types";

interface Props {
  response: TicketResponse;
}

const ResponseDisplay: React.FC<Props> = ({ response }) => {
  return (
    <Card key={response.id} style={{ margin: "4rem" }}>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        Response sent at {response.createdAt.toLocaleString()}:
      </Typography>

      <Typography
        variant="body1"
        style={{
          whiteSpace: "pre-line",
          textAlign: "justify",
          margin: "1rem",
          maxWidth: "50rem",
          display: "inline-block",
        }}
      >
        {response.message}
      </Typography>
    </Card>
  );
};

export default ResponseDisplay;
