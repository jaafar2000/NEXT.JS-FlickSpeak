import React from "react";
import { Pagination } from "@mui/material";

const CustomPagintaion = ({ setPage }) => {
  const handePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="pageInation">
      <Pagination
        count={20}
        onChange={(e) => handePageChange(e.target.textContent)}
      />
    </div>
  );
};

export default CustomPagintaion;
