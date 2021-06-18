import fetcher from "src/lib/fetcher";

const URL = '/promo';
 

const GetPromo = async () => {
  try{
    let rs = await fetcher({ method: "post", url: URL, })
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const AddPromo = async (data) => {
  var bodyFormData = new FormData();
  bodyFormData.append('title', data.title);
  bodyFormData.append('description', data.description);
  bodyFormData.append('image', data.image);
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/add`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data" }})
    if (rs) {
      return rs.data.data
    }
  } catch (e) {
    return true
  }
}

const UpdatePromo = async (data) => {
  var bodyFormData = new FormData();
  bodyFormData.append('id', data.id);
  bodyFormData.append('title', data.title);
  bodyFormData.append('description', data.description);
  bodyFormData.append('image', data.image);
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/update`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data"}})
    if (rs) {
      return data
    }
  } catch (e) {
    return true
  }
}

const DeletePromo = async (id) => {
  try {
    let rs = await fetcher({ method: "delete", url: `${URL}/delete/${id}`})
    if (rs) {
      return id;
    }
  } catch (e) {
    return true
  }
};


export  { GetPromo , AddPromo , DeletePromo , UpdatePromo };