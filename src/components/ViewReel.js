import { Breadcrumbs, Button, Divider, Grid, Link, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";
import { Box } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ViewReel(props) {
  const paperStyle = {
    padding: "10px 10px",
    width: 800,
    margin: "20px auto",
  };
  const [reelId, setReelId] = useState("");
  const [reelTitle, setReelTitle] = useState("");
  const [reelNumLikes, setReelNumLikes] = useState(0);
  const [reelNumViews, setReelNumViews] = useState(0);
  const [reelCaption, setReelCaption] = useState("");
  const [video, setVideo] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [creatorName, setCreatorName] = useState();
  const [status, setStatus] = useState();

  React.useEffect(() => {
    console.log("view reel, received: ", props.reel);
    setReelId(props.reel.reelId);
    setReelTitle(props.reel.reelTitle);
    setReelCaption(props.reel.reelCaption);
    setReelNumLikes(props.reel.numLikes);
    setReelNumViews(props.reel.numViews);
    setVideo(props.reel.video);
    setCreatorName(props.reel.creatorName);
    setStatus(props.reel.reelApprovalStatusEnum);
    setVideoUrl(props.reel.video.fileURL);
    console.log("fileUrl: ", props.reel.video.fileURL);
  }, []);
  const renderVideoImageHolder = () => {
    return (
      <>
        {video ? (
          <div style={{ height: "500px" }}>
            <ReactPlayer
              className="video"
              width="100%"
              height="100%"
              controls
              url={videoUrl}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div>There is no current file!</div>
          </div>
        )}
      </>
    );
  };

  function handleRejectReel() {
    fetch("http://localhost:8080/reel/rejectReel/" + reelId, {
      method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify("")
    }).then(() => {
      console.log("Reel Rejected Successfully!");
      props.refreshFunc();
      props.closeModalFunc();
    });
  }

  function handleApproveReel() {
    fetch("http://localhost:8080/reel/approveReel/" + reelId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("Reel Approved Successfully!");
      props.refreshFunc();
      props.closeModalFunc();
    });
  }

  return (
    <div>
      <Paper elevation={3} style={paperStyle}>
        <Grid
          container
          className="cards"
          style={{
            direction: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            onClick={() => props.closeModalFunc()}
            style={{ marginLeft: "-610px", marginBottom: "10px" }}
          >
            Back
          </Button>
          <h1
            style={{
              backgroundImage: "linear-gradient(to right, #FF8300, #A3C4BC)",
              color: "white",
              padding: "5px",
              width: "95%",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            View Reel
          </h1>{" "}
          <Grid
            container
            style={{
              direction: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={3}
              style={{
                justifySelf: "center",
                width: "700px",
                height: "1000px",
              }}
            >
              {renderVideoImageHolder()}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: "20px",
                    paddingBottom: "5px",
                    paddingTop: "5px",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                  className="cards-item-text"
                >
                  <FavoriteIcon style={{ color: "red" }} /> {reelNumLikes} likes
                </p>
                <p
                  style={{
                    fontSize: "20px",
                    paddingBottom: "5px",
                    paddingTop: "5px",
                    marginRight: "20px",
                    marginTop: "20px",
                  }}
                  className="cards-item-text"
                >
                  <VisibilityIcon /> {reelNumViews} views
                </p>
              </div>

              <Divider style={{ marginTop: "20px" }}></Divider>
              <Grid style={{ padding: "20px" }}>
                <p>
                  <b style={{ color: "#296d98" }}>{creatorName} </b>
                  <u>{reelTitle}</u>
                </p>
                <br></br>
                <p>{reelCaption}</p>
                <Divider style={{ marginTop: "30px" }}></Divider>
              </Grid>
              <Grid container justifyContent={"space-between"} padding={"20px"}>
                {status != "REJECTED" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRejectReel}
                  >
                    reject
                  </Button>
                )}
                {status != "LIVE" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApproveReel}
                  >
                    approve
                  </Button>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
