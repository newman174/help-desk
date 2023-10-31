// TicketTable.tsx;

import React, { useState, useEffect } from "react";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { StatusOption, Ticket } from "../types/types";
import Pagination from "./Pagination";

interface Props {
  tickets: Ticket[];
  // eslint-disable-next-line no-unused-vars
  handleSelectedTicketChange: (ticket: Ticket) => void;
}

const AdminPanel: React.FC<Props> = ({
  tickets,
  handleSelectedTicketChange,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setTotalRows(tickets.length);
    };

    fetchData();
  }, [tickets.length]);

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const statusColor = (status: StatusOption) => {
    switch (status) {
      case "new":
        return "primary";
      case "in progress":
        return "warning";
      case "resolved":
        return "success";
      default:
        return "primary";
    }
  };

  return (
    <>
      <Pagination
        onPageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        count={totalRows}
      />
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table style={{ width: "100%" }} className="ticket-table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Responses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((ticket) => (
                <TableRow
                  key={ticket.id}
                  onClick={() => handleSelectedTicketChange(ticket)}
                >
                  <TableCell>{ticket.createdAt.toLocaleString()}</TableCell>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>
                    <Chip
                      label={ticket.status}
                      color={statusColor(ticket.status)}
                    />
                  </TableCell>
                  <TableCell>{ticket.name.slice(0, 30)}</TableCell>
                  <TableCell>{ticket.email.slice(0, 30)}</TableCell>
                  <TableCell>{ticket.responses.length}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminPanel;
