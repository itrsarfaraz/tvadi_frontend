import { useEffect, useState } from 'react';
import { PlaylistPlayer } from './PlaylistPlayer'
import './css/App.css'
const axios = require('axios');
var moment = require('moment');

function App() {
  const [allPlaylistData, SetPlaylist] = useState([]);
  const [loadData, SetLoadData] = useState(false);
  var playThumbnail = [[], []];
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/playlist/getPlayListData').then((res) => {
      if (res.data.length != 0) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].title == "test")
            res.data.splice(i, 1);
        }
      }
      res.data.map((val, index) => {
        // calculate PlaylistTotalTime 
        var totalTime = 0;
        var catagrory = [];
        if (val.videos.length == 0)
          catagrory.push("null");
        for (let i = 0; i < val.videos.length; i++) {
          totalTime = totalTime + parseInt(val.videos[i].duration);
          catagrory.push(val.videos[i].category);
        }
        val.category = catagrory;
        val.totalTime = moment("2022-01-01").startOf('day').seconds(totalTime).format('H:mm:ss');
        val.image = [];
        if (val.videos.length == 0) {
          val.image.push("no");
        }
        else {
          for (let i = 0; i < val.videos.length; i++)
            val.image.push(val.videos[i].thumbnail)
        }
      })
      SetPlaylist(res.data)
      SetLoadData(true);
    })

  })
  return (
    <>
      {loadData ? (
        <div className="creator_App">
          <div className="creatot_App__player">
            <PlaylistPlayer playlists={allPlaylistData} />
          </div>
        </div>
      ) : ('')}
    </>
  )
}
export default App
