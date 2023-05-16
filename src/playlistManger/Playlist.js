import { useState, useEffect } from 'react';
import YTSearch from 'youtube-api-search';
import { toast } from 'react-toastify';
import Skeleton from '@mui/material/Skeleton';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');
toast.configure();

const youTubeApiKey = "AIzaSyDOlMF3B52Ssd0wFzEZO8vaxgCoSCY-0v0";
// Call All Playlist Data
function Playlist() {
  // ...............................................................................................
  // Style Sheet
  useEffect(() => {
    document.body.style.height = "auto";
    document.getElementsByClassName('main-container')[0].style.height = "100%";
  }, []);
  // Call All PlayList Data

  const [checkPlaylistFound, setcheckPlaylistFound] = useState(false);
  const [checkPlaylistVideoFound, setcheckPlaylistVideoFound] = useState(false);

  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [currentPlaylistVideoIndex, setCurrentPlaylistVideoIndex] = useState(0);
  const [allPlaylistData, setAllPlaylistData] = useState([]);

  const [currentPlaylistVideoData, setCurrentPlaylistVideoData] = useState([]);
  const [currentPlaylistData, setCurrentPlaylistData] = useState([]);

  const CallAllPlayListData = () => {
    axios.get(process.env.REACT_APP_API_URL + '/playlist/getPlayListData').then((res) => {
      if (res.data.length == 0)
        setcheckPlaylistFound(false);
      else {
        setcheckPlaylistFound(true);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].videos.length == 0) {
            res.data[i].thumbnail = "https://picsum.photos/200/300";
          }
          else {
            res.data[i].thumbnail = res.data[i].videos[0].thumbnail;
          }
        }
        setAllPlaylistData(res.data)
        if (res.data[currentPlaylistIndex].videos.length == 0) {
          console.log('videos not Found')
        }
        else {
          setCurrentPlaylistData(res.data[currentPlaylistIndex].videos);
          setCurrentPlaylistVideoData([res.data[currentPlaylistIndex].videos[currentPlaylistVideoIndex]]);
        }
      }
    })
  }
  // Use Effect for First call Data
  useEffect(() => {
    CallAllPlayListData();
  }, [])


  // Set Temp Video Data in Playliist
  const [YoutubeTempPlaylist, setYoutubeTempPlaylist] = useState(currentPlaylistData);


  const changePlayList = (ind) => {
    setCurrentPlaylistIndex(ind);
    setYoutubeTempPlaylist(currentPlaylistData)
  }

  // ...............................................................................................
  // return youTubeApiKey;
  const [allYoutubeSearchData, SetallYoutubeSearchData] = useState('');
  const [youtubeSearchKeyword, setYoutubeSearchKeyword] = useState('');


  const callYoutubeSearchApi = (e) => {
    e.preventDefault();
    // All youtube catagrorys 
    const catagrorys = ['Film & Animation', 'Autos & Vehicles', 'Music', 'Pets & Animals', 'Sports', 'Short Movies', 'Travel & Events', 'Gaming', 'Videoblogging', 'People & Blogs', 'Comedy', 'Entertainment', 'News & Politics', 'Howto & Style', 'Education', 'Science & Technology', 'Nonprofits & Activism', 'Movies', 'Anime/Animation', 'Action/Adventure', 'Classics', 'Comedy', 'Documentary', 'Drama', 'Family', 'Foreign', 'Horror', 'Sci-Fi/Fantasy', 'Thriller', 'Shorts', 'Shows', 'Trailers'];
    // call Api
    if (youtubeSearchKeyword != '') {
      YTSearch({ key: youTubeApiKey, term: youtubeSearchKeyword }, (videos) => {
        // Call ALl Likes,views,Time Duration
        for (let i = 0; i < videos.length; i++) {
          axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=` + videos[i].id.videoId + `&key=` + youTubeApiKey)
            .then(res => {
              videos[i].likes = res.data.items[0].statistics.likeCount;
              videos[i].views = res.data.items[0].statistics.viewCount;
              videos[i].category = catagrorys[res.data.items[0].snippet.categoryId];
              videos[i].tags = res.data.items[0].snippet.tags;
              videos[i].duration = res.data.items[0].contentDetails.duration;
            });
        }
        console.log(videos)
        SetallYoutubeSearchData(videos);
      });
    }
    else
      toast.error("Please Enter Search Keyword");
  }
  // Save Video For Playlist

  const saveVideoInCurrentPlaylist = (title, videoId, publishTime, channelTitle, channelId, thumbnails, description, duration, likes, views, category, tags) => {
    var youtubeVideoUrl = `https://www.youtube.com/watch?v=` + videoId;
    var youtubeChannelUrl = `https://www.youtube.com/channel/` + channelId;
    let newListArray = [];
    newListArray.title = title
    newListArray.url = youtubeVideoUrl
    newListArray.publishTime = publishTime
    newListArray.channelTitle = channelTitle
    newListArray.youtubeChannel = youtubeChannelUrl
    newListArray.thumbnail = thumbnails
    newListArray.desc = description
    newListArray.duration = duration
    newListArray.likes = likes
    newListArray.views = views
    newListArray.tags = tags
    setYoutubeTempPlaylist(YoutubeTempPlaylist => [...YoutubeTempPlaylist, newListArray])
    console.log(YoutubeTempPlaylist)
  }
  //  ...........................................................................

  //  Up Down Manage

  const tempPlayListVideoTop = (ind) => {
    if (ind != 0) {
      let newListArray = YoutubeTempPlaylist;
      setYoutubeTempPlaylist([]);
      var element = newListArray[ind];
      newListArray.splice(ind, 1);
      newListArray.splice(ind - 1, 0, element);
      setYoutubeTempPlaylist(newListArray);
      CallAllPlayListData();
    }
  }
  const tempPlayListVideoDown = (ind) => {
    if (ind != YoutubeTempPlaylist.length - 1) {
      let newListArray = YoutubeTempPlaylist;
      setYoutubeTempPlaylist([]);
      var element = newListArray[ind];
      newListArray.splice(ind, 1);
      newListArray.splice(ind + 1, 0, element);
      setYoutubeTempPlaylist(newListArray);
      CallAllPlayListData();
    }
  }
  //  Temp PlayList Remove Btn

  const tempPlayListVideoRemove = (ind) => {
    let newListArray = YoutubeTempPlaylist;
    newListArray.splice(ind, 1);
    setYoutubeTempPlaylist(newListArray);
    CallAllPlayListData();
  }

  // ............................... Create new Playlist .................................................
  const [NewplaylistNameTitle, setNewplaylistNameTitle] = useState('');
  const addNewPlaylistSubmit = () => {
    axios.post(process.env.REACT_APP_API_URL + '/manageplaylist/add', {
      title: NewplaylistNameTitle,
      opration: 'add',
    }).then((res) => {
      toast.success("Added Successfully", {});
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        toast.error(err.response.data.errorMessage, {});
      }
    });
  }

  // Main Function
  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-3 p-0'>
          {/* <AddVideoInTempPlaylist /> */}
          {/* .................................................................................... */}
          <div style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div className='row' >
              <div className='col-6'>
                <button style={{ outline: 'none' }} data-bs-toggle="modal" data-bs-target="#addPlaylist" className='btn w-100 btn-light rounded-0 border-0 d-flex p-0'>
                  <img src={require('../asset/images/Button_PasteCode.png')} className="img-fluid" alt="" style={{ width: '30px', marginRight: '5px' }} />
                  <span className='m-auto' style={{ fontSize: '11px' }}>New Playlist</span>
                </button>
              </div>
              <div className='col-6'>
                <button className='btn w-100 btn-light rounded-0 border-0 d-flex p-0'>
                  <img src={require('../asset/images/Button_PasteCode.png')} className="img-fluid" alt="" style={{ width: '30px', marginRight: '1px' }} />
                  <span className='m-auto' style={{ fontSize: '11px' }}>Paste Embed Code</span>
                </button>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='creator_PlaylistPlayer__menu playlistEdit'>
                {
                  YoutubeTempPlaylist.length != 0 ?
                    (
                      YoutubeTempPlaylist.map((val, index) => {
                        return (
                          <div key={index} className='mainBox' style={{ position: 'relative' }}>
                            <div className="creator_VideoBadge">
                              <div className='creator_VideoBadge__logo' style={{ backgroundImage: `url(${val.thumbnail})` }}
                              />
                              <div className='creator_VideoBadge__info' style={{ padding: '3px' }}>
                                <div className='info'>
                                  <p style={{ lineHeight: '11px', fontSize: '10px', margin: '2px', color: '#fff' }}>
                                    {val.title}<br />
                                    {val.channelTitle} - {val.publishTime}<br />
                                    {val.views} views - {val.likes} likes <br />
                                    Category: Sports - CC?: y/n<br />
                                    On playlist?: User Playlist 2 - Play@: 00:04:00:00
                                  </p>
                                </div>
                              </div>
                            </div>
                            <ul className='icons' style={{ height: '100%', position: 'absolute', top: '0', right: '0', listStyle: 'none' }}>
                              <li onClick={() => tempPlayListVideoTop(index)}><img src={require('../asset/images/Button_moveUp2.png')} className="img-fluid" alt="" style={{ width: '22px' }} /></li>
                              <li><img src={require('../asset/images/Button_play2.png')} className="img-fluid" alt="" style={{ width: '22px' }} /></li>
                              <li onClick={() => tempPlayListVideoRemove(index)}><img src={require('../asset/images/Button_subtract2.png')} className="img-fluid" alt="" style={{ width: '22px' }} /></li>
                              <li onClick={() => tempPlayListVideoDown(index)}><img src={require('../asset/images/Button_moveDown2.png')} className="img-fluid" alt="" style={{ width: '22px' }} /></li>
                            </ul>
                          </div>
                        )
                      })
                    ) : ("")
                }
              </div>
            </div>
            <div className='row py-3'>
              <div className='col-4'>
                <button className='btn w-100 btn-light rounded-0 border-0 d-flex p-0'>
                  <img src={require('../asset/images/Button_social.png')} className="img-fluid" alt="" style={{ width: '25px' }} />
                  <span className='m-auto' style={{ fontSize: '8px' }}>Share Playlist </span>
                </button>
              </div>
              <div className='col-4 p-0'>
                <button className='btn w-100 btn-light rounded-0 border-0 d-flex p-0'>
                  <img src={require('../asset/images/Button_delete.png')} className="img-fluid" alt="" style={{ width: '25px' }} />
                  <span className='m-auto' style={{ fontSize: '11px' }}>Delete Playlist </span>
                </button>
              </div>
              <div className='col-4'>
                <button className='btn w-100 btn-light rounded-0 border-0 d-flex p-0'>
                  <img src={require('../asset/images/Button_savePlaylist.png')} className="img-fluid" alt="" style={{ width: '25px' }} />
                  <span className='m-auto' style={{ fontSize: '9px' }}>Save Playlist</span>
                </button>
              </div>
            </div>
          </div>
          {/* ....................................................................................................... */}
          <div className='row my-3'>
            <span className='mb-3' style={{ textAlign: 'center', color: '#fff' }}>All User Playlists</span>
            <div className='creator_PlaylistPlayer__playlists'>
              {
                checkPlaylistFound ? (
                  allPlaylistData.length == 0 ? (<VideoLoader />) :
                    (
                      allPlaylistData.map((playlist, index) => {
                        return (
                          <div key={index} className='playlist_main_box mb-2' style={{ position: 'relative', background: 'rgba(0,0,0,0.5)' }}>
                            <div style={{ padding: '0 0 0 30px', display: 'flex' }}>
                              <div className='creator_VideoBadge__logo' style={{ backgroundImage: `url(${playlist.thumbnail})` }} />
                              <div className='info' style={{ width: '80%', padding: '5px' }}>
                                <p style={{ lineHeight: '10px', fontSize: '10px', margin: '2px', color: '#fff' }}>
                                  {playlist.title}<br />
                                  User : Hello <br />
                                  Channel : <br />
                                  Notes : <br />
                                  Keyword : travel <br />
                                  Category:Nature,more... <br />
                                  Total Runtime : 00:00:00:00 <br />
                                  Plays: <br />
                                </p>
                              </div>
                            </div>
                            <ul className='icons' style={{ height: '100%', position: 'absolute', top: '25%', left: '-28px', listStyle: 'none' }}>
                              <li onClick={() => changePlayList(index)}><img src={require('../asset/images/Button_play2.png')} className="img-fluid" alt="" style={{ width: '22px' }} /></li>
                              <li><img src={require('../asset/images/Button_moveDown2.png')} className="img-fluid" alt="" style={{ width: '22px' }} /></li>
                            </ul>
                          </div>
                        )
                      })
                    )
                ) : (
                  <div className='d-flex' style={{ width: '100%', height: '100px', position: 'relative', background: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '25px' }}>Playlist Not Found</span>
                  </div>
                )
              }

            </div>
          </div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='creator_PlaylistPlayer__player-wrapper'>
            player
          </div>
          <div className='row my-3'>
            <div className='col-6 my-2'>
              <button className='btn w-100 btn-light rounded-0 border-0 d-flex p-0'>
                <img src={require('../asset/images/Button_Random.png')} className="img-fluid" alt="" style={{ width: '30px', marginRight: '5px' }} />
                <span className='m-auto' style={{ fontSize: '12px' }}>Randomize Playlist</span>
              </button>
            </div>
            <div className='col-6'></div>
            <div className='col-6'>
              <button className='btn w-100 btn-light rounded-0 border-0 d-flex p-0'>
                <img src={require('../asset/images/Button_Loop.png')} className="img-fluid" alt="" style={{ width: '30px', marginRight: '5px' }} />
                <span className='m-auto' style={{ fontSize: '12px' }}>Loop Playlist</span>
              </button>
            </div>
            <div className='col-6'>
              <button className='btn w-100 btn-light rounded-0 border-0 d-flex p-0'>
                <img src={require('../asset/images/ButtonPlaylistLength.png')} className="img-fluid" alt="" style={{ width: '30px', marginRight: '5px' }} />
                <span className='m-auto' style={{ fontSize: '12px' }}>Playlist Runtime</span>
              </button>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className='row'>
              <span style={{ textAlign: 'center', color: '#fff' }}>User Upload</span>
            </div>
            <div className='row my-2'>
              <div className='col-6'>
                <button className='btn w-100 btn-light rounded-0 border-0 d-flex p-0'>
                  <img src={require('../asset/images/Button_moveUp.png')} className="img-fluid" alt="" style={{ width: '30px', marginRight: '5px' }} />
                  <span className='m-auto' style={{ fontSize: '12px' }}>Upload Video</span>
                </button>
              </div>
            </div>
            <div className='container mt-3'>
              <div className='creator_PlaylistPlayer__menu userUploadVideo'>
                videos
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-3 p-0'>
          {/* ................  Youtube Api  ............................... */}
          {/* <YouTubeSearchApi /> */}
          <div style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div className='row'>
              <div className='col-8'>
                <form onSubmit={(e) => callYoutubeSearchApi(e)} className='d-flex'>
                  <img onClick={(e) => callYoutubeSearchApi(e)} src={require('../asset/images/ButtonSearch.png')} className="img-fluid" alt="" style={{ width: '40px' }} />
                  <input onChange={(e) => setYoutubeSearchKeyword(e.target.value)} type="text" placeholder='Search Youtube' style={{ outline: 'none' }} />
                </form>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='creator_PlaylistPlayer__menu userUploadVideo'>
                {
                  allYoutubeSearchData.length == 0 ? (<VideoLoader />) : (
                    <>
                      {
                        allYoutubeSearchData.map((videos, index) => {
                          return (
                            <div key={index} className='mainBox' style={{ position: 'relative' }}>
                              <div className="creator_VideoBadge">
                                <div className='creator_VideoBadge__logo' style={{ backgroundImage: `url(${videos.snippet.thumbnails.default.url})` }} />
                                <div className='creator_VideoBadge__info' style={{ padding: '3px' }}>
                                  <div className='info'>
                                    <p style={{ lineHeight: '11px', fontSize: '10px', margin: '2px', color: '#fff' }}>
                                      {videos.snippet.title}<br />
                                      {videos.snippet.channelTitle} - {videos.snippet.publishTime}<br />
                                      Category: Sports - CC?: y/n<br />
                                      On playlist?: User Playlist 2 - Play@: 00:04:00:00
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <ul className='icons' style={{ height: '100%', position: 'absolute', top: '30%', left: '-30px', listStyle: 'none' }}>
                                <li>  {/* data-bs-toggle="modal" data-bs-target="#staticBackdrop" */}
                                  <img onClick={() => saveVideoInCurrentPlaylist(
                                    videos.snippet.title,
                                    videos.id.videoId,
                                    videos.snippet.publishTime,
                                    videos.snippet.channelTitle,
                                    videos.snippet.channelId,
                                    videos.snippet.thumbnails.high.url,
                                    videos.snippet.description,
                                    videos.duration,
                                    videos.likes,
                                    videos.views,
                                    videos.category,
                                    videos.tags
                                  )} src={require('../asset/images/Button_Add2.png')} className="img-fluid" alt="" style={{ width: '22px' }} />
                                </li>
                                <li>
                                  <img src={require('../asset/images/Button_play2.png')} className="img-fluid" alt="" style={{ width: '22px' }} />
                                </li>
                              </ul>
                            </div>
                          )
                        })
                      }
                    </>
                  )
                }
              </div>
            </div>
          </div>
          {/* ................................................................................... */}
          <div className='mt-3' style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div className='row' >
              <div className='col-8'>
                <button className='btn w-100 btn-light rounded-0 border-0 d-flex p-0'>
                  <img src={require('../asset/images/ButtonSearch.png')} className="img-fluid" alt="" style={{ width: '30px', marginRight: '5px' }} />
                  <span className='m-auto' style={{ fontSize: '15px' }}>Search Vimeo</span>
                </button>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='creator_PlaylistPlayer__menu userUploadVideo'>
                <div className='creator_PlaylistPlayer__menu playlistEdit'>
                  <VideoLoader />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add Video In playlist  */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Select Playlist</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                auto Complete
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                {/* <button onClick={addYoutubeVideoInPlaylist} data-bs-dismiss="modal" type="button" className="btn btn-primary">Add Video</button> */}
              </div>
            </div>
          </div>
        </div>
        {/* Add New Playlist */}
        <div className="modal fade" id="addPlaylist" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Select Playlist</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Title</label>
                    <div className="input-group" id="show_hide_password">
                      <input onChange={(e) => setNewplaylistNameTitle(e.target.value)} type="text" className="form-control border-end-0" id="inputChoosePassword" placeholder="Enter Playlist Title" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={addNewPlaylistSubmit} data-bs-dismiss="modal" type="button" className="btn btn-primary">Add Playlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
// Function Video Loader
function VideoLoader() {
  return (
    <div className='row px-3 mt-3'>
      <div className='col-5 mb-4'>
        <Skeleton animation="wave" variant="rectangular" width={'100%'} height={100} />
      </div>
      <div className='col-7 mb-4'>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className='col-5 mb-4'>
        <Skeleton animation="wave" variant="rectangular" width={'100%'} height={100} />
      </div>
      <div className='col-7 mb-4'>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className='col-5 mb-4'>
        <Skeleton animation="wave" variant="rectangular" width={'100%'} height={100} />
      </div>
      <div className='col-7 mb-4'>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className='col-5 mb-4'>
        <Skeleton animation="wave" variant="rectangular" width={'100%'} height={100} />
      </div>
      <div className='col-7 mb-4'>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className='col-5 mb-4'>
        <Skeleton animation="wave" variant="rectangular" width={'100%'} height={100} />
      </div>
      <div className='col-7 mb-4'>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
    </div>
  )
}

export default Playlist