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
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  AuthError,
} from "firebase/auth";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [authError, setAuthError] = useState<string>("");
  const [isSubmittingStandardAuth, setIsSubmittingStandardAuth] =
    useState(false);
  const [isSubmittingTwitterAuth, setIsSubmittingTwitterAuth] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmittingStandardAuth(true);
    setAuthError("");

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      const firebaseError = error as AuthError;
      if (firebaseError.code === "auth/invalid-credential") {
        setAuthError("Provided email or password is incorrect");
      } else {
        setAuthError("Login failed. Please try again.");
      }
    } finally {
      setIsSubmittingStandardAuth(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsSubmittingTwitterAuth(true);
    setAuthError("");
    console.log("Google login started");

    try {
      const provider = new GoogleAuthProvider();
      console.log("GoogleAuthProvider initialized");

      const result = await signInWithPopup(auth, provider);
      console.log("Google login success:", result.user);
      navigate("/");
    } catch (error) {
      const firebaseError = error as AuthError;
      console.error("Google login error:", firebaseError);
      setAuthError(`Google login failed: ${firebaseError.message}`);
    } finally {
      setIsSubmittingTwitterAuth(false);
      console.log("Google login ended");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
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
            {...register("password", { required: "Password is required" })}
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
            disabled={isSubmittingStandardAuth}
            sx={{ mt: 3, mb: 2 }}
          >
            {isSubmittingStandardAuth ? (
              <CircularProgress size={24} />
            ) : (
              "Login"
            )}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={loginWithGoogle}
            disabled={isSubmittingTwitterAuth}
            sx={{ mb: 2 }}
          >
            {isSubmittingTwitterAuth ? (
              <CircularProgress size={24} />
            ) : (
              "Login with Google"
            )}
          </Button>
        </Box>
        <button
          className="mx-auto w-full cursor-pointer underline"
          onClick={() => navigate("/register")}
        >
          If you don't have an account you can register here
        </button>
      </Paper>
    </Container>
  );
};

export default LoginForm;
