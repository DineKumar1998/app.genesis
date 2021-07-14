import React from "react";
import { CButton, CDataTable } from "@coreui/react";
import ModalForm from "src/views/model/offer/offer";
import { IconDelete } from "../../icon";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { Link, useHistory } from "react-router-dom";
import { DeleteOffer } from "src/api/offer/offer";
import moment from "moment";

const Table = (props) => {
  const Data = props.items;
  let history = useHistory();

  // *******************Table Headers *****************************

  const fields = [
    { key: "title", label: "Title", },
    { key: "image", label: "Image", },
    { key: "distributors", label: "Distributors", },
    { key: "description", label: "Description", },
    { key: "valid_upto", label: "Valid Upto", },
    { key: "Status", label: "Status", },
    { key: "Edit", label: "", _style: { width: "1%" }, sorter: false, filter: false, },
    { key: "Delete", label: "", _style: { width: "1%" }, sorter: false, filter: false, },
  ];


  // *******************Delete City*****************************

  const deleteItem = async (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      let rs = await DeleteOffer(id)
      if (rs.success === true) {
        props.deleteItemFromState(id);
        return NotificationManager.info("Offer Deleted SuccessFully", "Info", 2000);
      }
      else {
        return NotificationManager.error(rs.message, "Info", 2000);
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
        title: (item) => {
          return (
            <td className="py-2">
              <p style={{ color: "#494949" }}><b>{item.title}</b></p>
            </td>)
        },
        distributors: (item) => {
          return (
            <td className="py-2">
              <p style={{ color: "#0077e8" }}><b>{item.reps.length === 0 ? <Link style={{ color: "#0077e8" }} to={{ pathname: "/distributor", }}>All Distributor</Link> :
                item.reps.map((it) => <>
                  <Link onClick={() => openDist(it.name)} style={{ color: "#0077e8" }}>
                    {it.name} <br />
                  </Link>
                </>)}</b></p>
            </td>)
        },
        Status: (item) => {
          return (
            <td className="py-2">
              <p><b>{moment(item.valid_upto, "YYYY/MM/DD").isBefore(moment()) ?
                <span class="badge badge-danger">Expired</span>
                :
                <span class="badge badge-success">Active</span>
              }
              </b></p>
            </td>)
        },
        image: (item) => {
          return (
            <td className="py-2">
              {
                item.image.length > 1 ?
                  item.image.map((it) => (
                    <>
                    <img className="grow" src={`${it}`} alt="offers" style={{ height: "50px", width: "50px" }} />  &nbsp;
                    </>
                  ))
                  :
                  <img className="grow" src={item.image} alt="offers" style={{ height: "50px", width: "50px" }} />
              }
            </td>)
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
