import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import share from "../../share.jpg";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

export default function SharePopUp({ carbon, message, newPost, setNewPost }) {

    const [close, setClose] = React.useState(true);

    const sharing = () => {
        fetch('/api/social/', {
            method: 'POST', 
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
            })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              setNewPost(!newPost);
            })
        setClose(false)
    }

    if(close === false) {
        return (<></>)
    }

  return (
      
    <Card sx={{ maxWidth: 345 }}>
        
      <CardActionArea>
      <button onClick={()=>{setClose(false)}} style={{color: "red", backgroundColor:"white", border:"none"}}>X</button>
        <CardMedia
          component="img"
          height="140"
          image={share}
          alt="sustainability"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            YOU ARE SUSTAINABLE!
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {message}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={sharing}>
          Share with your friends!
        </Button>
      </CardActions>
    </Card>
  );
}
