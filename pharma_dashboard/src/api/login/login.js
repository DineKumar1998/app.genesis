import fetcher from "src/lib/fetcher";

const URL = '/admin';

const AdminLogin = async (data) => {
  try{
    let rs = await fetcher({method: "post", url:`${URL}/login`, data})
    console.log("RS;",rs)
    if (rs !== undefined){
        return rs.data.data
    }
  }
  catch(e){
    console.log(e)
     return true
  }
}


const AdminResetPassword = async (data) => {
  let d ={...data}
try{
  let rs = await fetcher({method: "post", url: `${URL}/resetPassword`, data: d})
  if (rs !== undefined){
      return rs.data.data
  }
}
catch(e){
   return true
}
}


export  {AdminLogin, AdminResetPassword };