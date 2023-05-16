// import { useState, useEffect } from 'react';
// import classnames from 'classnames';
// import {Paper, Grid , styled} from '@mui/material';
// import ReactPlayer from 'react-player'
// import './css/PlaylistPlayer.css';
// import YTSearch from 'youtube-api-search';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Skeleton from '@mui/material/Skeleton';

// import LinearProgress from '@mui/material/LinearProgress';
// import swal from 'sweetalert';


// const axios = require('axios');
// toast.configure();


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));




// export const HomePlayer = ({ playlists }) => {
//     // Api Key
//     const YoutubeApiKey = "AIzaSyDOlMF3B52Ssd0wFzEZO8vaxgCoSCY-0v0";
//     // Style Sheet
//     useEffect(() => {
//         document.body.style.height = "auto";
//         document.getElementsByClassName('main-container')[0].style.height = "100%";
//         changePalylistData(0);
//     }, []);
//     // Video and Playlist Default Selected
//     const [videoIndex, setVideoIndex] = useState(0)
//     const [playlistIndex, setPlaylistIndex] = useState(0)
//     const currentPlaylist = playlists[playlistIndex];  // 0
//     const currentVideo = currentPlaylist.videos[videoIndex];  // 0
//     // console.log(currentPlaylist.videos)
//     const [currentVideoUrl, setCurrentVideoUrl] = useState(currentVideo);
   
//     // Loop Playlist
//     const [loopPlayList,setLoopPlayList] = useState(true);
//     // Video Ended
//     const onEnded = () => {
//         if (YoutubeTempPlaylist[videoIndex + 1]) {
//             setVideoIndex(videoIndex + 1)
//         }
//         else if (playlists[playlistIndex + 1])
//         {
//             if (playlists[playlistIndex + 1].title == "Temp")
//             {
//                 setPlaylistIndex(0)
//                 setVideoIndex(0)
//                 changePalylistData(0);
//             }
//             else 
//             {
//                 if(!loopPlayList)
//                 {
//                     setPlaylistIndex(playlistIndex + 1)
//                     setVideoIndex(0)
//                     changePalylistData(playlistIndex + 1);
//                 }
//                 else
//                 {
//                     setLoopPlayList(playlistIndex);
//                     setVideoIndex(0)
//                     changePalylistData(playlistIndex);
//                 }
//             }
//         }
//         else {
//             setPlaylistIndex(0)
//             setVideoIndex(0)
//             changePalylistData(0);
//         }
//     }


//     // Youtube Temp Data
//     // const [YoutubeTempPlaylist, setYoutubeTempPlaylist] = useState(playlists[playlistIndex].videos);
//     const [YoutubeTempPlaylist, setYoutubeTempPlaylist] = useState([]);

//     const changePalylistData = (ind) => {
//         setYoutubePlay(false);
//         setYoutubeTempPlaylist(playlists[ind].videos)
//         console.log(YoutubeTempPlaylist);
//     }
//     //  Youtube Search Video using api

//     const [searchKeyword, setSearchKeyword] = useState('');
//     const [showSearchVideo, setshowSearchVideo] = useState(true);
//     const [allYoutubeSearchVideoData, SetallYoutubeSearchVideoData] = useState([]);
//     const searchYoutubeVideo = (e) => {
//         e.preventDefault();
//         setshowSearchVideo(false);
//         if (searchKeyword.length > 1) {
//             const catagrorys = ['Film & Animation', 'Autos & Vehicles', 'Music', 'Pets & Animals', 'Sports', 'Short Movies', 'Travel & Events', 'Gaming', 'Videoblogging', 'People & Blogs', 'Comedy', 'Entertainment', 'News & Politics', 'Howto & Style', 'Education', 'Science & Technology', 'Nonprofits & Activism', 'Movies', 'Anime/Animation', 'Action/Adventure', 'Classics', 'Comedy', 'Documentary', 'Drama', 'Family', 'Foreign', 'Horror', 'Sci-Fi/Fantasy', 'Thriller', 'Shorts', 'Shows', 'Trailers'];
//             YTSearch({ key: YoutubeApiKey, term: searchKeyword }, (videos) => {
//                 console.clear();
//                 console.log(videos)
//                 SetallYoutubeSearchVideoData(videos);
//                 for (let i = 0; i < videos.length; i++) {
//                     axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=` + videos[i].id.videoId + `&key=` + YoutubeApiKey)
//                         .then(res => {
//                             videos[i].likes = res.data.items[0].statistics.likeCount;
//                             videos[i].views = res.data.items[0].statistics.viewCount;
//                             videos[i].category = catagrorys[res.data.items[0].snippet.categoryId];
//                             videos[i].tags = res.data.items[0].snippet.tags;
//                             videos[i].duration = res.data.items[0].contentDetails.duration;
//                         });
//                 }

//             })
//         }
//     }


//     const setYoutubeDatainState = (title, videoId, publishTime, channelTitle, channelId, thumbnails, description, duration, likes, views, category, tags) => {
//         var embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/` + videoId + `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
//         var youtubeVideoUrl = `https://www.youtube.com/watch?v=` + videoId;
//         var youtubeChannelUrl = `https://www.youtube.com/channel/` + channelId;
//         let newListArray = [];
//         newListArray.title = title
//         newListArray.url = youtubeVideoUrl
//         newListArray.publishTime = publishTime
//         newListArray.channelTitle = channelTitle
//         newListArray.youtubeChannel = youtubeChannelUrl
//         newListArray.embedCode = embedCode;
//         newListArray.thumbnail = thumbnails
//         newListArray.desc = description
//         newListArray.category = category
//         newListArray.duration = duration
//         newListArray.likes = likes
//         newListArray.views = views
//         newListArray.tags = tags
//         setYoutubeTempPlaylist(YoutubeTempPlaylist => [newListArray, ...YoutubeTempPlaylist])
//         console.log(newListArray);
//     }

//     //  Add New Playlist

//     const [newplaylistName, setnewplaylistName] = useState('');
//     const addNewPlaylistSubmit = () => {
//         console.log(newplaylistName)
//         axios.post(process.env.REACT_APP_API_URL + '/manageplaylist/add', {
//             title: newplaylistName,
//             opration: 'add',
//         }).then((res) => {
//             toast.success("Added Successfully", {});
//         }).catch((err) => {
//             if (err.response && err.response.data && err.response.data.errorMessage) {
//                 toast.error(err.response.data.errorMessage, {});
//             }
//         });
//     }

//     //  Up Down Manage

//     const tempPlayListVideoTop = (ind) => {
//         if (ind != 0) {
//             let newListArray = YoutubeTempPlaylist;
//             setYoutubeTempPlaylist([]);
//             var element = newListArray[ind];
//             newListArray.splice(ind, 1);
//             newListArray.splice(ind - 1, 0, element);
//             setYoutubeTempPlaylist(newListArray);
//         }
//     }
//     const tempPlayListVideoDown = (ind) => {
//         if (ind != YoutubeTempPlaylist.length - 1) {
//             let newListArray = YoutubeTempPlaylist;
//             setYoutubeTempPlaylist([]);
//             var element = newListArray[ind];
//             newListArray.splice(ind, 1);
//             newListArray.splice(ind + 1, 0, element);
//             setYoutubeTempPlaylist(newListArray);
//         }
//     }
//     //  Temp PlayList Remove Btn

//     const tempPlayListVideoRemove = (ind) => {
//         let newListArray = YoutubeTempPlaylist;
//         newListArray.splice(ind, 1);
//         setYoutubeTempPlaylist(newListArray);
//     }
//     // play video
//     const playYoutubeTempList = (ind) => {
//         setVideoIndex(ind)
//     }
//     // delete
//     const deleteCurrentPlaylist = () => {
//         swal({
//             title: "Are you sure?",
//             text: "Once deleted, you will not be able to recover this imaginary file!",
//             icon: "warning",
//             buttons: true,
//             dangerMode: true,
//         }).then((willDelete) => {
//             if (willDelete) {
//                 if (playlists.length == 1) {
//                     axios.post(process.env.REACT_APP_API_URL + '/manageplaylist/add', {
//                         title: "Temp",
//                         opration: 'add',
//                     })
//                 }
//                 axios.post(process.env.REACT_APP_API_URL + '/manageplaylist/delete', { ids: currentPlaylist._id }).then((res) => {
//                     toast.success("Delete Successfully", {});

//                     setPlaylistIndex(0);
//                     setVideoIndex(0);
//                     changePalylistData(0);
//                 }).catch((err) => {
//                     if (err.response && err.response.data && err.response.data.errorMessage) {
//                         toast.error(err.response.data.errorMessage, {});
//                     }
//                 });
//             }
//         });
//     }
//     // save playlist
//     const saveYoutubePalylist = () => {
//         if (YoutubeTempPlaylist.length == 0) {
//             toast.error("Video Not Found !")
//         }
//         else {
//             for (let i = 0; i < YoutubeTempPlaylist.length; i++) {
//                 var ids = "0";
//                 if (YoutubeTempPlaylist[i]._id) {
//                     ids = YoutubeTempPlaylist[i]._id;
//                 }
//                 var times = "t" + i;
//                 axios.post(process.env.REACT_APP_API_URL + '/playlist/savePlayListData',
//                     {
//                         times: times,
//                         video_id: ids,
//                         playlist_id: currentPlaylist._id,
//                         title: YoutubeTempPlaylist[i].title,
//                         url: YoutubeTempPlaylist[i].url,
//                         views: YoutubeTempPlaylist[i].views,
//                         likes: YoutubeTempPlaylist[i].likes,
//                         posted_date: YoutubeTempPlaylist[i].publishTime,
//                         duration: YoutubeTempPlaylist[i].duration,
//                         channel_name: YoutubeTempPlaylist[i].channelTitle,
//                         channel_url: YoutubeTempPlaylist[i].youtubeChannel,
//                         thumbnail: YoutubeTempPlaylist[i].thumbnail,
//                         description: YoutubeTempPlaylist[i].desc,
//                         embeded_code: YoutubeTempPlaylist[i].embedCode,
//                         category: YoutubeTempPlaylist[i].category,
//                         keywords: null,
//                         plays_at: null,
//                         captions: null
//                     })
//                 // .then((res) => {
//                 //     toast.success("Done");
//                 //     console.log(res.data);
//                 // }).catch((err) => {
//                 //     toast.err("not Done")
//                 // });
//             }
//             toast.success("Playlist Updated!");
//         }
//     }
//     //  Set Embed Code

//     const [videoEmbedCodeForAddVideo, setVideoEmbedCodeForAddVideo] = useState('');
//     const [videoIdFromEmbedCode, setVideoIdFromEmbedCode] = useState('');
//     const addEmbedVideoInTeampPlayList = () => {
//         var EmbadeCode = document.getElementById('EmbadeCodeInputId').value;
//         if (EmbadeCode == '') {
//             toast.error("Please Enter Video Embed Code");
//             return;
//         }

//         var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
//             '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//             '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
//             '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//             '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//             '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

//         if (pattern.test(EmbadeCode)) {
//             var videoId_is = "";
//             let UslIs = EmbadeCode;
//             let paramString = UslIs.split('?')[1];
//             let queryString = new URLSearchParams(paramString);
//             for (let pair of queryString.entries()) {
//                 videoId_is = pair[1];
//             }
//             console.log(videoId_is);

//             var newListArray = [];
//             // axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId_is + '&key=' + YoutubeApiKey)
//             //     .then(res => {
//             //         console.log(res.data)
//             //     });
//             axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=` + videoId_is + `&key=` + YoutubeApiKey)
//                 .then(res => {

//                     console.log(res.data)

//                     newListArray.title = res.data.items[0].snippet.title;
//                     newListArray.url = `https://www.youtube.com/watch?v=` + res.data.items[0].id;
//                     newListArray.publishTime = res.data.items[0].snippet.title;
//                     newListArray.publishTime = res.data.items[0].snippet.publishedAt;
//                     newListArray.channelTitle = res.data.items[0].snippet.channelTitle;
//                     newListArray.youtubeChannel = `https://www.youtube.com/channel/` + res.data.items[0].snippet.channelId;
//                     newListArray.embedCode = res.data.items[0].id;
//                     newListArray.thumbnail = res.data.items[0].snippet.thumbnails.high.url;
//                     newListArray.desc = res.data.items[0].snippet.description;
//                     newListArray.likes = res.data.items[0].statistics.likeCount;
//                     newListArray.views = res.data.items[0].statistics.viewCount;
//                     newListArray.category = res.data.items[0].snippet.categoryId;
//                     newListArray.tags = res.data.items[0].snippet.tags;
//                     newListArray.duration = res.data.items[0].contentDetails.duration;

//                     console.log(newListArray)

//                     setYoutubeTempPlaylist(YoutubeTempPlaylist => [newListArray, ...YoutubeTempPlaylist])

//                 });

//         }
//         else {
//             toast.error("This is Embed Code");
//         }
//     }


//     const [youtubePlay, setYoutubePlay] = useState(false);
//     const [youtubePlayUrl, setYoutubePlayUrl] = useState("");



//     //  Vimeo api 
//     const [searchVimeoKeyword, setSearchVimeoKeyword] = useState('');
//     const [videoAllSearchData, setVideoAllSearchData] = useState([]);
//     const searchVimeoVideo = (e) => {
//         e.preventDefault();
//         if (searchVimeoKeyword == "") {
//             alert("Please Enter Search Value")
//         }
//         else {
//             axios.get('https://v1.nocodeapi.com/prakashsolanki/vimeo/qULUDodMlttbEuRW/search?q=' + searchVimeoKeyword + '&page=1&perPage=1').then(res => {
//                 console.log(res.data.data);
//                 setVideoAllSearchData(res.data.data);
//             });
//         }
//     }

//     //  Randomize playlist

//     const randomizePlaylist = () =>
//     {
//         var randomArray = YoutubeTempPlaylist;
//         let currentIndex = YoutubeTempPlaylist.length,randomIndex;
//         while(currentIndex != 0)
//         {
//             randomIndex = Math.floor(Math.random() * currentIndex);
//             currentIndex--;
           
//             [randomArray[currentIndex], randomArray[randomIndex]] = [randomArray[randomIndex], randomArray[currentIndex]];
//         }
//         setYoutubeTempPlaylist(randomArray);
//     }
//     return (

//         <>
//         <main>
//             <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
//                 <Grid sx={{ display: { xs: 'none', sm: 'block' } }} className="sideVideos Categories mt-2" item xs={6} sm={2} md={2}>
//                         <Item className='sideVideosHeading'>Categories</Item>
//                         {allPlaylistData.slice(0,3).map((val, index) => (
//                            <Grid className='videoItem' item xs={12} sm={12} md={12} key={index}>
//                                 <Item className='aboutVideo transparent'>
//                                     <img className='playBtn' src={playBtn} alt="" />
//                                     {val.title}
//                                 </Item>
//                                 <Item className='videoImg transparent p-0'>
//                                      <img src={val.image} alt="" /> 
//                                 </Item>
//                                 <Item className='videoDesc transparent'>{val.title}</Item>
//                             </Grid>
//                         ))}
//                 </Grid>
//                 {/* main Display */}
//                 <Grid item xs={6} sm={4} md={8} className="displayVideoBox my-2">
//                     <Item className='displayVideo py-2'>
//                     <div className='PlaylistPlayer__player-wrapper'>
                    
//                       <ReactPlayer url={allPlaylistData} className='PlaylistPlayer__player' width='100%' height='100%'  playing controls />
                    
//                    </div> 
//                     </Item>
//                 </Grid>
//                 {/* show on mobile */}
//                 <Grid sx={{ display: { xs: 'block', sm: 'none' } }} className="sideVideos Categories" item xs={6} sm={2} md={2}>
//                         <Item className='sideVideosHeading'>Categories</Item>
//                         {Array.from(Array(3)).map((_, index) => (
//                            <Grid className='videoItem' item xs={12} sm={12} md={12} key={index}>
//                                 <Item className='aboutVideo transparent'>
//                                     <img className='playBtn' src={playBtn} alt="" />
//                                     {side1[index]}
//                                 </Item>
//                                 <Item className='videoImg transparent p-0'>
//                                     <img src={require(`../asset/images/home/v${index+1}.png`)} alt="" />
//                                 </Item>
//                                 <Item className='videoDesc transparent'>DMC champ 2 time winn...</Item>
//                             </Grid>
//                         ))}
//                 </Grid>
//                 {/* end show on mobile */}
//                 <Grid className="sideVideos topPlaylists mt-2" item xs={6} sm={2} md={2}>
//                         <Item className='sideVideosHeading'>Top playlists</Item>
//                         {allPlaylistData.slice(2,5).map((val, index) => (
//                            <Grid className='videoItem' item xs={12} sm={12} md={12} key={index}>
//                                 <Item className='aboutVideo transparent'>
//                                     <img className='playBtn' src={playBtn} alt="" />
//                                     {val.title}
//                                 </Item>
//                                 <Item className='videoImg transparent p-0'>
//                                      <img src={val.image} alt="" /> 
//                                 </Item>
//                                 <Item className='videoDesc transparent'>DMC champ 2 time winn...</Item>
//                             </Grid>
//                         ))}
//                 </Grid>
//             </Grid>
//             {/* second */}
//             <Grid container columns={{ xs: 4, sm: 8, md: 12 }} className="my-3">
//                 <Grid className="sideVideos Categories" item xs={6} sm={2} md={2}>
//                         <Item className='sideVideosHeading'>Local</Item>
//                         {Array.from(Array(3)).map((_, index) => (
//                            <Grid className='videoItem' item xs={12} sm={12} md={12} key={index}>
//                                 <Item className='aboutVideo transparent'>
//                                     <img className='playBtn' src={playBtn} alt="" />
//                                     {side3[index]}
//                                 </Item>
//                                 <Item className='videoImg transparent p-0'>
//                                     <img src={require(`../asset/images/home/v${index+1}.png`)} alt="" />
//                                 </Item>
//                                 <Item className='videoDesc transparent'>DMC champ 2 time winn...</Item>
//                             </Grid>
//                         ))}
//                         <Grid className='videoItem' item xs={12} sm={12} md={12}>
//                            <Item className='videoDesc transparent p-5'>Space Reserved</Item>
//                         </Grid>
//                         <Grid className='videoItem' item xs={12} sm={12} md={12}>
//                            <Item className='videoDesc transparent p-5'>Space Reserved</Item>
//                         </Grid>
//                 </Grid>
//                 <Grid item container xs={6} sm={4} md={8} className="sideVideos todayList">
//                      <Grid className='videoItem' item xs={6} sm={12} md={6}>
//                         <Item className='aboutVideo transparent'>
//                                 <img className='playBtn' src={playBtn} alt="" />
//                                 Today List
//                             </Item>
//                             <Item className='videoImg transparent p-0'>
//                                 <img src={allPlaylistData.image} alt="" />
//                             </Item>
//                         <Item className='videoDesc transparent'>DMC champ 2 time winn...</Item>
//                     </Grid>
//                     <Grid className='videoItem' item xs={6} sm={12} md={6}>
//                         <Item className='aboutVideo transparent'>
//                                 <img className='playBtn' src={playBtn} alt="" />
//                                 Music
//                             </Item>
//                             <Item className='videoImg transparent p-0'>
//                                 <img src={todayMixlist} alt="" />
//                             </Item>
//                         <Item className='videoDesc transparent'>DMC champ 2 time winn...</Item>
//                     </Grid>
//                     {/* center divs */}
//                     <Grid item container xs={12} sm={12} md={12} className="moreVideos">
//                         {allPlaylistData.slice(0,16).map((val, index) => (
//                             <Grid className='videoItem' item xs={12} sm={12} md={3} key={index}>
//                                 <Item className='aboutVideo transparent'>
//                                     <img className='playBtn' src={playBtn} alt="" />
//                                     {val.title}
//                                 </Item>
//                                 <Item className='videoImg transparent p-0'>
//                                     {/* <img src={v1} alt="" /> */}
//                                     <img src={val.image} alt="" />
//                                 </Item>
//                                 <Item className='videoDesc transparent'>{val.title}</Item>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Grid>
//                 <Grid className="sideVideos topPlaylists" item xs={6} sm={2} md={2}>
//                         <Item className='sideVideosHeading'>Broadcast</Item>
//                         {Array.from(Array(3)).map((_, index) => (
//                            <Grid className='videoItem' item xs={12} sm={12} md={12} key={index}>
//                                 <Item className='aboutVideo transparent'>
//                                     <img className='playBtn' src={playBtn} alt="" />
//                                     {side4[index]}
//                                 </Item>
//                                 <Item className='videoImg transparent p-0'>
//                                     <img src={require(`../asset/images/home/v${index+1}.png`)} alt="" />
//                                 </Item>
//                                 <Item className='videoDesc transparent'>DMC champ 2 time winn...</Item>
//                             </Grid>
//                         ))}
//                         <Grid className='videoItem' item xs={12} sm={12} md={12}>
//                            <Item className='videoDesc transparent p-5'>Space Reserved</Item>
//                         </Grid>
//                         <Grid className='videoItem' item xs={12} sm={12} md={12}>
//                            <Item className='videoDesc transparent p-5'>Space Reserved</Item>
//                         </Grid>
//                 </Grid>
//             </Grid>
//         </main>  
//     </>
//     )
// }

// const VideoBadge = ({ video, onClick, active }) => {
//     const className = classnames({
//         'creator_VideoBadge': true,
//         'creator_VideoBadge--clickable': onClick,
//         'creator_VideoBadge--active': active
//     })
//     return (
//         <div className={className} onClick={onClick}>
//             <div
//                 className='creator_VideoBadge__logo'
//                 style={{ backgroundImage: `url(${video.thumbnail})` }}
//             />
//             <div className='creator_VideoBadge__info' style={{ padding: '3px' }}>
//                 <div className='info'>
//                     <p style={{ lineHeight: '11px', fontSize: '10px', margin: '2px', color: '#fff' }}>
//                         {video.title}<br />
//                         {video.channel_name}/Youtube - {video.posted_date}<br />
//                         {video.views} views - {video.likes} likes <br />
//                         category : {video.category}<br />
//                         duration : {video.duration}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// const PlaylistButton = ({ playlist, onClick, active }) => {
//     const className = classnames({
//         'creator_PlaylistButton': true,
//         'creator_PlaylistButton--active': active
//     })
//     return (
//         <>
//             <div style={{ padding: '0 0 0 30px', display: 'flex' }} className={className} onClick={onClick}>
//                 {/* <div className='creator_VideoBadge__logo' style={{ backgroundImage: `url(${playlist.image})` }}> */}
//                 <div className='creator_VideoBadge__logo'>
//                     {
//                         playlist.image == "no" ?
//                             (
//                                 <div className='w-100 p-3 m-0' style={{ height: '100%', background: '#fff' }}>
//                                     <img src="https://img.icons8.com/ios/90/000000/no-video--v1.png" className="img-fluid" style={{ display: 'inline-block', width: '100%' }} />
//                                 </div>
//                             ) : ("")
//                     }
//                     {
//                         playlist.image.length == 1 ?
//                             (
//                                 <div className='w-100' style={{ height: '100%', background: '#fff' }}>
//                                     <img src={playlist.image} className="img-fluid" style={{ display: 'inline-block', width: '100%', height: '100%' }} />
//                                 </div>
//                             ) : ("")
//                     }
//                     {
//                         playlist.image.length == 2 ?
//                             (
//                                 <div className='row'>
//                                     <div className='col-12'>
//                                         <img src={playlist.image[0]} className="img-fluid" style={{ display: 'inline-block', width: '100%' }} />
//                                     </div>
//                                     <div className='col-12'>
//                                         <img src={playlist.image[1]} className="img-fluid" style={{ display: 'inline-block', width: '100%' }} />
//                                     </div>
//                                 </div>
//                             ) : ("")
//                     }
//                     {
//                         playlist.image.length == 3 ?
//                             (
//                                 <div className='row px-2'>
//                                     <div className='col-12' style={{ height: '50px', background: `url(${playlist.image[0]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
//                                     </div>
//                                     <div className='col-6' style={{ height: '50px', background: `url(${playlist.image[1]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
//                                     </div>
//                                     <div className='col-6' style={{ height: '50px', background: `url(${playlist.image[2]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
//                                     </div>
//                                 </div>
//                             ) : ("")
//                     }
//                     {
//                         playlist.image.length >= 4 ?
//                             (
//                                 <div className='row px-2'>
//                                     <div className='col-6' style={{ height: '50px', background: `url(${playlist.image[0]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
//                                     </div>
//                                     <div className='col-6' style={{ height: '50px', background: `url(${playlist.image[1]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
//                                     </div>
//                                     <div className='col-6' style={{ height: '50px', background: `url(${playlist.image[2]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
//                                     </div>
//                                     <div className='col-6' style={{ height: '50px', background: `url(${playlist.image[3]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 ""
//                             )
//                     }
//                 </div>
//                 <div className='info' style={{ width: '80%', padding: '5px' }}>
//                     <p style={{ lineHeight: '10px', fontSize: '10px', margin: '2px', color: '#fff' }}>
//                         {playlist.title}<br />
//                         User : Username Created: Oct 10,2021<br />
//                         Channel : <br />
//                         Notes : <br />
//                         Keyword : travel <br />
//                         Category:Nature,more... <br />
//                         Total Runtime : 00:00:00:00 <br />
//                         Plays: <br />
//                     </p>
//                 </div>
//             </div>
//         </>
//     )
// }
// function VideoLoader() {
//     return (
//         <div className='row px-3 mt-3'>
//             <div className='col-5 mb-4'>
//                 <Skeleton animation="wave" variant="rectangular" width={'100%'} height={100} />
//             </div>
//             <div className='col-7 mb-4'>
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//             </div>
//             <div className='col-5 mb-4'>
//                 <Skeleton animation="wave" variant="rectangular" width={'100%'} height={100} />
//             </div>
//             <div className='col-7 mb-4'>
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//             </div>
//             <div className='col-5 mb-4'>
//                 <Skeleton animation="wave" variant="rectangular" width={'100%'} height={100} />
//             </div>
//             <div className='col-7 mb-4'>
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//             </div>
//             <div className='col-5 mb-4'>
//                 <Skeleton animation="wave" variant="rectangular" width={'100%'} height={100} />
//             </div>
//             <div className='col-7 mb-4'>
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//             </div>
//             <div className='col-5 mb-4'>
//                 <Skeleton animation="wave" variant="rectangular" width={'100%'} height={100} />
//             </div>
//             <div className='col-7 mb-4'>
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//                 <Skeleton animation="wave" />
//             </div>
//         </div>
//     )
// }
