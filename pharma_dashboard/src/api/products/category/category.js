import fetcher from "src/lib/fetcher";

const URL = '/product/category';

const GetCategoryType = async (id) => {
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/get`})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const AddCategoryType = async (data) => {
  let d = {...data};
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/add`, data: d})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const UpdateCategoryType = async (data) => {
  let d = {...data};
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/update`, data: d })
    return rs;
  } catch (e) {
    return true
  }
}

const DeleteCategoryType = async (id) => {
  try {
    let rs = await fetcher({ method: "get", url: `${URL}/delete/${id}` })
    if (rs) {
      return id;
    }
  } catch (e) {
    return true
  }
};


export  { GetCategoryType , AddCategoryType , UpdateCategoryType ,  DeleteCategoryType};