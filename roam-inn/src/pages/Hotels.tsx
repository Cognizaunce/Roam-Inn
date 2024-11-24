import React from "react";
import { HotelsData } from "./DashboardPage";

interface Props {
  hotels: HotelsData[]
}

const Hotels: React.FC<any> = ({hotels}: Props) : JSX.Element => {
  return (
    <>
      <h1>Hotels Component</h1>
    </>
  );
}

export default Hotels;