"use client";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { object, ref, string } from "yup";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handelRegister } from "@/lib/store/authSlice";
import { dispatchType } from "@/lib/store/store";

export default function RegisterForm() {
  const PassRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const validationSchema = object({
    name: string()
      .required("name is required")
      .min(3, "name must be min 3 chars")
      .max(20, "name must be max 20 char"),
    email: string().required("email is required").email("email must be valid"),
    password: string()
      .required("pass is required")
      .matches(
        PassRegex,
        "pass must start with capital letter followed chars and must include special  "
      ),
    rePassword: string()
      .required()
      .matches(PassRegex)
      .oneOf([ref("password")], "password don't match"),
    dateOfBirth: string().required("dateOfBirth is required"),
    gender: string().required("gender is required"),
  });

  const dispatch = useDispatch<dispatchType>();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    onSubmit: (values: {
      name: string;
      email: string;
      password: string;
      rePassword: string;
      dateOfBirth: string;
      gender: string;
    }) => {
      dispatch(handelRegister(values))
        .then((res) => {
          if (res.payload.message == "success") {
            console.log(res);
            router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(values);
    },
    validationSchema,
  });
  const [error, setError] = useState(null);
  return (
    <Container maxWidth="sm" sx={{ my: 5 }}>
      <Paper elevation={10} className="p-4">
        <Typography variant="h4" sx={{ color: "primary.main", my: 2 }}>
          Register Now:
        </Typography>
        {error ? (
          <p className="text-red-500 font-semibold my-4">{error}</p>
        ) : (
          ""
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ my: 1 }}
            type="text"
            fullWidth
            id="outlined-basic"
            label="name"
            variant="standard"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          ></TextField>
          {formik.errors.name && formik.touched.name ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.name}
            </p>
          ) : (
            ""
          )}
          <TextField
            type="email"
            fullWidth
            id="outlined-basic"
            label="email"
            variant="standard"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          ></TextField>
          {formik.errors.email && formik.touched.email ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.email}
            </p>
          ) : (
            ""
          )}
          <TextField
            fullWidth
            sx={{ my: 1 }}
            type="password"
            id="outlined-basic"
            label="password"
            variant="standard"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          ></TextField>
          {formik.errors.password && formik.touched.password ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.password}
            </p>
          ) : (
            ""
          )}
          <TextField
            fullWidth
            type="password"
            id="outlined-basic"
            label="rePassword"
            variant="standard"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
          ></TextField>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.rePassword}
            </p>
          ) : (
            ""
          )}
          <Grid container spacing={2} alignItems={"center"}>
            <Grid size={10}>
              <TextField
                // sx={{ my: 1 }}
                fullWidth
                type="date"
                id="outlined-basic"
                label=""
                variant="standard"
                name="dateOfBirth"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
              ></TextField>
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
                <p className="text-red-500 font-semibold my-4">
                  {formik.errors.dateOfBirth}
                </p>
              ) : (
                ""
              )}
            </Grid>
            <Grid size={2}>
              <InputLabel id="gender-select">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                fullWidth
                id="gender-select"
                value={formik.values.gender}
                label="gender"
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
              {formik.errors.gender && formik.touched.gender ? (
                <p className="text-red-500 font-semibold my-4">
                  {formik.errors.gender}
                </p>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
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
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
