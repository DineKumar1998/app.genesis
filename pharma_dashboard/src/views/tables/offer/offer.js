import React from "react";
import { CButton, CDataTable } from "@coreui/react";
import ModalForm from "src/views/model/offer/offer";
import { IconDelete } from "../../icon";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { Link, useHistory } from "react-router-dom";
import { DeleteOffer } from "src/api/offer/offer";

const Table = (props) => {
  const Data = props.items;
  let history = useHistory();

// *******************Table Headers *****************************

  const fields = [
    { key: "title", label: "Title",  },
    { key: "image", label: "Image",  },
    { key: "distributors", label: "Distributors",  },
    { key: "description", label: "Description",  },
    { key: "valid_upto", label: "Valid Upto",  },
    { key: "created_on", label: "Created On",  },
    { key: "Edit", label: "", _style: { width: "1%" }, sorter: false,filter: false, },
    { key: "Delete", label: "",  _style: { width: "1%" }, sorter: false, filter: false,},
  ];


// *******************Delete City*****************************

  const deleteItem = async (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete){
      let rs = await DeleteOffer(id)
      if (rs){
        props.deleteItemFromState(id);
        return NotificationManager.info("Offer Deleted SuccessFully", "Info", 2000);
      }
      else{
        return NotificationManager.error("Something Went Wrong", "Info", 2000);
      }
    }
  };

  const openDist = (name) => {
    if (name) {
      history.push({
        pathname: `/distributor`,
        name: name,
      });
    }
  };

  return (
    <CDataTable
      items={Data}
      fields={fields}
    //   columnFilter
      tableFilter
      itemsPerPageSelect
      itemsPerPage={20}
      hover
      sorter
      pagination
      scopedSlots={{
        title: (item, index) => {
            return (
              <td className="py-2">
                  <p style={{color:"#494949"}}><b>{item.title}</b></p>
              </td>)
        },
        distributors: (item, index) => {
            return (
              <td className="py-2">
                  <p style={{color:"#0077e8"}}><b>{item.reps.length === 0 ?  <Link style={{color:"#0077e8"}} to={{pathname: "/distributor",}}>All Distributor</Link>:
                   item.reps.map((it) => <>
                    <Link onClick={()=> openDist(it.name)} style={{color:"#0077e8"}}>
                      {it.name} <br/>
                    </Link>
                   </>) }</b></p>
              </td>)
        },
        reps: (item, index) => {
            return (
              <td className="py-2">
                  <p style={{color:"#494949"}}><b>{item.reps.map((it) => it.valid_upto)}</b></p>
              </td>)
        },
        image: (item, index) => {
            return (
              <td className="py-2">
                <img className="grow" src={item.image} alt="offers" style={{maxHeight:"80px", maxWidth:"80px", minHeight:"80px",minWidth:"80px"}}/>
              </td>)
        },
        created_on: (item, index) => {
            return (
              item.created_on ? 
              <td className="py-2">
                {item.created_on}
              </td> :<td className="py-2">{item.created_on}</td>
)
        },
        Edit: (item, index) => {
          return (
            <td className="py-2">
              <ModalForm
                stateId={props.stateId}
                buttonLabel="Edit"
                item={item}
                updateState={props.updateState}
              />
            </td>
          );
        },
        Delete: (item, index) => {
          return (
            <td className="py-2">
              <CButton
                color="danger"
                size="sm"
                onClick={() => deleteItem(item.id)}
              >
                <IconDelete />
              </CButton>
            </td>
          );
        },
      }}
    />
  );
};

export default Table;
