"use client";
import { handelLogin } from "@/lib/store/authSlice";
import { dispatchType, stateType } from "@/lib/store/store";
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const { auth } = useSelector((state: stateType) => state);
  const router = useRouter();
  const dispatch = useDispatch<dispatchType>();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: { email: string; password: string }) => {
      dispatch(handelLogin(values))
        .then((res) => {
          if (res.payload.message == "success") {
            console.log(res.payload.token);
            console.log(res);
            router.push("/");
          }
        })
        .catch((err) => err);
    },
  });
  return (
    <>
      <Container maxWidth="sm" sx={{ my: 5 }}>
        <Paper elevation={10} className="p-4">
          <Typography variant="h4" sx={{ color: "primary.main", my: 3 }}>
            Login Now:
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ my: 3 }}
              type="email"
              fullWidth
              id="outlined-basic"
              label="email"
              variant="standard"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            ></TextField>
            <TextField
              fullWidth
              type="password"
              id="outlined-basic"
              label="password"
              variant="standard"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            ></TextField>
            <Button
              fullWidth
              type="submit"
              sx={{
                border: "1px solid #1976D2",
                my: 3,
                ":hover": { backgroundColor: "primary.main", color: "white" },
              }}
              variant="outlined"
            >
              {auth.isLoading ? <CircularProgress></CircularProgress> : "Login"}
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
