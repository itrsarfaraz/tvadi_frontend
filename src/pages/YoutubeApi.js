import { React, useEffect } from "react";
import { Paper, Grid, styled } from "@mui/material";
import playerMain from "../asset/images/player/FullScreen720.png";
import YTSearch from 'youtube-api-search';

let API_KEY = "AIzaSyC-ftogvcpMO4bYtPDd_hjNpkTpmCjhmiQ" ;


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function YoutubeApi() {
    const youtubesearchapi=require('youtube-search-api');


   const videoSearch = (term) => {
        YTSearch({key:API_KEY , term:term}, (videos) => {
            this.setState({
                videos: videos,
                displayVideo: videos[0] 
            })
        })
    }
  useEffect(() => {
    document.body.style.backgroundRepeat = "repeat-y";
    document.body.style.height = "auto";
    document.getElementsByClassName("main-container")[0].style.height = "100%";
  });

  return (
    <>
      <main>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          {/* main Display */}
          <Grid item xs={6} sm={4} md={12} className="PlayerBox my-2">
            <Item className="playerImage py-0 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-9 mainImage col-sm-12 pr-0">
                  <img className="img-fluid" src={playerMain} alt="" />
                </div>
                <div className="col-md-3 col-sm-12 leftBox">
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <button className="btn btn-secondary nowPlaylist">
                        Now Playing
                      </button>
                    </div>
                    <div className="col-md-6 col-sm-6 ">
                      <button className="btn btn-secondary myPlaylist">
                        My Playlists
                      </button>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-6 col-sm-6 Panelright pr-0">
                      <img
                        src={require(`../asset/images/home/more1.png`)}
                        alt=""
                      />
                    </div>
                    <div className="col-md-6 col-sm-6 bg-black text-white Panelright-right p-0">
                      <p className="mb-0">
                        | Snow | VANS <br />
                        Vansi Yoube - Dec 17,2020 <br />
                        325,977 Views - 5000 likes <br />
                        Keyword: Winter sports, snowboarding
                      </p>
                    </div>
                  </div>

                  <div className="row  marginTop-3 ">
                    <div className="col-md-6 Panelright pr-0">
                      <img
                        src={require(`../asset/images/home/more2.png`)}
                        alt=""
                      />
                    </div>
                    <div className="col-md-6 bg-black text-white Panelright-right p-0">
                      <p className="mb-0">
                        | Snow | VANS <br />
                        Vansi Yoube - Dec 17,2020 <br />
                        325,977 Views - 5000 likes <br />
                        Keyword: Winter sports, snowboarding
                      </p>
                    </div>
                  </div>

                  <div className="row  marginTop-3 ">
                    <div className="col-md-6 Panelright pr-0">
                      <img
                        src={require(`../asset/images/home/more3.png`)}
                        alt=""
                      />
                    </div>
                    <div className="col-md-6 bg-black text-white Panelright-right p-0">
                      <p className="mb-0">
                        | Snow | VANS <br />
                        Vansi Yoube - Dec 17,2020 <br />
                        325,977 Views - 5000 likes <br />
                        Keyword: Winter sports, snowboarding
                      </p>
                    </div>
                  </div>

                  <div className="row  marginTop-3">
                    <div className="col-md-6 Panelright pr-0">
                      <img
                        src={require(`../asset/images/home/more4.png`)}
                        alt=""
                      />
                    </div>
                    <div className="col-md-6 bg-black text-white Panelright-right p-0">
                      <p className="mb-0">
                        | Snow | VANS <br />
                        Vansi Yoube - Dec 17,2020 <br />
                        325,977 Views - 5000 likes <br />
                        Keyword: Winter sports, snowboarding
                      </p>
                    </div>
                  </div>

                  <div className="row marginTop-3  bg-black panel-right-col">
                    <div className="col-md-3 Panelright Panel-rightLogo pr-0">
                      <img
                        className=""
                        src={require(`../asset/images/home/MainPlayer_Logo.png`)}
                        alt=""
                      />
                    </div>
                    <div className="col-md-3  text-white Panelright p-0">
                      <img
                        src={require(`../asset/images/home/Button_play.png`)}
                        alt=""
                      />
                    </div>

                    <div className="col-md-3  text-white Panelright p-0">
                      <img
                        src={require(`../asset/images/home/ButtonLike.png`)}
                        alt=""
                      />
                    </div>
                    <div className="col-md-3  text-white Panelright p-0">
                      <img
                        src={require(`../asset/images/home/Button_moreInfo.png`)}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row2-FirstBox ">
                <div className="col-md-6 col-sm-12 lastWidth">
                  <div className="col-md-12 pr-0  row2-FirstBox1">
                    <div className="">Reserved Space</div>
                  </div>
                  <div className="col-md-12 pr-0  row2-FirstBox2">
                    <div className="pr-0 ">
                      <div className="row LastCol">
                        <div className="col-md-2 LastCol LastChild p-0">
                          <img
                            src={require(`../asset/images/home/more1.png`)}
                            alt=""
                          />
                        </div>
                        <div className="col-md-2 LastCol LastChild p-0">
                          <img
                            src={require(`../asset/images/home/more2.png`)}
                            alt=""
                          />
                        </div>
                        <div className="col-md-2 LastCol LastChild p-0">
                          <img
                            src={require(`../asset/images/home/more3.png`)}
                            alt=""
                          />
                        </div>
                        <div className="col-md-2 LastCol LastChild p-0">
                          <img
                            src={require(`../asset/images/home/more4.png`)}
                            alt=""
                          />
                        </div>
                        <div className="col-md-2 LastCol LastChild p-0">
                          <img
                            src={require(`../asset/images/home/more6.png`)}
                            alt=""
                          />
                        </div>
                        <div className="col-md-1 LastCol LastChild6  p-0">
                          <div className="row bg-black MoreMix text-white">
                            <div className="col-md-5 mtmix-2">MORE</div>
                            <div className="col-md-7">
                              <img
                                src={require(`../asset/images/home/ButtonNext.png`)}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="row MoreMix bg-black text-white">
                            <div className="col-md-5 mtmix-2 ">MIX</div>
                            <div className="col-md-7 Mix">
                              <img
                                src={require(`../asset/images/home/Button_mix.png`)}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 lastWidth2">Reserevrd</div>
              </div>
            </Item>
          </Grid>

          {/* end show on mobile */}
        </Grid>
        {/* second */}
      </main>
    </>
  );
}

export default YoutubeApi;
