// TablePagination.tsx

import TablePagination from "@mui/material/TablePagination";
import React from "react";

interface Props {
  onPageChange: (
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<HTMLButtonElement> | null,
    // eslint-disable-next-line no-unused-vars
    page: number
  ) => void;
  handleRowsPerPageChange: (
    // eslint-disable-next-line no-unused-vars
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  page: number;
  rowsPerPage: number;
  count: number;
}

const Pagination: React.FC<Props> = ({
  onPageChange,
  handleRowsPerPageChange,
  page,
  rowsPerPage,
  count,
}) => (
  <TablePagination
    component="div"
    count={count}
    page={page}
    onPageChange={onPageChange}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleRowsPerPageChange}
  />
);

export default Pagination;
