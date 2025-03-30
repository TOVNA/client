import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Login.module.css";
import { useAuth } from "../../components/AuthContext";
import { Link } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("כתובת אימייל לא תקינה"),
  password: z.string().min(6, "הסיסמה חייבת להיות באורך של לפחות 6 תווים"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { login: loginUser, registerGoogle: registerGoogleUser } = useAuth();

  const onSubmit = (data) => {
    loginUser(data);
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const { credential = "" } = credentialResponse;
    registerGoogleUser(credential);
  };

  const handleGoogleFailure = () => {
    toast.error("שגיאה בהתחברות עם גוגל");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>התחברות</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">אימייל</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <p>{errors.email.message as string}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">סיסמה</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && <p>{errors.password.message as string}</p>}
        </div>
        <div className={styles.formRow}>
          <button type="submit" className={styles.button}>
            התחברות
          </button>
          <span>
            אין לך חשבון?{" "}
            <span className={styles.link}>
              <Link to="/register">הרשמה</Link>
            </span>
          </span>
        </div>
        <div className={styles.googleSignIn}>
          <div className={styles.googleSignup}>כניסה באמצעות גוגל:</div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            auto_select
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
