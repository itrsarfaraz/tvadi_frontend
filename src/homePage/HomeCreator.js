import { useEffect, useState } from 'react';
import { HomePlayer } from './HomePlayer'
import './css/App.css'
const axios = require('axios');

function App() {

  const [allPlaylistData, SetPlaylist] = useState([]);
  const [playlistThumbnail, SetThumbnail] = useState([]);
  const [loadData, SetLoadData] = useState(false);
  var playThumbnail = [[], []];
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/playlist/getPlayListData').then((res) => {
      res.data.map((val, index) => {
        val.image = [];
        if (val.videos.length == 0) {
          val.image.push("no");
        }
        else {
          for (let i = 0; i < val.videos.length; i++) {
            val.image.push(val.videos[i].thumbnail)
          }
        }
      })
      SetPlaylist(res.data)
      SetLoadData(true);
    })
  })

  // useEffect(() => 
  // {
  //   if (allPlaylistData.length != 0) {
  //     for (let i = 0; i < allPlaylistData.length; i++) 
  //     {
  //       if (allPlaylistData[i].videos.length == 0) 
  //       {
  //         playThumbnail.push("https://img.icons8.com/cotton/64/000000/import-file.png");
  //       } 
  //       else {
  //         for (let j = 0; j < allPlaylistData[i].videos.length; j++) {
  //           playThumbnail.push(allPlaylistData[i].videos[j].thumbnail);
  //         }
  //       }
  //     }
  //     for (let i = 0; i < allPlaylistData.length; i++) 
  //     {
  //       allPlaylistData[i].image = playThumbnail[i];
  //     }
  //   }
  // })

  return (
    <>
      {
        loadData ? (
          <div className="creator_App">
            <div className="creatot_App__player">
              <HomePlayer playlists={allPlaylistData} />
            </div>
          </div>
        ) : (
          ''
        )
      }
    </>

  )
}

export default App
