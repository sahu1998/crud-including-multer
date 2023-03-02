import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { getApiHandler, postApiHandler, putApiHandler } from "../../apiHandler";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../../layout";
const theme = createTheme();

const UserForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const id = useSearchParams()[0].get("id");
  const history = useNavigate();
  const file = watch("file");

  const prefilledForm = async () => {
    handleToggle();
    const result = await getApiHandler(
      `/?id=${id}&token=${localStorage.getItem("token")}`
    );
    if (result.status == 200) {
      const { name, email, age, contact, image } = result.response;
      console.log("prefilled: ", result.response);
      setValue("name", name);
      setValue("email", email);
      setValue("contact", contact);
      setValue("age", age);
      setValue("file", image);
    } else {
      history("/signin");
    }
    handleClose();
  };
  useEffect(() => {
    if (id) {
      prefilledForm();
    }
  }, [id]);

  const onSubmit = async (values) => {
    handleToggle();
    const formData = new FormData();
    formData.append("image", file[0]);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("contact", values.contact);
    formData.append("age", values.age);
    // formData.append("token", localStorage.getItem("token"));
    const result = id
      ? await putApiHandler(`/${id}`, formData)
      : await postApiHandler("/", formData);
    console.log("onSubmit: ", result);
    handleClose();
    history("/contactlist");
  };

  return (
    <MainLayout>
      {open ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <ThemeProvider theme={theme}>
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
                <ContactsIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {id ? "Update Contact" : "Add Contact"}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="name"
                      required
                      fullWidth
                      label="Name"
                      type="text"
                      {...register("name")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="age"
                      required
                      fullWidth
                      label="Age"
                      type="number"
                      {...register("age")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      {...register("email")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="contact"
                      label="Contact"
                      type="text"
                      {...register("contact")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="file"
                      type="file"
                      // inputProps={{
                      //   multiple: true,
                      // }}
                      {...register("file")}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {id ? "Update" : "Add"}
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </MainLayout>
  );
};

export default UserForm;
