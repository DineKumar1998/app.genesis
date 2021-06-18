import fetcher from "src/lib/fetcher";

const URL = '/orders';
 

const GetOrders = async () => {
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/get`})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const GetOrdersCount = async () => {
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/count`})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const DeleteOrder = async (id) => {
    try {
      let rs = await fetcher({ method: "delete", url: `${URL}/${id}`})
      if (rs) {
        return id;
      }
    } catch (e) {
      return true
    }
  };


export  { GetOrders , DeleteOrder, GetOrdersCount};