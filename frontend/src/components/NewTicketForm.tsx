import React, { useState } from "react";
import { Alert, TextField, Button, Box } from "@mui/material";
import { createTicket } from "../services/ticketService";
import { Link } from "react-router-dom";
import { AlertInterface } from "../types/types";

interface NewTicketFormProps {
  // onSubmit: (formData: FormData) => void;
}

const NewTicketForm: React.FC<NewTicketFormProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState<AlertInterface | "">("");

  const validEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };
  const validName = (): boolean => {
    return name.trim().length > 0;
  };

  const validDescription = (): boolean => {
    return description.trim().length > 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validEmail() && validName() && validDescription()) {
      createTicket({
        email,
        name: name.trim(),
        description: description.trim(),
      });
      setName("");
      setEmail("");
      setDescription("");

      setAlert({
        message: "Help request submitted successfully.",
        severity: "success",
      });
      setTimeout(() => {
        setAlert("");
      }, 20000);
    }
  };

  return (
    <>
      <Link to={"/admin"}>Admin</Link>
      {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      <form onSubmit={handleSubmit}>
        <h2>Submit a Help Ticket</h2>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            margin="normal"
            required={true}
            style={{ minWidth: "40rem" }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value.trim())}
            margin="normal"
            required={true}
            style={{ minWidth: "40rem" }}
          />
          <TextField
            label="Please describe your problem."
            multiline
            rows={10}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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

export default NewTicketForm;
