import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import { GetFranchisee } from 'src/api/distributor/franchisee';

const ModalExample = (props) => {
  const {
    buttonLabel,
    franchiseeId
  } = props;

  const [modal, setModal] = useState(false);
  const [Data, setData] = React.useState({})
  const myStyle =  {color:"#4285F4", textAlign :"center"}
  const toggle = () => setModal(!modal);

  React.useEffect(() => {
    async function fetchMyAPI() {
        let rs = await GetFranchisee({
            id : franchiseeId
        })
        if (rs){
            setData(rs)
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
        <ModalHeader toggle={toggle}>Franchisee Info</ModalHeader>
        <ModalBody>
        <div class="d-flex flex-column align-items-center">
            <div>
            <p><b style={myStyle}>Name :</b> {Data.name}</p>
              <p><b style={myStyle}>Email :</b> {Data.email}</p>
              <p><b style={myStyle}>Phone :</b> {Data.phone}</p>
              <p><b style={myStyle}>Address :</b> {Data.address}</p>
            </div>
        </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalExample;