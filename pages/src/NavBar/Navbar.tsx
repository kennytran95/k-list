import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from "@auth0/auth0-react";

export default function ButtonAppBar() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  // console.log(user);

  // if (isLoading) {
  //   return (
  //     <Box sx={{ flexGrow: 1 }}>
  //       <AppBar position="static">
  //         <Toolbar>
  //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  //             Still Loading 😴
  //           </Typography>
  //         </Toolbar>
  //       </AppBar>
  //     </Box>
  //   );
  // }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              G-List
            </Typography>
            {user?.picture && (
              <Avatar alt="avatar" src={user?.picture}></Avatar>
            )}
            <Button
              color="inherit"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              G-List
            </Typography>

            <Button color="inherit" onClick={loginWithRedirect}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
