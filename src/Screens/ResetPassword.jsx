import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { textAlign } from "@material-ui/system";
import Axios from "axios";
require("dotenv").config();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: 18
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "20px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    width: "100%",
    borderRadius: 50,
    height: 50,
    color: "#000",
    background: "#ffcb00",
    "&:hover": {
      background: "#ffcb00"
    },
    marginTop: "40px"
  },
  navbar: {
    backgroundImage:
      "linear-gradient(to left, #00aeef, rgba(0, 126, 239, 0.97))"
  }
}));

const ResetPassword = props => {
  let { id } = useParams();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    c_password: ""
  });

  const post_activation_key = async data => {
    try {
      if (values.password !== values.c_password)
        return alert("Password & Password Confirm Is Different");
      if (data.password !== "" && data.activation_key !== "") {
        const result = await Axios.post(
          `${process.env.REACT_APP_ENDPOINT_BASE}/api/v1/users/verify-password`,
          data
        );
        if (result.data.status === 403) return alert(result.data.message);
        if (result.data.status === 200) return alert(result.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const data = { activation_key: id, password: values.password };
  const handleChange = password => event => {
    setValues({ ...values, [password]: event.target.value });
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Reset Password
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
          required
        />
        <TextField
          id="standard-name"
          label="Ketik ulang password"
          className={classes.textField}
          value={values.c_password}
          onChange={handleChange("c_password")}
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => post_activation_key(data)}
        >
          Simpan
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
