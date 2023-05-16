import React, { useEffect,useState } from 'react';
import Playlist from './Playlist';
const axios = require('axios');
function PlaylistManager() {
    const [allPlaylistData, SetPlaylist] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/playlist/getPlayListData').then((res) => {
            SetPlaylist(res.data)
        })
    });
    return (
        <>
            {
                allPlaylistData.length!=0?(
                    <Playlist playlistsData={allPlaylistData} />
                ):("")
            }
        </>
    )
}

export default PlaylistManager