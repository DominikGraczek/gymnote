import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Container,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  AuthError,
  updateProfile,
} from "firebase/auth";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const [authError, setAuthError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setAuthError("");

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(result);
      await updateProfile(result.user, { displayName: data.name });
      navigate("/login");
    } catch (error) {
      const firebaseError = error as AuthError;
      if (firebaseError.code === "auth/email-already-in-use") {
        setAuthError("Email already in use");
      } else {
        setAuthError("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Name"
            type="name"
            {...register("name", {
              required: "Name is required",
              minLength: 2,
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />

          {authError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {authError}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ mt: 3 }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Box>
        <button
          className="mx-auto w-full cursor-pointer underline mt-2"
          onClick={() => navigate("/login")}
        >
          If you already have an account you can Log in here
        </button>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
