import fetcher from "src/lib/fetcher";

const URL = '/about';


const GetAbout = async () => {
  try {
    let rs = await fetcher({ method: "get", url: URL})
    return rs.data.data
  }
  catch (e) {
    return true
  }
}

const AddUpdateAbout = async (data) => {

  var bodyFormData = new FormData();
  if (data.id) {
    bodyFormData.append('id', data.id);
  }
  bodyFormData.append('phone', data.phone);
  bodyFormData.append('whatsapp', data.whatsapp);
  bodyFormData.append('email', data.email);
  bodyFormData.append('website', data.website);
  bodyFormData.append('about', data.about);
  bodyFormData.append('address', data.address);
  bodyFormData.append('address2', data.address2);
  bodyFormData.append('address3', data.address3);
  bodyFormData.append('facebook', data.facebook);
  bodyFormData.append('linkedin', data.linkedin);
  bodyFormData.append('pinterest', data.pinterest);
  bodyFormData.append('twitter', data.twitter);
  bodyFormData.append('download_links', JSON.stringify(data.download_links));
  bodyFormData.append('about_img', data.image);
  bodyFormData.append('whatsapp_greeting', data.whatsapp_greeting);
  bodyFormData.append('corporate_video', data.corporate_video);
  try {
    let rs = await fetcher({ method: "post", url: URL, data: bodyFormData, headers: { "Content-Type": "multipart/form-data" } })
    if (rs) {
      return rs.data.data
    }
  } catch (e) {
    return true
  }
}



export { GetAbout, AddUpdateAbout };