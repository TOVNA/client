import React, { createContext, useState, ReactNode, useContext } from "react";
import { Student } from "../../types/entities/student";

interface SelectedStudentContextType {
  selectedStudentId: Student["_id"] | undefined;
  setSelectedStudentId: React.Dispatch<
    React.SetStateAction<Student["_id"] | undefined>
  >;
}

export const SelectedStudentContext = createContext<
SelectedStudentContextType | undefined
>(undefined);

interface SelectedStudentContextProviderProps {
  children: ReactNode;
}

export const SelectedStudentContextProvider: React.FC<
SelectedStudentContextProviderProps
> = ({ children }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<
    Student["_id"] | undefined
  >(undefined);
  return (
    <SelectedStudentContext.Provider
      value={{ selectedStudentId, setSelectedStudentId }}
    >
      {children}
    </SelectedStudentContext.Provider>
  );
};

export const useSelectedStudentId = (): SelectedStudentContextType => {
  const context = useContext(SelectedStudentContext);

  if (!context) {
    throw new Error("useSelectedStudentId must be used within a StateProvider");
  }
  return context;
};
