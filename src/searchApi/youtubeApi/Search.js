import React, { useState,useEffect } from "react";
const axios = require('axios');
function Search() {
    const [allVideoData, SetAllVideoData] = useState([]);
    const [Keyword, setKeyword] = useState("");


    useEffect(() => {
        document.body.style.height = "auto";
        document.getElementsByClassName('main-container')[0].style.height = "100%";
    }, []);
    const videoSearch = () => {
        if (Keyword == "") {
            alert("Please Enter Search Value")
        }
        else {
            axios.get('https://v1.nocodeapi.com/prakashsolanki/vimeo/qULUDodMlttbEuRW/search?q=' + Keyword + '&page=1&perPage=1').then(res => {
                console.log(res.data.data);
                SetAllVideoData(res.data.data);
            });
        }
    }
    return (
        <>
            <div className='search'>
                <div className="form-group">
                    <label>Search</label>
                    <input onChange={(e) => setKeyword(e.target.value)} type="text" className="form-control" />
                    <button onClick={videoSearch} className="btn btn-primary m-2">Search</button>
                </div>
                <div>
                    {
                        allVideoData.map((val, index) => {
                            return (
                                <div style={{ display: 'inline' }}>
                                    <img src={val.pictures.base_link} style={{ width: '20%' }} />
                                    <p style={{position:'absolute',color:'#fff'}}>
                                         
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};

export default Search;





