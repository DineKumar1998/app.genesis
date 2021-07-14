import fetcher from "src/lib/fetcher";
import C from '../../constants';

const URL = `${C.API_URL}/rep`;

const GetDistributor = async (data) => {
  let d = { ...data }
  let rs = await fetcher({ method: "post", url: `${URL}/get`, data: d })
  return rs
}


const SearchDistributor = async (data) => {
  let d = { ...data }
  let rs = await fetcher({ method: "post", url: `${URL}/search`, data: d })
  return rs
}

const URLDist = `${C.API_URL}/franchisee/` ;

const AddRepAndFranchisee = async (data) => {
  var bodyFormData = new FormData();
  bodyFormData.append('firm_name', data.firm_name);
  bodyFormData.append('gst_number', data.gst_number);
  bodyFormData.append('drug_license', data.drug_license);
  bodyFormData.append('firm_phone', data.firm_phone);
  bodyFormData.append('firm_email', data.firm_email);
  bodyFormData.append('firm_address', data.firm_address);
  bodyFormData.append('firm_state', data.firm_state);
  bodyFormData.append('firm_district', data.firm_district);
  bodyFormData.append('bank_name', data.bank_name);
  bodyFormData.append('bank_ifsc', data.bank_ifsc);
  bodyFormData.append('bank_acc_no', data.bank_acc_no);
  bodyFormData.append('bank_payee_name', data.bank_payee_name);
  bodyFormData.append('divisions', data.divisions);
  bodyFormData.append('id', data.id);
  bodyFormData.append('name', data.name);
  bodyFormData.append('email', data.email);
  bodyFormData.append('phone', data.phone);
  bodyFormData.append('address', data.address);
  bodyFormData.append('dob', data.dob);
  bodyFormData.append('password', data.password);
  bodyFormData.append('op_area', data.op_area);
  bodyFormData.append('aadhar_no', data.aadhar_no);
  bodyFormData.append('profile_pic', data.profile_pic);
  bodyFormData.append('active', data.active);
  let rs = await fetcher({ method: "post", url: `${URLDist}/addRepAndFranchisee`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data" } })
 return rs
}

const UpdateRepAndFranchisee = async (data) => {

  var bodyFormData = new FormData();
  bodyFormData.append('id', data.frId);
  bodyFormData.append('name', data.firm_name);
  bodyFormData.append('gst_number', data.gst_number);
  bodyFormData.append('drug_license', data.drug_license);
  bodyFormData.append('phone', data.firm_phone);
  bodyFormData.append('email', data.firm_email);
  bodyFormData.append('address', data.firm_address);
  bodyFormData.append('state', data.firm_state);
  bodyFormData.append('district', data.firm_district);
  bodyFormData.append('bank_name', data.bank_name);
  bodyFormData.append('bank_ifsc', data.bank_ifsc);
  bodyFormData.append('bank_acc_no', data.bank_acc_no);
  bodyFormData.append('bank_payee_name', data.bank_payee_name);
  bodyFormData.append('divisions', data.divisions);

  var bodyFormDataDst = new FormData();
  bodyFormDataDst.append('id', data.id);
  bodyFormDataDst.append('name', data.name);
  bodyFormDataDst.append('email', data.email);
  bodyFormDataDst.append('phone', data.phone);
  bodyFormDataDst.append('address', data.address);
  bodyFormDataDst.append('dob', data.dob);
  bodyFormDataDst.append('password', data.password);
  bodyFormDataDst.append('op_area', data.op_area);
  bodyFormDataDst.append('aadhar_no', data.aadhar_no);
  bodyFormDataDst.append('image', data.profile_pic);
  bodyFormDataDst.append('active', data.active);

  let rs = await fetcher({ method: "post", url: `${URLDist}/update`, data: bodyFormData, headers: { "Content-Type": "multipart/form-data" } })
  let DsRs = await fetcher({ method: "post", url: `${URL}/update`, data: bodyFormDataDst, headers: { "Content-Type": "multipart/form-data" } })
  
  let response = null ;
  
  if (rs.success === true && DsRs.success === true) {
    let newRS = []
    newRS.push({
      data: rs.data,
      franchisee: DsRs.data
    })
    response = {newRS, success : true, message : rs.message}
  }
  else{
    response = {success : false , message : rs.message}
  }

  return (response)

}

const DeleteRepAndFranchisee = async (id) => {
  let rs = await fetcher({ method: "get", url: `${URL}/delete/${id}` })
  return rs

};

const DistributorCount = async () => {
  let rs = await fetcher({ method: "get", url: `${URL}/countDistributors` })
  return rs
};

const UploadDistributorExcel = async (data) => {
  var bodyFormData = new FormData();
  // bodyFormData.append('reps', data.reps);
  if (data.reps.length > 0) {
    data.reps.forEach(it => bodyFormData.append('reps', it))
  }
  let rs = await fetcher({ method: "post", url: `${URL}/bulkUpload`, data: bodyFormData })
  return rs
}


export { GetDistributor, SearchDistributor, UploadDistributorExcel, AddRepAndFranchisee, DeleteRepAndFranchisee, DistributorCount, UpdateRepAndFranchisee };