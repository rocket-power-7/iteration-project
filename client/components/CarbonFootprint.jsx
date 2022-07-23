import React from 'react';
import '../style.css'; //test this
import { Link } from 'react-router-dom';
import CarbonOptions from './CarbonOptions.jsx';
import SocialScroller from './SocialScroller.jsx';
import Chart from './Dashboard.jsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const CarbonFootprint = ({ posts, setPosts, newPost, setNewPost }) => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={8} sx={{ overflow: 'hidden' }}>
          <CarbonOptions setPosts={setPosts} newPost={newPost} setNewPost={setNewPost} />
        </Grid>
        <Grid item xs={4}>
          <SocialScroller posts={posts} setPosts={setPosts} newPost={newPost} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CarbonFootprint;