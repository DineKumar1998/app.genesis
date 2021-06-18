import axios from 'axios'
require("dotenv").config();

const fetcher = async (data) =>{

    // try{
        const token = localStorage.getItem('token');

    let RequestData = {
        method: data.method,
        url : `/api/web${data.url}`,
        headers: {"x-access-token": token }
    }

    if(data.data != null){
        RequestData.data = data.data;
    }
    if(data.header !=null){
        RequestData.headers = {
            "x-access-token": token,
            ...data.headers
        }
    }

    let rs = await axios(RequestData);

    return rs;
    // }
    // catch(e){
    //     return e;
    // }
}


export default fetcher;
