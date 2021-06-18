import fetcher from "src/lib/fetcher";

const URL = '/admin';

const UserProfile = async () => {
    try {
        let rs = await fetcher({ method: "get", url: `${URL}/profile`})
        if (rs) {
          return rs.data.data
        }
      } 
  catch(e){
     return true
  }
}

const UserInfoUpdate = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('name', data.name);
    bodyFormData.append('email', data.email);
    bodyFormData.append('phone', data.phone);
    bodyFormData.append('company', data.company);
    bodyFormData.append('profile_pic', data.profile_pic);
    try {
        let rs = await fetcher({ method: "post", url: `${URL}/update`, data : bodyFormData})
        if (rs) {
          return rs.data.data
        }
      } 
  catch(e){
     return true
  }
}

const UserChangePassword = async (data) => {
  let d = {...data}
  try {
      let rs = await fetcher({ method: "post", url: `${URL}/changePassword`, data : d})
      if (rs) {
        return rs.data.data
      }
    } 
catch(e){
   return true
}
}



export  {UserProfile, UserInfoUpdate, UserChangePassword };