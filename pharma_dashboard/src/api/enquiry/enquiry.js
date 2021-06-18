import fetcher from "src/lib/fetcher";

const URL = '/enquiry';
 

const GetEnquiry = async (id) => {
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/get`})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const SearchEnquiry = async (data) => {
  let d = {...data}
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/search`, data : d})
    return rs.data.data
  }
  catch(e){
    return true
  }
}



const DeleteEnquiry = async (id) => {
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/${id}`})
    if (rs) {
      return rs;
    }
  } catch (e) {
    return true
  }
};


export  { GetEnquiry , DeleteEnquiry , SearchEnquiry};