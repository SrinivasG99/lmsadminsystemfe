import {
  Breadcrumbs,
  Grid,
  IconButton,
  Link,
  Button,
  Divider,
  Paper,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";
import { Box } from "@mui/system";
import { useAuth } from "../context/AuthProvider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ViewReel(props) {
  const auth = useAuth();
  const user = auth.user;
  const learnerId = user.userId;
  const location = useLocation();
  const navigate = useNavigate();
  const [currentReel, setCurrentReel] = useState();
  const [liked, setLiked] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [status, setStatus] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/reel/getReel/" + location.state.reelId)
      .then((res) => res.json())
      .then((result) => {
        setCurrentReel(result);
        setStatus(result.reelApprovalStatusEnum);
        console.log("learnerViewReelComponent fetched: ", result);
      });
  }, []);

  const renderVideoImageHolder2 = () => {
    console.log("rendervideo2");
    return (
      <>
        {currentReel && currentReel.video ? (
          <div style={{ height: "500px" }}>
            <video
              className="video"
              width="100%"
              height="100%"
              controls
              src={currentReel.video.fileURL}
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

  const renderThumbnailHolder = () => {
    if (currentReel && currentReel.thumbnail) {
      return (
        <div style={{ height: "500px" }}>
          <img
            src={currentReel.thumbnail.fileURL}
            alt="Interactive Page Image"
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center", padding: "30px" }}>
          <div>There is no current Thumbnail!</div>
        </div>
      );
    }
  };

  function handleRejectReel() {
    console.log("clicked handleReject");
    console.log("rejectionReason: ", rejectionReason);
    fetch("http://localhost:8080/reel/rejectReel/" + currentReel.reelId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: rejectionReason,
    }).then(() => {
      console.log("Reel Rejected Successfully!");
      //call back func
      handleBack();
    });
  }

  function handleApproveReel() {
    console.log("clicked handleApprove");
    fetch("http://localhost:8080/reel/approveReel/" + currentReel.reelId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("Reel Approved Successfully!");
      handleBack();
      //call back func
    });
  }

  function handleBack() {
    console.log("clicked handleBack");
    navigate(`/pendingReelApprovals`);
  }

  return (
    <>
      {currentReel && (
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
          <div
            style={{
              backgroundImage: "linear-gradient(to right, #FF8300, #A3C4BC)",
              color: "white",
              padding: "5px",
              width: "100%",
              borderRadius: "10px",
              marginLeft: "",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBack()}
              style={{
                marginLeft: "0px",
                marginBottom: "10px",
                justifySelf: "flex-start",
              }}
            >
              Back
            </Button>
            {status == "PENDING" &&
              <h1 style={{ marginRight: "1000px" }}>Pending Reel Approval</h1>
            }
                     {status == "LIVE" &&
              <h1 style={{ marginRight: "1000px" }}>Approved Reel</h1>
            }
                     {status == "REJECTED" &&
              <h1 style={{ marginRight: "1000px" }}>Rejected Reel</h1>
            }
          </div>
          <Box sx={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
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
                  <h1
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #FF8300, #A3C4BC)",
                      color: "white",
                      padding: "5px",
                      width: "100%",
                      borderRadius: "10px",
                      marginLeft: "",
                      marginBottom: "10px",
                      alignSelf: "start",
                    }}
                  >
                    Reel
                  </h1>
                  {renderVideoImageHolder2()}
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
                      <FavoriteIcon style={{ color: "red" }} />
                      &nbsp;{currentReel.numLikes} likes
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
                      <VisibilityIcon></VisibilityIcon>&nbsp;
                      {currentReel.numViews} views
                    </p>
                  </div>

                  <Divider style={{ marginTop: "20px" }}></Divider>
                  <Grid style={{ padding: "20px" }}>
                    <p>
                      <b style={{ color: "#296d98" }}>
                        {currentReel.creatorName}
                      </b>
                    </p>
                    &nbsp;<u>{currentReel.reelTitle}</u>
                    <br></br>
                    <p>{currentReel.reelCaption}</p>
                  </Grid>
                </Paper>
              </Grid>
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
                  {renderThumbnailHolder()}
                  <h1
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #FF8300, #A3C4BC)",
                      color: "white",
                      padding: "5px",
                      width: "100%",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    Thumbnail
                  </h1>
                </Paper>
              </Grid>
            </div>
            <TextField
              style={{ marginLeft: "75px", width: "400px", marginTop: "20px" }}
              multiline
              type="text"
              placeholder="Type rejection reason here... (if applicable)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></TextField>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "43%",
                marginTop: "20px",
                marginLeft: "75px",
              }}
            >
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
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApproveReel}
                  >
                    Approve
                  </Button>
                </>
              )}
            </div>
          </Box>
        </Grid>
      )}
    </>
  );
}
