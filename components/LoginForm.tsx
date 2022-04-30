import React, { useState, useContext } from "react";
import { Alert, Collapse } from "@mui/material";
import useSignupMutation from "../hooks/useSignupMutation";
import { AuthContext } from "../context/authContext";
import { useRouter } from "next/router";
import styles from "../styles/form.module.scss";

const SignupForm = () => {
  const router = useRouter();
  const context = useContext(AuthContext);
  const [signup] = useSignupMutation();
  const [signedUpSuccess, setSignedUpSuccess] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setSignedUpSuccess(false);

    const { username, password } = form;

    if (!username || !password) {
      return setFormError("Either username or password is missing");
    }

    if (password.length < 6)
      return setFormError("At least 6 characters are required for password");

    signup({
      variables: {
        username: form.username.trim(),
        password: form.password.trim(),
      },
      update(proxy, { data }) {
        if (data.signup) {
          if (data.signup.userErrors.length) {
            return setFormError(data.signup.userErrors[0].message);
          }

          setSignedUpSuccess(true);
          context.login(data.signup.token);
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      },
    });
  };

  return (
    <div className={styles.form}>
      <h2>Log in</h2>
      <form onSubmit={submitHandler}>
        <div className={styles.form__block}>
          <input
            type="text"
            value={form.username}
            placeholder="username"
            onChange={(e) => {
              setForm({
                ...form,
                username: e.target.value,
              });
            }}
          />
        </div>
        <div className={styles.form__block}>
          <input
            type="text"
            placeholder="password"
            value={form.password}
            onChange={(e) => {
              setForm({
                ...form,
                password: e.target.value,
              });
            }}
          />
        </div>
        {
          <Collapse in={!!formError}>
            <Alert severity="error">{formError}</Alert>
          </Collapse>
        }
        <button>Login</button>
      </form>
      {
        <Collapse in={signedUpSuccess}>
          <Alert severity="success">
            You've successfully logged in!
            <br />
            You wil leave this page automatically in 3 seconds.
          </Alert>
        </Collapse>
      }
    </div>
  );
};

export default SignupForm;
