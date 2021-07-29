import fetcher from "src/lib/fetcher";
import C from '../../constants';

const URL = `${C.API_URL}/orders`;

const URLComp = `${C.API_URL}/companyOrder`;

const GetCompanyOrders = async () => {
    let rs = await fetcher({ method: "post", url: `${URLComp}/get` })
    return rs
}

const GetOrders = async () => {
    let rs = await fetcher({ method: "post", url: `${URL}/get` })
    return rs
}

const GetOrdersCount = async () => {
    let rs = await fetcher({ method: "post", url: `${URLComp}/count` })
    return rs
}

const DeleteOrder = async (id) => {
    let rs = await fetcher({ method: "delete", url: `${URL}/${id}` })
    return rs
};


export { GetOrders, DeleteOrder, GetOrdersCount, GetCompanyOrders };