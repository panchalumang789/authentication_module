"use client";
import { NextPage } from "next";
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
import { useFormState, useFormStatus } from "react-dom";
import { updatePassword } from "../_actions/users";

interface Props {}

const ForgotPasswordPage: NextPage<Props> = ({}) => {
  const [error, action] = useFormState(updatePassword, {});

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
        <form action={action} className="space-y-8">
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                margin="dense"
                fullWidth
                id="contactNo"
                label="Contact No"
                name="contactNo"
                autoFocus
              />
              {error?.contactNo && (
                <div className="text-destructive text-sm">
                  {error.contactNo}
                </div>
              )}
            </Grid>
            <Grid xs={12}>
              <TextField
                margin="dense"
                fullWidth
                id="newPassword"
                label="New Password"
                name="newPassword"
              />
              {error?.newPassword && (
                <div className="text-destructive text-sm">
                  {error.newPassword}
                </div>
              )}
            </Grid>
            <Grid xs={12}>
              <TextField
                margin="dense"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
              />
              {error?.confirmPassword && (
                <div className="text-destructive text-sm">
                  {error.confirmPassword}
                </div>
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
      {pending ? "Processing..." : "Change Password"}
    </Button>
  );
}
