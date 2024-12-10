"use client";
import { FC, useEffect, useState } from "react";
import styles from "./Signin.module.css";
import { clsx } from "clsx";
import { Button, CircularProgress } from "@mui/material";
import { IUser, UserType, useStore } from "@/store/globalStore";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

export const Signin: FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const setState = useStore((state) => state.setState);
  const [signUpError, setSignUpError] = useState<string | undefined>(undefined);
  const [signInError, setSignInError] = useState<string | undefined>(undefined);
  const signinForm = useFormik({
    initialValues: {
      name: "",
      password: "",
      enableReinitialize: true,
    },
    onSubmit: (values) => {
      const users = useStore.getState().users;

      let foundUser: IUser | undefined;

      users.forEach((user) => {
        if (user.name === values.name || user.email === values.name) {
          foundUser = user;
        }
      });

      if (!foundUser) {
        setSignInError("Ad və ya şifrə yalnışdır");

        return;
      }
      setState({ loggedIn: foundUser });

      if (foundUser.name === "admin") {
        push("/dashboard");
      } else {
        push("/");
      }
    },
  });

  const signUpForm = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    onSubmit: (values, { setFieldError }) => {
      const users = useStore.getState().users;
      const newUser = {
        type: UserType.user,
        ...values,
      };

      let err = false;
      users.forEach((user) => {
        if (user.name === newUser.name || user.email === newUser.email) {
          err = true;
          setSignUpError("İstifadəçi mövcuddur");
        }
      });

      if (err) {
        return;
      }

      users.push(newUser);

      setState({ users, loggedIn: newUser });
      push("/");
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    const loggedIn = useStore.getState().loggedIn;
    if (loggedIn) {
      push("/");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className={styles.root}>
        <CircularProgress />
      </div>
    );
  }

  console.log(signUpForm.errors);

  return (
    <div className={styles.root}>
      <div
        className={clsx(styles.container, {
          [styles["right-panel-active"]]: showSignUp,
        })}
      >
        <div
          className={clsx(
            styles["form-container"],
            styles["sign-up-container"],
          )}
        >
          <form onSubmit={signUpForm.handleSubmit}>
            <h1>İstifadəçi yarat</h1>
            <input
              onChange={signUpForm.handleChange}
              name="name"
              type="text"
              placeholder="İstifadəçi adı"
              required
            />
            <input
              onChange={signUpForm.handleChange}
              name="email"
              type="email"
              placeholder="Email"
              required
            />
            <input
              onChange={signUpForm.handleChange}
              name="password"
              type="password"
              placeholder="Şifrə"
              required
            />
            {signUpError && <span style={{ color: "red" }}>{signUpError}</span>}
            <Button variant="contained" type="submit">
              Qeydiyyatdan keç
            </Button>
          </form>
        </div>
        <div
          className={clsx(
            styles["form-container"],
            styles["sign-in-container"],
          )}
        >
          <form onSubmit={signinForm.handleSubmit}>
            <h1>Daxil ol</h1>
            <input
              required
              name="name"
              type="text"
              placeholder="İstifadəçi adı"
              onChange={signinForm.handleChange}
            />
            <input
              required
              name="password"
              type="password"
              placeholder="Şifrə"
              onChange={signinForm.handleChange}
            />
            {signInError && <span style={{ color: "red" }}>{signInError}</span>}
            <Button variant="contained" type="submit">
              Daxil ol
            </Button>
          </form>
        </div>
        <div className={styles["overlay-container"]}>
          <div className={styles["overlay"]}>
            <div
              className={clsx(styles["overlay-panel"], styles["overlay-left"])}
            >
              <h1>Daxil ol menusuna qayıt</h1>
              <Button
                variant="outlined"
                className={styles.ghost}
                onClick={() => setShowSignUp(false)}
              >
                Daxil ol
              </Button>
            </div>
            <div
              className={clsx(styles["overlay-panel"], styles["overlay-right"])}
            >
              <h1>Barbershoop-a xoş gəlmisiz!</h1>
              <Button
                variant="outlined"
                className={styles.ghost}
                onClick={() => setShowSignUp(true)}
              >
                Qeydiyyatdan keç
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
