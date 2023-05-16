import React from 'react'
import Skeleton from "@mui/material/Skeleton";
function VideoLoader() {
  return (
    <div className="row px-3 mt-3">
      <div className="col-5 mb-4">
        <Skeleton animation="wave" variant="rectangular" width={"100%"} height={100} />
      </div>
      <div className="col-7 mb-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className="col-5 mb-4">
        <Skeleton animation="wave" variant="rectangular" width={"100%"} height={100} />
      </div>
      <div className="col-7 mb-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className="col-5 mb-4">
        <Skeleton animation="wave" variant="rectangular" width={"100%"} height={100} />
      </div>
      <div className="col-7 mb-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className="col-5 mb-4">
        <Skeleton animation="wave" variant="rectangular" width={"100%"} height={100} />
      </div>
      <div className="col-7 mb-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className="col-5 mb-4">
        <Skeleton animation="wave" variant="rectangular" width={"100%"} height={100} />
      </div>
      <div className="col-7 mb-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
    </div>
  )
}

export default VideoLoader