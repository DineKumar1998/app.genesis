import fetcher from "src/lib/fetcher";

const URL = '/product/type';
 

const GetType = async (id) => {
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/get` })
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const AddType = async (data) => {
  let d = {...data};
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/add`, data: d})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const UpdateType = async (data) => {
  let d = {...data};
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/update`, data: d})
    return rs;
  } catch (e) {
    return true
  }
}

const DeleteType = async (id) => {
  try {
    let rs = await fetcher({ method: "get", url: `${URL}/delete/${id}`})
    if (rs) {
      return id;
    }
  } catch (e) {
    return true
  }
};


export  { GetType , AddType , UpdateType ,  DeleteType};