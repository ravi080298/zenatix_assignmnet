import React, { useEffect, useState } from "react";
import { Box, makeStyles, Modal } from "@material-ui/core";
import { Card, CardMedia, Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import axios from "axios";

const styles = makeStyles(() => ({
  card: {
    overflow: "hidden"
  },
  cover: {
    width: "60%",
    height: "40%"
  },
  modal: {
    width: "50%",
    height: "50%",
    position: "absolute",
    top: "20%",
    left: "20%"
  },
  content: {
    display: "flex",
    flexDirection: "row"
  },
  paragraph: {
    fontSize: "12px",
    fontWeight: "400",
    marginLeft: "10px"
  }
}));

function PokeMonModal(props) {
  const classes = styles();
  const { open, setOpen, id, url } = props;
  const handleClose = () => setOpen(false);
  const [status, setStatus] = useState();
  const statusData = async () => {
    const data = await axios.get(url).then((res) => {
      return res.data?.effect_entries[0]?.effect;
    });
    setStatus(data);
  };
  console.log(status);
  useEffect(() => {
    statusData();
  }, []);
  return (
    <Box className={classes.modal}>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className={classes.modal}>
          <Card>
            <CardContent className={classes.content}>
              <CardMedia
                className={classes.cover}
                component="img"
                width="50%"
                image={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
                alt="img"
              />
              <Typography
                variant="h6"
                component="div"
                className={classes.paragraph}
              >
                {status}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
}

export default PokeMonModal;
