"use client";

import { NextPage } from "next";
import { User } from "@prisma/client";
import { Button, Grid, TextField } from "@mui/material";
import { useFormState, useFormStatus } from "react-dom";

import { updatePassword } from "@/app/_actions/users";

interface Props {
  userEmail: User["email"];
}

const ForgotPasswordForm: NextPage<Props> = ({ userEmail }) => {
  const [error, action] = useFormState(
    updatePassword.bind(null, userEmail),
    {}
  );

  return (
    <form action={action} className="space-y-8">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <TextField
            margin="dense"
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
          />
          {error?.newPassword && (
            <div className="text-destructive text-sm">{error.newPassword}</div>
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
  );
};

export default ForgotPasswordForm;

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
