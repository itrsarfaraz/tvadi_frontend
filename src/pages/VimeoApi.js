import React ,{ useState } from "react";

import YTSearch from 'youtube-api-search';
// const Vimeo = require('vimeo').Vimeo;
const axios = require('axios');
function Search() {
    setInterval(()=>
		{
			axios.get("http://ip-api.com/json").then(response => 
			{
				console.log(response)
			}).catch(function(error)
			{
				console.log(error)
			});
		},1000)
        return(

            <>
            Hello React
            </>
        )
};

export default Search;





