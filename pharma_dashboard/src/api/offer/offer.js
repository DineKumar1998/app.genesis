import fetcher from "src/lib/fetcher";

const URL = '/Offer';
 
const GetOffer = async () => {
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/get`})
    return rs.data.data
  }
  catch(e){
        return true

  }
}

const GetOfferCount = async () => {
  try{
    let rs = await fetcher({ method: "get", url: `${URL}/count`})
    return rs.data.data
  }
  catch(e){
        return true
  }
}

const AddOffer = async (data) => {
  var bodyFormData = new FormData();
  bodyFormData.append('title', data.title);
  bodyFormData.append('description', data.description);
  bodyFormData.append('image', data.image);
  bodyFormData.append('valid_upto', data.valid_upto);
  bodyFormData.append('reps', data.reps);

  try {
    let rs = await fetcher({ method: "post", url: `${URL}/add`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data"}})
    if (rs) {
      return rs.data.data
    }
  } catch (e) {
    return true
  }
}

const UpdateOffer = async (data) => {
  var bodyFormData = new FormData();
  bodyFormData.append('id', data.id);
  bodyFormData.append('title', data.title);
  bodyFormData.append('description', data.description);
  bodyFormData.append('image', data.image);
  bodyFormData.append('valid_upto', data.valid_upto);
  bodyFormData.append('reps', data.reps);
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/update`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data"}})
    if (rs) {
      return data
    }
  } catch (e) {
        return true
  }

}

const DeleteOffer = async (id) => {
  try {
    let rs = await fetcher({ method: "get", url: `${URL}/delete/${id}`})
    if (rs) {
      return id;
    }
  } catch (e) {
    return true
  }
};


export  { GetOffer ,GetOfferCount,  AddOffer , DeleteOffer , UpdateOffer };