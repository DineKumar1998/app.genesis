import fetcher from "src/lib/fetcher";

const URL = '/notification';

const SendNotification = async (d) => {
  let data = { ...d };
  let rs = await fetcher({ method: 'post', url: URL, data: data })
  return rs
}

const newUrl = "/rep/get"

const NotifiGetMr = async () => {
  let data = { "is_owner": false }
  let rs = await fetcher({ method: 'post', url: newUrl, data: data })
  return rs
}

const NotifiGetDistributor = async () => {
  let data = { "is_owner": true }
  let rs = await fetcher({ method: 'post', url: newUrl, data: data })
  return rs
}

export { SendNotification, NotifiGetMr, NotifiGetDistributor };