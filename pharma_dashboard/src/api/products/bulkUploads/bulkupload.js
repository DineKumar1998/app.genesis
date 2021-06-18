import fetcher from "src/lib/fetcher";

const URL = '/product';
 

const UploadListCsv = async (data) => {
  let bodyFormData = new FormData();

  if(data.productFile.length>0){
    data.productFile.map((it) => bodyFormData.append('productsfile', it))
  }

  try{
    let rs = await fetcher({ method: "post", url: `${URL}/bulkListUpload`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data" }})
    return rs
  }
  catch(e){
    return true
  }
}

const UploadImgVis = async (data) => {
  let bodyFormData = new FormData();
  if(data.productImages.length>0){
    data.productImages.map((it) => bodyFormData.append('images', it)) 
  }
  bodyFormData.append('imagesType', data.imagesType);
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/bulkImagesUpload`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data" }})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const TechDetails = async (data) => {
  let bodyFormData = new FormData();

  if(data.productFile.length>0){
    data.productFile.map((it) => bodyFormData.append('docs', it))
  }
    try{
      let rs = await fetcher({ method: "post", url: `${URL}/bulkDocsUpload`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data"}})
      return rs.data.data
    }
    catch(e){
      return true
    }
  }

export  { UploadListCsv , UploadImgVis , TechDetails};