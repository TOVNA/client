import React, { createContext, useState, ReactNode, useContext } from "react";
import { Class } from "../../types/entities/class";

interface SelectedClassContextType {
  selectedClassId: Class["_id"] | undefined;
  setSelectedClassId: React.Dispatch<
    React.SetStateAction<Class["_id"] | undefined>
  >;
}

export const SelectedClassContext = createContext<
  SelectedClassContextType | undefined
>(undefined);

interface SelectedClassContextProviderProps {
  children: ReactNode;
}

export const SelectedClassContextProvider: React.FC<
  SelectedClassContextProviderProps
> = ({ children }) => {
  const [selectedClassId, setSelectedClassId] = useState<
    Class["_id"] | undefined
  >(undefined);
  return (
    <SelectedClassContext.Provider
      value={{ selectedClassId, setSelectedClassId }}
    >
      {children}
    </SelectedClassContext.Provider>
  );
};

export const useSelectedClassId = (): SelectedClassContextType => {
  const context = useContext(SelectedClassContext);
  if (!context) {
    throw new Error("useSelectedClassId must be used within a StateProvider");
  }
  return context;
};
