import fetcher from "src/lib/fetcher";

const URL = '/orders';


const GetOrders = async () => {
    let rs = await fetcher({ method: "post", url: `${URL}/get` })
    return rs
}

const GetOrdersCount = async () => {
    let rs = await fetcher({ method: "post", url: `${URL}/count` })
    return rs
}

const DeleteOrder = async (id) => {
    let rs = await fetcher({ method: "delete", url: `${URL}/${id}` })
    return rs
};


export { GetOrders, DeleteOrder, GetOrdersCount };