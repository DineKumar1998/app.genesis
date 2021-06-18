import fetcher from "src/lib/fetcher";

const URL = "/states";
 

const GetState = async () => {
  try {
    let rs = await fetcher({ method: "get", url: URL, })
    return rs.data.data;
  } catch (e) {
    return true
  }
};

const AddState = async (data) => {
  let d = { ...data };
  try {
    let rs = await fetcher({ method: "post", url: `${URL}/add`, data: d })
    return rs.data.data;
  } catch (e) {
    return true
  }
};

const UpdateState = async (data) => {
  let d = { ...data };
  try {
    let rsData = await fetcher({ method: "post", url: `${URL}/update`, data: d})
    let rs = [];
      rsData.data.data.map((it) => {
        if (it.id === data.id) {
          return (rs = it);
        }
        return null
      });
    return rs;
  } catch (e) {
    return true
  }
};

const DeleteState = async (id) => {
  try {
    let rs = await fetcher({ method: "get", url: `${URL}/delete/${id}`})
    if (rs) {
      return id;
    }
  } catch (e) {
    return true
  }
};

export { GetState, AddState, UpdateState, DeleteState };
