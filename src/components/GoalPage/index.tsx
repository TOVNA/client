import { useEffect, useState } from "react";
import Style from "./GoalPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import closeIcon from "../../assets/close.svg";
import { useGoalById } from "../../utils/customHooks/queries/useGoalById";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGoalsMutations } from "../../utils/customHooks/mutations/useGoalsMutations";
import { useRefetchQueries } from "../../utils/customHooks/queries/useRefetchQueries";
import deleteIcon from "../../assets/close.svg";
import { useStrategiesByGoal } from "../../utils/customHooks/queries/useStrategiesByGoal";
import { useStrategyMutations } from "../../utils/customHooks/mutations/useStrategyMutations";

const schema = z.object({
  text: z.string().min(1, "מטרה היא שדה חובה"),
});

interface StudentFormInputs {
  text: string;
}

interface Strategy {
  text: string;
  _id?: string;
}

const GoalPage = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [newStrategy, setNewStrategy] = useState("");

  const { id, studentId } = useParams<{ id: string; studentId: string }>();

  const { data: goalsStrategies } = useStrategiesByGoal(id);

  const { refetchGoalsByStudent, refetchStrategiesByGoal } =
    useRefetchQueries();

  console.log(id, studentId);
  const { data: goal } = useGoalById(id || "");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentFormInputs>({
    resolver: zodResolver(schema),
  });

  const { createGoalMutation, updateGoalMutation, deleteGoalMutation } =
    useGoalsMutations();

  const {
    createStrategyMutation,
    updateStrategyMutation,
    deleteStrategyMutation,
  } = useStrategyMutations();

  const onSubmit = async (data: any) => {
    if (studentId) {
      if (id) {
        const goal = {
          text: data.text,
          studentId,
        };
        updateGoalMutation.mutate({ id, data: goal });

        strategies.forEach(async (strategy) => {
          if (!strategy._id) {
            await createStrategyMutation.mutateAsync({
              text: strategy.text,
              goalId: id,
            });
          } else {
            await updateStrategyMutation.mutate({
              id: strategy._id,
              data: { text: strategy.text },
            });
          }
        });

        goalsStrategies?.forEach(async (goalStrategy) => {
          const isGoalDeleted = !strategies.find(
            (strategy) => strategy._id === goalStrategy._id
          );

          if (isGoalDeleted)
            await deleteStrategyMutation.mutate(goalStrategy._id);
        });

        await refetchStrategiesByGoal(id);
      } else {
        const goal = {
          text: data.text,
          studentId,
          strategies,
        };
        createGoalMutation.mutate(goal);
      }
    }

    navigate(-1);
  };

  useEffect(() => {
    if (goal) {
      reset({
        text: goal.text,
      });
    }
  }, [goal, reset]);

  useEffect(() => {
    if (goalsStrategies) {
      setStrategies(
        goalsStrategies?.map(({ text, _id }) => ({
          text,
          _id,
        }))
      );
    }
  }, [goalsStrategies]);

  const addStrategy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setStrategies([...strategies, { text: newStrategy }]);
    setNewStrategy("");
  };

  const updateStrategy = (index: number, value: string) => {
    const updated = [...strategies];
    updated[index].text = value;
    setStrategies(updated);
  };

  const deleteStrategy = (index: number) => {
    setStrategies(strategies.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={Style.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
          <img
            src={closeIcon}
            className={Style.closeIcon}
            alt="close-goal"
            onClick={() => navigate(-1)}
          />

          <h2 className={Style.title}>
            {id ? `עריכת מטרה עם מזהה ${id}` : "יצירת מטרה"}
          </h2>
          <div className={Style.inputGroup}>
            <label htmlFor="text">מטרה</label>
            <input id="text" {...register("text")} />
            {errors.text && (
              <p className={Style.error}>{errors.text.message}</p>
            )}
          </div>
          <div className={Style.inputGroup}>
            <label htmlFor="strategies">אסטרטגיות למימוש המטרה</label>
            <div className={Style.newStrategy}>
              <input
                value={newStrategy}
                onChange={(e) => setNewStrategy(e.target.value)}
                className={Style.strategyInput}
              />
              <button
                className={`${Style.button} ${Style.saveButton} ${Style.newStrategyButton}`}
                disabled={!newStrategy.trim()}
                onClick={addStrategy}
              >
                הוספה
              </button>
            </div>
            <div className={Style.strategiesContainer}>
              {strategies.map((strategy, index) => (
                <div className={`${Style.inputGroup} ${Style.newStrategy}`}>
                  <img
                    src={deleteIcon}
                    className={Style.deleteStrategyButton}
                    onClick={() => deleteStrategy(index)}
                  />

                  <input
                    value={strategy.text}
                    className={Style.exisitngStrategyInput}
                    onChange={(event) =>
                      updateStrategy(index, event.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={Style.buttonsContainer}>
            {studentId && (
              <button
                type="submit"
                className={`${Style.button} ${Style.saveButton}`}
              >
                שמירה
              </button>
            )}

            {id && (
              <button
                className={`${Style.button} ${Style.deleteButton}`}
                onClick={async () => {
                  if (
                    window.confirm("Are you sure you want to delete this goal?")
                  ) {
                    await deleteGoalMutation.mutateAsync(id);

                    if (studentId) {
                      console.log(" deleted student id");
                      await refetchGoalsByStudent(studentId);
                    }
                    navigate(`/student/${studentId}`);
                  }
                }}
              >
                מחיקה
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default GoalPage;
