import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  TextField,
} from "@mui/material";
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
    width: 1200,
    margin: "20px auto",
  };
  const [currentReel, setCurrentReel] = useState();
  const [reelId, setReelId] = useState("");
  const [reelTitle, setReelTitle] = useState("");
  const [reelNumLikes, setReelNumLikes] = useState(0);
  const [reelNumViews, setReelNumViews] = useState(0);
  const [reelCaption, setReelCaption] = useState("");
  const [video, setVideo] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState();
  const [creatorName, setCreatorName] = useState();
  const [status, setStatus] = useState();
  const [rejectionReason, setRejectionReason] = useState(" ");

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    fetch("http://localhost:8080/reel/getReel/" + location.state.reelId)
      .then((res) => res.json())
      .then((result) => {
        setCurrentReel(result);
        setReelTitle(result.reelTitle);
        setReelCaption(result.reelCaption);
        setReelNumLikes(result.numLikes);
        setReelNumViews(result.numViews);
        setVideo(result.video);
        setCreatorName(result.creatorName);
        setStatus(result.reelApprovalStatusEnum);
        setVideoUrl(result.video.fileURL);
        setThumbnailUrl(result.thumbnail.fileURL);
        setThumbnail(result.thumbnail);
        console.log("learnerViewReelComponent fetched: ", result);
        console.log("lms url: ", result.video.fileURL)
      })
      .then(setVideoUrl({ ...videoUrl }));
    // console.log("view reel, received: ", location.state.reel);
    // setReelId(location.state.reel.reelId);
  }, []);
  const renderVideoImageHolder = () => {
    var link = location.state.reel.video.fileURL;
    return (
      <>
        {video && videoUrl ? (
          <div style={{ height: "500px" }}>
            <video
              className="video"
              width="100%"
              height="100%"
              controls
              // url={currentReel.video.fileURL}
              src={currentReel.video.fileURL}

              // url="https://educouchbucket.s3.ap-southeast-1.amazonaws.com/1669018666625_tree%20video.mp4"
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

  // const renderThumbnailHolder = () => {
  //   return (
  //     <>
  //       {thumbnail ? (
  //         <div style={{ height: "500px", flex: "5" }}>
  //           <img
  //             src={thumbnailUrl}
  //             alt="Interactive Page Image"
  //             width="100%"
  //             height="100%"
  //             objectFit="contain"
  //           />
  //         </div>
  //       ) : (
  //         <div style={{ textAlign: "center" }}>
  //           <div>There is no current file!</div>
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  function handleRejectReel() {
    console.log("rejectionReason: ", rejectionReason);
    fetch("http://localhost:8080/reel/rejectReel/" + reelId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: rejectionReason,
    }).then(() => {
      console.log("Reel Rejected Successfully!");
      props.refreshFunc();
      // props.closeModalFunc();
      navigate(`/PendingApprovalReq`);
    });
  }

  function handleApproveReel() {
    fetch("http://localhost:8080/reel/approveReel/" + reelId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("Reel Approved Successfully!");
      props.refreshFunc();
      // props.closeModalFunc();
      navigate(`/PendingApprovalReq`);
    });
  }

  function handleNavigateBack() {
    console.log("handle navigate back called");
    navigate(`/PendingApprovalReq`);
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
            // onClick={() => handleNavigateBack}
            style={{ marginLeft: "-1000px", marginBottom: "10px" }}
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
                width: "1000px",
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
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleRejectReel}
                    >
                      reject
                    </Button>
                  </>
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
              <TextField
                style={{ marginLeft: "20px", width: "400px" }}
                multiline
                type="text"
                placeholder="Type rejection reason here... (if applicable)"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              ></TextField>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
