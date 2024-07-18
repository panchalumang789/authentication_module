"use client";
import { NextPage } from "next";
import { useFormState, useFormStatus } from "react-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Container,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { createUser } from "../_actions/users";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";

interface Props {}

const SignUpPage: NextPage<Props> = ({}) => {
  const [error, action] = useFormState(createUser, {});

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
          Sign up
        </Typography>
        <form action={action} className="space-y-8">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
              />
              {error.firstname && (
                <div className="text-destructive text-sm">
                  {error.firstname}
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="family-name"
              />
              {error.lastname && (
                <div className="text-destructive text-sm">{error.lastname}</div>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="number"
                fullWidth
                id="contactNo"
                label="Contact No"
                name="contactNo"
                autoComplete="contactNo"
              />
              {error.contactNo && (
                <div className="text-destructive text-sm">
                  {error.contactNo}
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              {error.email && (
                <div className="text-destructive text-sm">{error.email}</div>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              {error.password && (
                <div className="text-destructive text-sm">{error.password}</div>
              )}
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                className="h-14 border border-[#0000003d] hover:border-[#000000de] rounded-sm py-4"
                id="profilePhoto"
                name="profilePhoto"
              />
              {error.profilePhoto && (
                <div className="text-destructive">{error.profilePhoto}</div>
              )}
            </Grid>
          </Grid>
          <SubmitButton />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;

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
      {pending ? "Processing..." : "Sign Up"}
    </Button>
  );
}
