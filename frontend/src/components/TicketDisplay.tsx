// TicketDisplay.tsx;

import React from "react";
import { Ticket } from "../types/types";

import TicketDetails from "./TicketDetails";
import TicketResponseForm from "./TicketResponseForm";

interface TicketDisplayProps {
  ticket: Ticket;
  // eslint-disable-next-line no-unused-vars
  handleTicketUpdate: (updatedTicket: Ticket) => void;
}

const TicketDisplay: React.FC<TicketDisplayProps> = ({
  ticket,
  handleTicketUpdate,
}) => {
  return (
    <>
      <TicketDetails handleTicketUpdate={handleTicketUpdate} ticket={ticket} />
      <TicketResponseForm
        handleTicketUpdate={handleTicketUpdate}
        ticket={ticket}
      />
    </>
  );
};

export default TicketDisplay;
