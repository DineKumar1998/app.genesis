import fetcher from "src/lib/fetcher";

const URL = '/states';
 

const GetCity = async (id) => {
  try{
    let rs = await fetcher({ method: "get", url: `${URL}/${id}`})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const AddCity = async (data) => {
  let d = {...data};
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/addCity`, data: d})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const UpdateCity = async (data) => {
  let d = {...data};
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/updateCity`, data: d})
    return rs;
  } catch (e) {
    return true
  }
}

const DeleteCity = async (id, d) => {
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/deleteCity`, data: d})
    if (rs) {
      return id;
    }
  } catch (e) {
    return true
  }
};


export  { GetCity , AddCity , UpdateCity ,  DeleteCity};