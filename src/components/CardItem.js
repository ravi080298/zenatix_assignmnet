import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography
} from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import PokeMonModal from "./PokemonModal";

const styles = makeStyles(() => ({
  card: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  cover: {
    width: "60%",
    height: "40%",
    objectFit: "initial"
  }
}));

function CarItem(props) {
  const classes = styles();
  const { name, id, url } = props;
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="div">
            Name: {name}
          </Typography>
          <Typography variant="h5" component="div">
            Id: {id}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.cover}
          component="img"
          image={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
          alt="img"
        />
        <CardActions>
          <Button size="small" color="primary" onClick={() => openModal()}>
            Click TO Open
          </Button>
        </CardActions>
      </Card>
      {open && <PokeMonModal open={open} setOpen={setOpen} id={id} url={url} />}
    </>
  );
}

export default CarItem;
