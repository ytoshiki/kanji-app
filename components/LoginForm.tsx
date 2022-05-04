import React, { useState, useContext } from "react";
import { Alert, Collapse } from "@mui/material";
import useSignupMutation from "../hooks/useSignupMutation";
import { AuthContext } from "../context/authContext";
import { useRouter } from "next/router";
import styles from "../styles/form.module.scss";
import useLoginMutation from "../hooks/useLoginMutation";

const LoginForm = () => {
  const router = useRouter();
  const context = useContext(AuthContext);
  const [login] = useLoginMutation();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginSuccess) return;

    setFormError("");
    setLoginSuccess(false);

    const { username, password } = form;

    if (!username || !password) {
      return setFormError("Either username or password is missing");
    }

    if (password.length < 6)
      return setFormError("At least 6 characters are required for password");

    login({
      variables: {
        username: form.username.trim(),
        password: form.password.trim(),
      },
      update(proxy, { data }) {
        console.log(data);
        if (data.signin) {
          if (data.signin.userErrors.length) {
            return setFormError(data.signin.userErrors[0].message);
          }

          setLoginSuccess(true);
          context.login(data.signin.token);
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          setFormError(
            "Something went wrong. Make sure both your username and password are correct."
          );
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
        <Collapse in={loginSuccess}>
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

export default LoginForm;
