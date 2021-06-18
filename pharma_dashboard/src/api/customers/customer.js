import fetcher from "src/lib/fetcher";


const URL = '/customer';
 


const GetCustomer = async (data) => {
  let d ={...data}
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/get`, data: d })
    return rs.data.data
  }
  catch(e){
    return true
  }
}


const SearchCustomer = async (data) => {
  let d ={...data}
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/search`, data: d })
    return rs.data.data
  }
  catch(e){
    return true
  }
}



const GetMr = async () => {
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/get`, data: {"is_owner" : false} })
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const GetCustomerCount = async () => {
  try{
    let rs = await fetcher({ method: "get", url: `${URL}/count` })
    return rs.data.data
  }
  catch(e){
    return true
  }
}



export  { GetCustomer , GetMr, GetCustomerCount, SearchCustomer};