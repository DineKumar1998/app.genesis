import fetcher from "src/lib/fetcher";

const URL = '/product';
 

const AttachPic = async (data) => {
    let d = {...data}
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/attachPic`, data: d})
    if (rs) {
      return data
    }
  } catch (e) {
    return true
  }

};

const DetachPic = async (data) => {
  let d = {...data}
try {
  let rs = await fetcher({ method: "post", url: `${URL}/detachPic`, data: d})
  if (rs) {
    return data
  }
} catch (e) {
  return true
}

};

export  {AttachPic, DetachPic};