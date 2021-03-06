import React from "react";
import { CButton, CDataTable } from "@coreui/react";
import ModalForm from "src/views/model/products/categoryType";
import { IconDelete } from "../../icon";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { DeleteCategoryType } from "src/api/products/category/category";
import ConfirmDelete from '../../../lib/deleteDilog';
import { ModalContext } from "src/lib/context";

const Table = (props) => {
  const Data = props.items;
  const [showModal, updateShowModal] = React.useState(false);
  const [deleteItemId, setDeleteItemId] = React.useState(false);

  const toggleModal = (id) => { updateShowModal(state => !state); setDeleteItemId(id) };

  // *******************Table Headers *****************************

  const fields = [
    { key: "name", label: "Name", },
    // { key: "active", label: "active", },
    { key: "Edit", label: "", _style: { width: "1%" }, sorter: false, filter: false,},
    { key: "Delete", label: "", _style: { width: "1%" }, sorter: false, filter: false,},
  ];



  // *******************Delete City*****************************

  const deleteItem = async (id) => {
      let rs = await DeleteCategoryType(id)
      if (rs.success === true) {
        props.deleteItemFromState(id);
        NotificationManager.info("Deleted SuccessFully", "Success", 2000);
      }
      else {
        NotificationManager.error(rs.message, "Info", 2000);
      }
      toggleModal()
  };

  return (
    <>
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
        // active: (item) => {
        //   return (
        //     <td className="py-2">
        //       <CBadge color={getBadge(item.active)}>{item.active === true ? <span>Active</span> : <span>Inactive</span>}</CBadge>
        //     </td>
        //   )
        // },
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
                onClick={() => toggleModal(item.id)}
              >
                <IconDelete />
              </CButton>
            </td>
          );
        },
      }}
    />
    <ModalContext.Provider value={{ showModal, toggleModal, deleteItem, id: `${deleteItemId}` }}>
      <ConfirmDelete canShow={showModal} updateModalState={toggleModal} />
    </ModalContext.Provider>
    </>
  );
};

export default Table;
