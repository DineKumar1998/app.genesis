import React from "react";
import { CBadge, CButton, CDataTable } from "@coreui/react";
import { IconDelete } from "src/views/icon";
import ModalForm from "src/views/model/distributor/distributorModel";
import { Link } from "react-router-dom";
import { DeleteRepAndFranchisee } from "src/api/distributor/distributor";
import { NotificationManager } from "react-notifications";
import Model from '../../model/distributor/Franchisee'

const Table = (props) => {
  const Data = props.items;
  const val = props.searchFilter
  const loading = props.loading


  const fields = [
    { key: "name", label: "Name" },
    { key: "active", label: "Status" , sorter: false, filter: false,},
    {key: "franchisee_name",label: "Franchisee"},
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "op_area", label: "OP Area" },
    { key: "View_Mr", label: "Mr" , sorter: false, filter: false,},
    { key: "Edit", label: "",_style: { width: "1%" }, sorter: false, filter: false, },
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

  const deleteItem = async (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete){
      try{
        await DeleteRepAndFranchisee(id)
        props.deleteItemFromState(id);
        return NotificationManager.info("Distributor Deleted SuccessFully", "Success", 2000);
      }
      catch(e){
        return NotificationManager.error(JSON.parse(e.request.response).message, "Error", 5000);
        
      }
    }
  };

  return (
    <CDataTable
      items={Data}
      tableFilterValue={val}
      fields={fields}
      // columnFilter
      // tableFilter
      loading={loading}
      hover
      sorter
      // pagination
      scopedSlots={{
        name: (item) => {
              return (
                <td className="py-2">
                  <p>{item.name}</p>
                </td>
              );
            },
        active: (item) => {
          return (
            <td className="py-2">
            <CBadge color={getBadge(item.active)}>{item.active === true ? <span>Active</span> : <span>Inactive</span>}</CBadge>
          </td>
          )
        },
        franchisee_name: (item, index) => {
            return (
                <td className="py-2">
                <Model buttonLabel={item.franchisee_name} franchiseeId={item.franchisee_id}/>
                </td>
            );
            },
        View_Mr: (item, index) => {
          return (
              <td className="py-2" size="sm">
              <Link to={{
                  pathname: "/distributor/mr",
                  franchisee_id: `${item.franchisee_id}`,
                }}><span style={{fontSize:"13px"}} className="badge badge-pill badge-primary">View Mr</span></Link>
              </td >
          );
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
      } } 
    />
  );
};

export default Table;
