import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestoreService } from "../../services/firestoreService";
import { useUserData } from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (!user) return;
      const profile = await firestoreService.getUserGoal(user.uid);
      if (profile) {
        setAge(profile.age);
        setHeight(profile.height);
        setWeight(profile.weight);
        setGoal(profile.goal);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);
  const { loading, setLoading } = useUserData();
  const [age, setAge] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [goal, setGoal] = useState<string>("Maintain");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    await firestoreService.saveUserGoal(user.uid, {
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      goal,
    });
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Ustawienia
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            fullWidth
          />
          <TextField
            select
            label="Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            fullWidth
          >
            <MenuItem value="Maintain">Maintain</MenuItem>
            <MenuItem value="Weightloss">Weightloss</MenuItem>
            <MenuItem value="Weightgain">Weightgain</MenuItem>
          </TextField>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSave}
            fullWidth
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;
