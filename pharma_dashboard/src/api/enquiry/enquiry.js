import fetcher from "src/lib/fetcher";

const URL = '/enquiry';


const GetEnquiry = async (id) => {
    let rs = await fetcher({ method: "post", url: `${URL}/get` })
    return rs
}

const SearchEnquiry = async (data) => {
    let d = { ...data }
    let rs = await fetcher({ method: "post", url: `${URL}/search`, data: d })
    return rs
}

const DeleteEnquiry = async (id) => {
    let rs = await fetcher({ method: "delete", url: `${URL}/${id}` })
    console.log("DeleteEnquiry", DeleteEnquiry)
    return rs
}

export { GetEnquiry, DeleteEnquiry, SearchEnquiry };