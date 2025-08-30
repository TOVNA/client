import React, { createContext, useState, ReactNode, useContext } from "react";

interface SelectedClassData {
  uniqueId: string;
  classId: string;
  label: string;
}

interface SelectedClassContextType {
  selectedClassData: SelectedClassData | undefined;
  setSelectedClassData: React.Dispatch<
    React.SetStateAction<SelectedClassData | undefined>
  >;
  // Convenience getters
  selectedClassId: string | undefined;
  selectedUniqueId: string | undefined;
  selectedClassLabel: string | undefined;
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
  const [selectedClassData, setSelectedClassData] = useState<
    SelectedClassData | undefined
  >(undefined);

  // Convenience getters
  const selectedClassId = selectedClassData?.classId;
  const selectedUniqueId = selectedClassData?.uniqueId;
  const selectedClassLabel = selectedClassData?.label;

  return (
    <SelectedClassContext.Provider
      value={{ 
        selectedClassData, 
        setSelectedClassData,
        selectedClassId,
        selectedUniqueId,
        selectedClassLabel
      }}
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
