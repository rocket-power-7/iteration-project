import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import SocialPost from './SocialPost.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const SocialScroller = ({ posts, setPosts, newPost }) => {
  // Theme
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({ palette: { mode: (darkMode ? 'dark' : 'light'), dark: { main: '#000' }, light: { main: '#fff' } } });

  // Load posts from back-end
  useEffect(() => {
    fetch('/api/social')
      .then((res) => res.json())
      .then((postData) => {
        setPosts(postData);
      })
      .catch((err) => console.log(err));
  }, [newPost]);

  // Render component
  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        sx={{ background: 'linear-gradient(to right bottom,' + (darkMode ? '#232e25, #1d2326)' : '#7cc489, #59b2c2)'), p: 4, height: 'calc(100vh - 128px)', overflowY: 'scroll' }}
      >
        {/* Light / Dark mode switch */}
        <IconButton sx={{ ml: 1 }} onClick={() => setDarkMode(!darkMode)} color={darkMode ? 'light' : 'dark'}>
          { darkMode ? <Brightness4Icon /> : <Brightness7Icon /> }
        </IconButton>
        {/* Header */}
        <Typography component="h2" color={darkMode ? 'white' : 'black'} sx={{ fontSize: 40, opacity: 0.75, textAlign: 'center', lineHeight: .9 }}> Planet Community </Typography>
        <hr style={{ width: '80%', marginBottom: 20, marginTop: 16, border: '1px solid ' + (darkMode ? 'white' : 'black'), opacity: 0.75 }}></hr>
        {/* Posts: Convert the post data from the back-end to a SocialPost component */}
        { posts.map(({ postId, message, createdAt, imageUrl, firstName, lastName }, i) => <SocialPost key={postId} id={postId} message={message} createdAt={createdAt} url={imageUrl} name={`${firstName} ${lastName}`} i={i} darkMode={darkMode} />) }
      </Stack>
    </ThemeProvider>
  );
};

export default SocialScroller;
