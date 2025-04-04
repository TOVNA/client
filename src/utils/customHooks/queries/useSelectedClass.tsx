import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { Class } from "../../../types/entities/class";
import { useSelectedClassId } from "../../../components/SelectedClassContext/SelectedClassContext";
import { getClassById } from "../../api/class";

export const useSelectedClass = () => {
  const { selectedClassId } = useSelectedClassId();

  return useQuery<Class | undefined>(
    [QUERY_KEYS.CLASS_BY_ID(selectedClassId || "")],
    () => getClassById(selectedClassId),
    {
      keepPreviousData: true,
    }
  );
};
