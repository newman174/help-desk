// TicketResponseForm.tsx

import React, { useState } from "react";
import { Alert, TextField, Button, Box, Typography } from "@mui/material";
import { sendResponse } from "../services/ticketService";
import { Ticket, AlertInterface } from "../types/types";

interface TicketResponseFormProps {
  ticket: Ticket;
  // eslint-disable-next-line no-unused-vars
  handleTicketUpdate: (updatedTicket: Ticket) => void;
}

const TicketResponseForm: React.FC<TicketResponseFormProps> = ({
  ticket,
  handleTicketUpdate,
}) => {
  const [body, setBody] = useState(
    "Hello,\n\nWe will get back to you soon.\n\nThank you"
  );
  const [alert, setAlert] = useState<AlertInterface | "">("");
  const { id } = ticket;

  const validBody = (): boolean => {
    return body.trim().length > 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validBody()) {
      const updatedTicket = await sendResponse(id, body);
      if (updatedTicket) {
        handleTicketUpdate(updatedTicket);
        setBody("");
        setAlert({
          message: "Response successfully sent.",
          severity: "success",
        });
      } else {
        setAlert({
          message: "Error sending response.",
          severity: "error",
        });
      }
      setTimeout(() => {
        setAlert("");
      }, 10000);
    }
  };

  return (
    <>
      {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" style={{ marginTop: "3rem" }}>
          Send a Response
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Response Message"
            multiline
            rows={10}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            margin="normal"
            required={true}
            style={{ minWidth: "40rem" }}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default TicketResponseForm;
