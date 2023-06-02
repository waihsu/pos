import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";

const MenuCard = ({
  name,
  description,
  price,
  accet_url,
}: {
  name: string;
  description: string;
  price: number;
  accet_url: string;
}) => {
  return (
    <Box>
      <Card sx={{ width: "100%" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={accet_url}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default MenuCard;
