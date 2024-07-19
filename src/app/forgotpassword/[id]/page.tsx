import db from "@/db/db";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Container, CssBaseline, Typography, Avatar } from "@mui/material";

import ForgotPasswordForm from "../_component/ForgotPasswordForm";

interface Props {
  params: { id: string };
}

const ForgotPasswordPage: NextPage<Props> = async ({ params: { id } }) => {
  const user = await db.user.findUnique({ where: { id } });
  if (user == null) notFound();

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
          New Password
        </Typography>
        <ForgotPasswordForm userEmail={user.email} />
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
