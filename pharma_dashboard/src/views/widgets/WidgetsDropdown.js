import React, { useEffect, useState } from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
} from '@coreui/react'
import { GetOfferCount } from 'src/api/offer/offer'
import { DistributorCount } from 'src/api/distributor/distributor'
import { GetProductsCount } from 'src/api/products/allProducts/products'
import { GetOrdersCount } from 'src/api/orders/orders'
import { useHistory } from "react-router-dom";

const WidgetsDropdown = () => {
  // render
  const history = useHistory();
  const [offerCount, setOfferCount] = useState(0)
  const [distributorsCount, setDistributorsCount] = useState(0)
  const [productCount, setProductCount] = useState(0)
  const [orderCount, setOrderCount] = useState(0)




  useEffect(() => {
    async function fetchMyAPI() {
      let OfferCount = await GetOfferCount()
      let distributorCount = await DistributorCount()
      let productsCount = await GetProductsCount()
      let ordersCount = await GetOrdersCount()
      if (OfferCount.success === true && distributorCount.success === true && productsCount.success === true && ordersCount.success === true) {
        setOfferCount(OfferCount.data.count)
        setDistributorsCount(distributorCount.data.count)
        setProductCount(productsCount.data.count)
        setOrderCount(ordersCount.data.count)

      }
      else {
        setOfferCount(0)
        setDistributorsCount(0)
        setProductCount(0)
        setOrderCount(0)
      }

    }

    fetchMyAPI()
  }, [])


  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ cursor: 'pointer' }}
          onClick={() => history.push("/offer")}
          color="gradient-primary"
          header={String(offerCount)}
          text="Offers"
          footerSlot={<span>&nbsp;</span>}
        >
          <img alt="offers" src={process.env.PUBLIC_URL + "/images/icons/offers.png"} />
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ cursor: 'pointer' }}
          onClick={() => history.push("/distributor")}
          color="gradient-info"
          header={String(distributorsCount)}
          text="Distributors"
          footerSlot={<span>&nbsp;</span>}
        >
          <img style={{ maxWidth: "48px", height: "48px" }} alt="Distributors" src={process.env.PUBLIC_URL + "/images/icons/distributor.png"} />
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ cursor: 'pointer' }}
          onClick={() => history.push("/product")}
          color="gradient-warning"
          header={String(productCount)}
          text="Products"
          footerSlot={<span>&nbsp;</span>}
        >
          <img style={{ maxWidth: "48px", height: "48px" }} alt="products" src={process.env.PUBLIC_URL + "/images/icons/products.png"} />
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ cursor: 'pointer' }}
          onClick={() => history.push("/orders")}
          color="gradient-danger"
          header={String(orderCount)}
          text="Orders"
          footerSlot={<span>&nbsp;</span>}
        >
          <img style={{ maxWidth: "48px", height: "48px" }} alt="orders" src={process.env.PUBLIC_URL + "/images/icons/orders.png"} />
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
}

export default WidgetsDropdown
