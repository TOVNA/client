import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Register.module.css";
import { useAuth } from "../../components/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("כתובת אימייל לא תקינה"),
  password: z.string().min(6, "הסיסמה חייבת להיות באורך של לפחות 6 תווים"),
  firstName: z.string().min(1, "שם פרטי הוא שדה חובה"),
  lastName: z.string().min(1, "שם משפחה הוא שדה חובה"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { register: registerUser } =
    useAuth();

  const onSubmit = async (data) => {
    await registerUser({ ...data });
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          if (errors?.image?.message) {
            toast.error("נא להוסיף תמונה");
          }
        })}
        className={styles.form}
      >
        <h2 className={styles.title}>הרשמה</h2>
        <>
          <div className={styles.inputGroup}>
            <label htmlFor="email">אימייל</label>
            <input
              type="email"
              id="email"
              {...register("email")}
            />
            {errors.email && <p>{errors.email.message as string}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message as string}</p>}
          </div>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">שם פרטי</label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
              />
              {errors.firstName && <p>{errors.firstName.message as string}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">שם משפחה</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
              />
              {errors.lastName && <p>{errors.lastName.message as string}</p>}
            </div>
          </div>
          <div className={styles.formRow}>
            <button type="submit" className={styles.button}>
              הרשמה
            </button>
            <span>
              יש לך כבר חשבון?{" "}
              <span className={styles.link}>
                <Link to="/login">התחברות</Link>
              </span>
            </span>
          </div>
        </>
      </form>
    </div>
  );
};

export default Register;
