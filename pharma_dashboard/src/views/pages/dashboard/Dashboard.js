import React, { lazy, useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CRow,
} from '@coreui/react'
import { GetAbout } from 'src/api/about/about.js'

const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
  const[banner, setBanner] = useState("")
  const[loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await GetAbout()   

      if(response.success === true && response.data != null && response.data.about_img != null) {
        let newImg = response.data.about_img.split(",")
        setBanner(newImg[0])

      }
      else {
        setBanner(process.env.PUBLIC_URL + 'src/images/dashboard/banner.jpg')
      }
      setLoading(false)
    }

    fetchMyAPI()
  }, [])

  return (
    <>
    {
      loading ? <div className="loader"></div> : 
      <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <img alt="banner" style={{width:"100%"}} src={banner}/> 
          </CRow>
        </CCardBody>
      </CCard> 
      </>
    }
    </>
  )
}

export default Dashboard
