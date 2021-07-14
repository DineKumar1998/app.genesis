import React from "react";
import { CButton, CDataTable } from "@coreui/react";
import ModalForm from "src/views/model/certificate/certificate";
import { IconDelete } from "../../icon";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { DeleteCertificate } from "src/api/certificate/certificate";
import Page404 from '../../pages/page404/Page404'
const Table = (props) => {
  const Data = props.items;

// *******************Table Headers *****************************

  const fields = [
    { key: "title", label: "Title",  },
    { key: "image", label: "Image",  },
    { key: "description", label: "Description",  },
    { key: "created_on", label: "Created On",  },
    {
      key: "Edit",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "Delete",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];


// *******************Delete City*****************************

  const deleteItem = async (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete){
      let rs = await DeleteCertificate(id)
      if (rs.success === true){
        props.deleteItemFromState(id);
        return NotificationManager.info("Certificate Deleted SuccessFully", "Info", 2000);
      }
      else{
        return NotificationManager.error(rs.message, "Info", 2000);
      }
    }
  };

  return (
    <>
    {Data === true ? <Page404 /> : 
    <CDataTable
      items={Data}
      fields={fields}
      tableFilter
      itemsPerPageSelect={{label: 'Items per page:',  values: [20, 50, 100, 150]}}
      itemsPerPage={20}
      sorter
      pagination
      scopedSlots={{
        image: (item, index) => {
            return (
              <td className="py-2">
                <img src={item.image} className="grow" alt="certificate" style={{maxHeight:"80px", maxWidth:"80px", minHeight:"80px",minWidth:"80px"}}/>
              </td>)
        },
        created_on: (item, index) => {
            return (
              item.created_on ? 
              <td className="py-2">
                {item.created_on.slice(0, 10)}
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
}
    </>
  );
};

export default Table;
