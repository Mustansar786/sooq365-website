import React from 'react';
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

interface IReactLoader{
    loading:boolean
}
export default function ReactLoader({loading}:IReactLoader) {
    return (
        <PuffLoader color="#56C3C5" loading={loading} css={override}  size={50}/>
    )
}
