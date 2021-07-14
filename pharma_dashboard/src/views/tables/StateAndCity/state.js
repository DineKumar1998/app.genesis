import React from "react";
import { CButton, CDataTable } from "@coreui/react";
import ModalForm from "src/views/model/StateAndCity/state";
import { IconDelete } from "../../icon";
import { useHistory } from "react-router-dom";
import { DeleteState } from "src/api/stateAndCity/state";
import NotificationManager from "react-notifications/lib/NotificationManager";

const Table = (props) => {
  const Data = props.items
  let history = useHistory();

  const fields = [
    { key: "name", label: "State", filter: false },
    {key: "City",label: "City" ,sorter: false,filter: false,},
    {key: "Edit",label: "Edit",_style: { width: "1%" },sorter: false,filter: false,},
    {key: "Delete",label: "Delete",_style: { width: "1%" },sorter: false,filter: false,},
  ];

  const deleteItem = async(id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete){
      let rs = await DeleteState(id)
      if (rs.success === true ){
        props.deleteItemFromState(id);
        return NotificationManager.info("State Deleted SuccessFully", "Info", 2000);
      }
      else{
        return NotificationManager.error(rs.message, "Info", 2000);
      }
    }
  };

  const ViewCity = (id) => {
    if (id) {
      history.push({
        pathname: `/state/city/${id}`,
        id: id,
      });
    }
  };


  return (
    <CDataTable
      items={Data}
      fields={fields}
      columnFilter
      tableFilter
      itemsPerPageSelect={{label: 'Items per page:',  values: [20, 50, 100, 150]}}
      itemsPerPage={20}
      hover
      pagination
      scopedSlots={{
        // users.sort((a, b) => a.firstname.localeCompare(b.firstname))
        name: (item) => {
          return (
              <td className="py-2">
                <p>{item.name}</p>
            </td>
          );  
        },
        City: (item) => {
          return (
              <td className="py-2">
                <CButton
                  color="success"
                  size="sm"
                  onClick={() => ViewCity(item.id)}
              >
                View Cities
              </CButton>
            </td>
          );
        },
        Edit: (item,) => {
          return (
            <td className="py-2">
               <ModalForm
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
