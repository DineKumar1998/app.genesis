import React from "react";
import { CBadge, CButton, CDataTable } from "@coreui/react";
import ModalForm from "src/views/model/products/categoryType";
import { IconDelete } from "../../icon";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { DeleteCategoryType } from "src/api/products/category/category";

const Table = (props) => {
  const Data = props.items;

  // *******************Table Headers *****************************

  const fields = [
    { key: "name", label: "Name", },
    { key: "active", label: "active", },
    { key: "Edit", label: "", _style: { width: "1%" }, sorter: false, filter: false,},
    { key: "Delete", label: "", _style: { width: "1%" }, sorter: false, filter: false,},
  ];


  const getBadge = (active) => {
    switch (active) {
      case true:
        return "success";
      case false:
        return "secondary";
      default:

    }
  };

  // *******************Delete City*****************************

  const deleteItem = async (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      let rs = await DeleteCategoryType(id)
      if (rs.success === true) {
        props.deleteItemFromState(id);
        return NotificationManager.info("Deleted SuccessFully", "Success", 2000);
      }
      else {
        return NotificationManager.error(rs.message, "Info", 2000);
      }
    }
  };

  return (
    <CDataTable
      items={Data}
      fields={fields}
      //   columnFilter
      tableFilter
      itemsPerPageSelect={{ label: 'Items per page:', values: [20, 50, 100, 150] }}
      itemsPerPage={20}
      hover
      sorter
      pagination
      scopedSlots={{
        name: (item) => {
          return (
            <td className="py-2">
              <b style={{ color: "#5b5a5a", letterSpacing: "2px" }}>{item.name}</b>
            </td>
          )
        },
        active: (item) => {
          return (
            <td className="py-2">
              <CBadge color={getBadge(item.active)}>{item.active === true ? <span>Active</span> : <span>Inactive</span>}</CBadge>
            </td>
          )
        },
        Edit: (item) => {
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
        Delete: (item) => {
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
