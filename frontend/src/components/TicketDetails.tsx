// TicketDetails.tsx

import React, { useState } from "react";
import { Ticket, StatusOption, AlertInterface } from "../types/types";
import {
  Alert,
  Button,
  Card,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

import ResponseDisplay from "./ResponseDisplay";
import { updateStatus } from "../services/ticketService";

interface TicketDisplayProps {
  ticket: Ticket;
  // eslint-disable-next-line no-unused-vars
  handleTicketUpdate: (updatedTicket: Ticket) => void;
}

const statusOptions: StatusOption[] = ["new", "in progress", "resolved"];

const isStatusOption = (val: string): val is StatusOption => {
  return ["new", "in progress", "resolved"].includes(val);
};

const TicketDetails: React.FC<TicketDisplayProps> = ({
  ticket,
  handleTicketUpdate,
}) => {
  const { id, name, email, createdAt, description, responses } = ticket;
  const [status, setStatus] = useState<StatusOption>(ticket.status);
  const [newStatus, setNewStatus] = useState<StatusOption>(status);
  const [alert, setAlert] = useState<AlertInterface | "">("");

  const handleStatusChange = (e: SelectChangeEvent) => {
    const { value } = e.target;

    if (isStatusOption(value)) {
      setNewStatus(value);
    } else {
      throw new Error("Invalid status");
    }
  };

  const statusChanged = (): boolean => status !== newStatus;

  return (
    <>
      <Card key={id} style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Ticket Details
        </Typography>
        <TableContainer>
          <Table className="ticket-display">
            <TableBody>
              {[
                ["Ticket Id", id],
                ["Name", name],
                ["Email", email],
                ["Date", createdAt.toLocaleString()],
              ].map((field) => {
                return (
                  <TableRow key={id + field[0]}>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        style={{ textAlign: "center" }}
                      >
                        {field[0]}
                      </Typography>
                    </TableCell>
                    <TableCell>{field[1]}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow key={id + "status"}>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ textAlign: "center" }}
                  >
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Select
                    value={newStatus}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    {statusOptions.map((opt) => {
                      return (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Button
                    style={{
                      display: statusChanged() ? "inline-block" : "none",
                    }}
                    onClick={async () => {
                      const updatedTicket = await updateStatus(id, newStatus);
                      if (updatedTicket) {
                        setStatus(updatedTicket.status);
                        handleTicketUpdate(updatedTicket);
                        setAlert({
                          message: "Ticket status updated successfully.",
                          severity: "success",
                        });
                      } else {
                        setAlert({
                          message: "Error updating ticket status.",
                          severity: "error",
                        });
                      }
                      setTimeout(() => {
                        setAlert("");
                      }, 10000);
                    }}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          variant="h4"
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          Description
        </Typography>
        <Typography
          variant="body1"
          style={{
            whiteSpace: "pre-line",
            textAlign: "justify",
            margin: "3rem",
            maxWidth: "50rem",
            display: "inline-block",
          }}
        >
          {description}
        </Typography>
      </Card>
      {responses.map((response) => (
        <Card key={response.id} style={{ marginTop: "3rem" }}>
          <ResponseDisplay response={response} />
        </Card>
      ))}
    </>
  );
};

export default TicketDetails;
