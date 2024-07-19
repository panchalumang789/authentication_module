"use client";
import { NextPage } from "next";
import { useFormState, useFormStatus } from "react-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Container,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

import { forgotPassword } from "../_actions/users";

interface Props {}

const ForgotPasswordPage: NextPage<Props> = ({}) => {
  const [error, action] = useFormState(forgotPassword, {});

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form action={action} className="space-y-8 w-full">
          <Grid container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoFocus
              />
              {error?.email && (
                <div className="text-destructive text-sm">{error.email}</div>
              )}
            </Grid>
          </Grid>
          <SubmitButton />
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      sx={{ mt: 3, mb: 2 }}
      fullWidth
      variant="contained"
      disabled={pending}
    >
      {pending ? "Processing..." : "Forgot Password"}
    </Button>
  );
}
