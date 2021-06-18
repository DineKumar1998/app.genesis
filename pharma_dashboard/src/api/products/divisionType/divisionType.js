import fetcher from "src/lib/fetcher";


const URL = '/division';
 

const GetDivisionType = async () => {
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/get`})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const AddDivisionType = async (data) => {
  let d = {...data};
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/add`, data: d })
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const UpdateDivisionType = async (data) => {
  let d = {...data};
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/update`, data: d})
    return rs;
  } catch (e) {
    return true
  }
}

const DeleteDivisionType = async (id) => {
  try {
    let rs = await fetcher({ method: "get", url: `${URL}/delete/${id}`})
    if (rs) {
      return id;
    }
  } catch (e) {
    return true
  }
};


export  { GetDivisionType , AddDivisionType , UpdateDivisionType ,  DeleteDivisionType};