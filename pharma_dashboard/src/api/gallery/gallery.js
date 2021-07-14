import fetcher from "src/lib/fetcher";

const URL = '/product';

const AttachPic = async (data) => {
  let d = { ...data }
  let rs = await fetcher({ method: "post", url: `${URL}/attachPic`, data: d })
  return rs
};

const DetachPic = async (data) => {
  let d = { ...data }
  let rs = await fetcher({ method: "post", url: `${URL}/detachPic`, data: d })
  return rs
};

export { AttachPic, DetachPic };