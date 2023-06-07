import { useState } from "react";
import { css } from "@emotion/react";
import Spinner from "react-spinners/PuffLoader";

const Loader = ({loading}) => {

  return (
      <Spinner color="#56C3C5" loading={loading}  size={50} />
  );
}

export default Loader;