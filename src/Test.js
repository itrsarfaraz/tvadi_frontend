import React,{useState,useEffect} from "react";
const axios = require('axios');
function Test()
{
    const [PlayListData,SetAllPlayListData] = useState([]);
    const [PlayListVideos,SetAllPlayListVideoData] = useState([]);
    const PlayListDataAndVideos = [];
    var title = [];
    var video = [];
    video[0] = [];
    video = [];
      const handle = () =>
      {

        axios.get(process.env.REACT_APP_API_URL + "/manageplaylist/getAlldata").then((response) => {
                SetAllPlayListData(response.data);
        });
        axios.get(process.env.REACT_APP_API_URL + "/playlist_video/getAlldata").then((response) => {
            SetAllPlayListVideoData(response.data);
        });
        var AllData = [];
        AllData[0] = [];
        AllData[1] = [];
        for(let i=0;i<PlayListData.length;i++)
        {
            title[i] = PlayListData[i].title;
            for(let j=0;j<PlayListData[i].videos.length;j++)
            {
                video[i] = PlayListData[i].videos   ;
            }   
        }
         AllData[0] = AllData[0].concat(title);
         
         for(let i=0;i<video.length;i++)
        {
            for(let j=0;j<video[i].length;j++)
            {
                // console.log(video[i][j])
                for(let k=0;k<PlayListVideos.length;k++)
                {
                    if(PlayListVideos[k]._id==video[i][j])
                    {
                        AllData[1][j] = PlayListVideos[k];
                    }
                }
            }
        
        console.log(AllData)
    }
      }

  return (
                <>
                        <button onClick={handle}>Hello</button>
                </>
  )
}

export default Test