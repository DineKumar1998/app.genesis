import fetcher from "src/lib/fetcher";
import C from '../../constants';

const URL = `${C.API_URL}/states`

const GetState = async () => {
  let rs = await fetcher({ method: "get", url: URL, })
  return rs
};

const AddState = async (data) => {
  let d = { ...data };
  let rs = await fetcher({ method: "post", url: `${URL}/add`, data: d })
  return rs
};

const UpdateState = async (data) => {
  let d = { ...data };
  let rsData = await fetcher({ method: "post", url: `${URL}/update`, data: d })
  let rs = [];
  rsData.data.map((it) => {
    if (it.id === data.id) {
      return (rs = it);
    }
    return null
  });
  return rs;
};

const DeleteState = async (id) => {
  let rs = await fetcher({ method: "get", url: `${URL}/delete/${id}` })
  return rs
};

export { GetState, AddState, UpdateState, DeleteState };
