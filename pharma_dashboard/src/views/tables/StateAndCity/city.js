import React from "react";
import { CButton, CDataTable } from "@coreui/react";
import ModalForm from "src/views/model/StateAndCity/city";
import { IconDelete } from "../../icon";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { DeleteCity } from "src/api/stateAndCity/city";

const Table = (props) => {
  const Data = props.items;

// *******************Table Headers *****************************

  const fields = [
    { key: "name", label: "City", filter: false },
    { key: "Edit", label: "", _style: { width: "1%" }, sorter: false, filter: false, },
    { key: "Delete", label: "", _style: { width: "1%" }, sorter: false, filter: false, },
  ];


// *******************Delete City*****************************

  const deleteItem = async (id, name , cityId) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete){
      let rs = await DeleteCity(id , {
        stateId : props.stateId,
        cityName : name
      })
      if (rs.success === true){
        props.deleteItemFromState(cityId);
        return NotificationManager.info("City Deleted SuccessFully", "Info", 2000);
      }
      else{
        return NotificationManager.error(rs.message, "Info", 2000);
      }
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
      sorter
      pagination
      scopedSlots={{
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
                onClick={() => deleteItem(props.stateId , item.name , item.id)}
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
