import fetcher from "src/lib/fetcher";

const URL = '/notification';


const SendNotification = async (d) => {
  let data = {...d};
  try{
    let rs = await fetcher({method: 'post', url : URL , data : data})
    return rs.data
  }
  catch(e){
    return true
  }
}

const newUrl = "/rep/get"

const NotifiGetMr = async () => {
  let data = {"is_owner": false}
  try{
    let rs = await fetcher( {method: 'post', url :newUrl, data : data } )
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const NotifiGetDistributor= async () => {
  let data =  {"is_owner": true}
  try{
    let rs = await fetcher({method: 'post', url : newUrl, data : data})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

export  { SendNotification, NotifiGetMr, NotifiGetDistributor};