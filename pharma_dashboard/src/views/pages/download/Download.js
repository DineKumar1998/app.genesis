import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBView,
  MDBIcon,
} from "mdbreact";
import dashboard from '../../../assets/images/dashboard.png'
import mobile from '../../../assets/images/mobile.png'
import mr from '../../../assets/images/mr.png'

const Download = () => {

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <MDBRow>
      <MDBCol md="4">
        <MDBCard narrow>
          <MDBView cascade>
            <MDBCardImage
              hover
              overlay="white-slight"
              className="card-img-top"
              src={dashboard}
              alt="dashboard"
            />
          </MDBView>

          <MDBCardBody cascade className='text-center'>
            <h5 className="pink-text">
              <MDBIcon icon="fas fa-desktop" /> Dashboard Guide
            </h5>

            <MDBCardTitle className="font-weight-bold">
              About  
            </MDBCardTitle>

            <MDBCardText>
            Dashboards are a collection of widgets and Tables that give you an overview of your
            company information.
            </MDBCardText>

            <MDBCol md="12" className="d-flex justify-content-center">
              <MDBBtn color="primary" onClick={() => openInNewTab('https://drive.google.com/file/d/1XC7oPinTi7pI-tc2UCF29h25OHhSYiUs/view')}>Download</MDBBtn>
            </MDBCol>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

      <MDBCol md="4">
        <MDBCard narrow>
          <MDBView cascade>
            <MDBCardImage
              hover
              overlay="white-slight"
              className="card-img-top"
              src={mobile}
              alt="mobile"
            />
          </MDBView>

          <MDBCardBody cascade className='text-center'>
            <h5 className="pink-text">
              <MDBIcon icon="fas fa-mobile-alt" /> App Guide as Distributor
            </h5>

            <MDBCardTitle className="font-weight-bold">
              About
            </MDBCardTitle>

            <MDBCardText>
            An easy and beginner-friendly Guide
            to learn the basics and fundamental concepts of Android App quickly.
            </MDBCardText>

            <MDBCol md="12" className="d-flex justify-content-center">
              <MDBBtn color="primary" onClick={() => openInNewTab('https://drive.google.com/file/d/1AP840qtlZjYJxCo-HROmLq85VPP4Wr6Y/view')}>Download</MDBBtn>
            </MDBCol>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="4">
        <MDBCard narrow>
          <MDBView cascade>
            <MDBCardImage
              hover
              overlay="white-slight"
              className="card-img-top"
              src={mr}
              alt="mr"
            />
          </MDBView>

          <MDBCardBody cascade className='text-center'>
            <h5 className="pink-text">
              <MDBIcon icon="far fa-id-card" /> App Guide as MR
            </h5>

            <MDBCardTitle className="font-weight-bold">
              About
            </MDBCardTitle>

            <MDBCardText>
            A simple, easy, and complete guide for Medical Representative for overview of the information of app.
            
            </MDBCardText>

            <MDBCol md="12" className="d-flex justify-content-center">
              <MDBBtn color="primary" onClick={() => openInNewTab('https://drive.google.com/file/d/1JC9JbnRh9YGO8htSlWj-yL7TqDrdbs4Q/view')}>Download</MDBBtn>
            </MDBCol>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default Download;
