import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const SocialPost = ({ id, message, createdAt, url, name, i, darkMode }) => {
  // TODO: Incorporate a delete button that will delete the post (which needs a reference to the post id)...
  //       ...if the current user is the user that created the post.
  
  // Blue and Green swap every other
  let background;
  if (darkMode) background = i % 2 === 1 ? 'rgba(133, 204, 148, .1)' : 'rgba(133, 200, 204, .1)';
  else background = i % 2 === 1 ? 'rgba(12, 46, 19, .1)' : 'rgba(13, 31, 41, .1)';

  // Render
  return (
    <Card sx={{ width: '100%', background, flexShrink: 0 }}>
      <CardContent>
        {/* Top of the card: Name and Date */}
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: 10 }}>
            { name }
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: 10 }}>
            { createdAt ? (new Date(createdAt)).toDateString() : null }
          </Typography>
        </Grid>
        {/* (Optional) Center of card: Image */}
        {
          url ?
            <CardMedia
              component="img"
              sx={{ width: '100%', maxHeight: 400, mb: 2 }}
              image={url}
              alt={'A user\'s image'}
            />
          : null
        }
        {/* Center/Bottom of card: Message */}
        <Typography variant="subtitle1">
          { message }
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SocialPost;
