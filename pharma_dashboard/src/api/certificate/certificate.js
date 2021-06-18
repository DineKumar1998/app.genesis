// import axios from 'axios'

import fetcher from "src/lib/fetcher";

  

const URL = '/certificate';
 


const GetCertificate = async () => {
  try{
    let rs = await fetcher({ method: "post", url: URL  })
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const AddCertificate = async (data) => {
  var bodyFormData = new FormData();
  bodyFormData.append('title', data.title);
  bodyFormData.append('description', data.description);
  bodyFormData.append('image', data.image);
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/add`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data"}})
    if (rs) {
      return rs.data.data
    }
  } catch (e) {
    return true
  }
}

const UpdateCertificate = async (data) => {
  var bodyFormData = new FormData();
  bodyFormData.append('id', data.id);
  bodyFormData.append('title', data.title);
  bodyFormData.append('description', data.description);
  bodyFormData.append('image', data.image);
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/update`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data"},})
    if (rs) {
      return data
    }
  } catch (e) {
    return true
  }

}

const DeleteCertificate = async (id) => {
  try {
    let rs = await fetcher({ method: "delete", url: `${URL}/${id}`})
    if (rs) {
      return id;
    }
  } catch (e) {
    return true
  }
};


export  { GetCertificate , AddCertificate , DeleteCertificate , UpdateCertificate };