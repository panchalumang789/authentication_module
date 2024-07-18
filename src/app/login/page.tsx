"use client";
import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import { FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
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

interface Props {}

const LoginPage: NextPage<Props> = ({}) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await axios.post("api/login", data);

      if (response.statusText === "OK") {
        localStorage.setItem("token", response.data);
        toast({
          title: "Login Success",
        });
        router.push("/");
      }
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: (err.response?.data as string) || err.message,
        variant: "destructive",
      });
    }
  };

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <SubmitButton />
          <Grid container>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;

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
      {pending ? "Processing..." : "Sign In"}
    </Button>
  );
}
