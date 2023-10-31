import React, { useState, useEffect } from "react";

import { Ticket } from "../types/types";
import { getTickets } from "../services/ticketService";
import TicketDisplay from "./TicketDisplay";
import TicketTable from "./TicketTable";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

interface Props {}

const AdminPanel: React.FC<Props> = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: Ticket[] = await getTickets();
      setTickets(data);
    };

    fetchData();
  }, []);

  const handleSelectedTicketChange = (ticket: Ticket) =>
    setSelectedTicket(ticket);

  const handleTicketUpdate = (updatedTicket: Ticket) => {
    setSelectedTicket(updatedTicket);
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === updatedTicket.id) {
          return updatedTicket;
        } else {
          return ticket;
        }
      })
    );
  };

  return (
    <>
      <Link to={"/"}>Home</Link>
      <Typography variant="h3" style={{ textAlign: "center", margin: "3rem" }}>
        Ticket Admin Panel
      </Typography>
      <TicketTable
        tickets={tickets}
        handleSelectedTicketChange={handleSelectedTicketChange}
      />
      {selectedTicket && (
        <TicketDisplay
          ticket={selectedTicket}
          handleTicketUpdate={handleTicketUpdate}
        />
      )}
    </>
  );
};

export default AdminPanel;
