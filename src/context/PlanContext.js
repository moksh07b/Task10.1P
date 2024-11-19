import React, { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export const usePlan = () => {
  return useContext(PlanContext);
};


export const PlanProvider = ({ children }) => {
  const [plan, SetPlan] = useState("Standard");

  return (
    <PlanContext.Provider value={{ plan, SetPlan }}>
      {children}
    </PlanContext.Provider>
  );
};
