import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../style.css";
import axios from 'axios';

const theme = createTheme();

export default function SignUp({ posts, setPosts }) {
  // State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [successful, setSuccessful] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('/api/user/signup', {
      firstName,
      lastName,
      email,
      password
    })
    .then(() => {
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setSuccessful('You have successfully signed up');
      // Post about the new user signup
      const message = `${firstName} ${lastName} just joined the community!`;
      axios.post('/api/social', { message })
        .then(({ postId }) => {
          // Display the new post
          setPosts([{ postId, message, firstName, lastName, createdAt: (new Date()).toDateString() }, ...posts]);
        })
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className='tag'>
        <CssBaseline />
        <Box
          sx={{
            position: "absolute",
            marginTop: 8,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(to right bottom, #D3D3D3, #FFFFFF	)',
            borderRadius: 3,
            opacity: 0.8
          }}
        >
          <Avatar sx={{ m: 1, background: '#228B22' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "linear-gradient(to right bottom, #3ce666, #1957c2)" }}
              onSubmit={() => handleSubmit}
            >
              Sign Up
            </Button>
            <div style={{color: 'green' }}>{successful}</div>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="#/Login" variant="body2" sx={{color: '#228B22'}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}