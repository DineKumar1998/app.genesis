import fetcher from "src/lib/fetcher";


const URL = '/product';
 

const GetProducts = async (data) => {
  console.log("dataxx", data)
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/get`, data: data})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

const GetProductsCount = async () => {
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/count`})
    return rs.data.data
  }
  catch(e){
    return true
  }
}


const AddProducts = async (data) => {
  console.log("DATA" , data)
  let bodyFormData = new FormData();
  bodyFormData.append('name', data.name);
  bodyFormData.append('description', data.description);
  bodyFormData.append('price', data.price);
  bodyFormData.append('min_order_qty', data.min_order_qty);
  bodyFormData.append('technical_detail', data.technical_detail);
  bodyFormData.append('packing', data.packing);
  bodyFormData.append('packing_type', data.packing_type);
  bodyFormData.append('type_id', data.type_id); 
  bodyFormData.append('division_id', data.division_id);
  bodyFormData.append('category_id', data.category_id);
  bodyFormData.append('sku', data.sku);
  bodyFormData.append('hsn_code', data.hsn_code);
  bodyFormData.append('new_launched', data.new_launched);


  if(data.images.length>0){
    data.images.forEach(it=>bodyFormData.append('images', it))
  }
  if(data.visualate.length>0){
    data.visualate.forEach(it=>bodyFormData.append('visualate', it))
  }
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/add`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data"}})
    if (rs) {
      return data
    }
  } catch (e) {
    return true
  }
}

const UpdateProducts = async (data) => {
  let bodyFormData = new FormData();
  bodyFormData.append('id', data.id);
  bodyFormData.append('name', data.name);
  bodyFormData.append('description', data.description);
  bodyFormData.append('price', data.price);
  bodyFormData.append('min_order_qty', data.min_order_qty);
  bodyFormData.append('technical_detail', data.technical_detail);
  bodyFormData.append('packing', data.packing);
  bodyFormData.append('packing_type', data.packing_type);
  bodyFormData.append('type_id', data.type_id); 
  bodyFormData.append('division_id', data.division_id);
  bodyFormData.append('category_id', data.category_id);
  bodyFormData.append('sku', data.sku);
  bodyFormData.append('new_launched', data.new_launched);
  bodyFormData.append('hsn_code', data.hsn_code);
  if(data.images.length>0){
    data.images.map((it) =>  bodyFormData.append('images', it))
  }
  if(data.visualate.length>0){ data.visualate.map((it) => bodyFormData.append('visualate', it))
  }
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/update`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data" }})
    if (rs) {
      return data
    }
  } catch (e) {
    return true
  }
}

const DeleteProducts = async (id) => {
  try {
    let rs = await fetcher({ method: "get", url: `${URL}/delete/${id}`})
    if (rs) {
      return id;
    }
  } catch (e) {
    return true
  }
}; 

const SearchProducts = async (d) => {
  let data = {...d}
  try{
    let rs = await fetcher({ method: "post", url: `${URL}/search`, data: data})
    return rs.data.data
  }
  catch(e){
    return true
  }
}

export  { GetProducts , AddProducts , UpdateProducts , GetProductsCount,  DeleteProducts , SearchProducts};