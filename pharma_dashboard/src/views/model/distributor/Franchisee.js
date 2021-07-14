import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import { GetFranchisee } from 'src/api/distributor/franchisee';
import modal_img from '../../../assets/images/modal_img.jpg'

const ModalExample = (props) => {
  const {
    buttonLabel,
    franchiseeId
  } = props;

  const [modal, setModal] = useState(false);
  const [Data, setData] = React.useState({})
  const myStyle =  {color:"#4285F4", fontWeight : "400"}
  const toggle = () => setModal(!modal);

  React.useEffect(() => {
    async function fetchMyAPI() {
        let rs = await GetFranchisee({
            id : franchiseeId
        })
        if (rs.success === true){
            setData(rs.data)
        }
    }
    if(modal === true) {
        fetchMyAPI()
    }
  }, [modal])

  return (
    <div>
      
    <span style={{cursor : "pointer"}}><b style={{color:"#4277ff"}}  onClick={toggle}>{buttonLabel}</b></span>
      <Modal isOpen={modal} toggle={toggle} >
        <div id="container_modal">
          <div class="product-details">
            <h1>Franchisee Information</h1>
            <span class="hint-star star">
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star-o" aria-hidden="true"></i>
            </span>
            <p class="information">
            <p><span style={myStyle}><b><i class="fas fa-user">&nbsp;</i>Name : &nbsp; </b></span> <b>{Data.name}</b> </p>
              <p><span style={myStyle}><b><i class="fas fa-phone-square-alt">&nbsp;</i>Phone : &nbsp;</b></span><b>{Data.phone}</b></p>
              <p><span style={myStyle}><b><i class="fas fa-envelope">&nbsp;</i>Email : &nbsp;</b></span> <b>{Data.email}</b></p>
              <p><span style={myStyle}><b><i class="fas fa-home">&nbsp;</i>Address : &nbsp;</b></span> <b>{Data.address}</b></p>
            </p>
          </div>
          <div class="product-image">
            <span class="close-thik" onClick={toggle}/>
            <img src={modal_img} alt="modal_img" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalExample;