import { Delete } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton
} from "@mui/material";
import React from "react";

function ListItemProducts({ image, primaryText, secondaryText, onDelete }) {
  return (
    <ListItem>
      <ListItemAvatar sx={{ marginRight: 2 }}>
        <Avatar alt="avatar" src={image} sx={{ width: 75, height: 75 }} />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="h6">{primaryText}</Typography>}
        secondary={<Typography variant="p">{secondaryText}</Typography>}
      />
      <IconButton onClick={onDelete}>
        <Delete />
      </IconButton>
    </ListItem>
  );
}

export default ListItemProducts;
