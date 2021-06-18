import React from "react";
import { CButton, CDataTable } from "@coreui/react";
import { IconDelete } from "../../icon";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { Link, useHistory } from "react-router-dom";
import { DeleteOrder } from "src/api/orders/orders";

const Table = (props) => {
  const Data = props.items;
  let history = useHistory();

// *******************Table Headers *****************************

  const fields = [
    { key: "rep_name", label: "Distributor",  },
    { key: "created_on", label: "Created On",  },
    { key: "Products", label: "Products and Quantity",  },
    { key: "Delete", label: "", _style: { width: "1%" }, sorter: false,filter: false,},
  ];


// *******************Delete City*****************************

  const deleteItem = async (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete){
      let rs = await DeleteOrder(id)
      if (rs){
        props.deleteItemFromState(id);
        return NotificationManager.info("Deleted SuccessFully", "Info", 2000);
      }
      else{
        return NotificationManager.error("Something Went Wrong", "Info", 2000);
      }
    }
  };

  const openDist = (name) => {
    if (name) {
      history.push({
        pathname: `/product`,
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
        rep_name : (item) => {
          return (
            <td className="py-2">
              <p style={{fontSize:"16px", letterSpacing:"0.3px"}}>{item.rep_name}</p>
            </td>
          )
        },
        Products	: (item) => {
            return (
              <td className="py-2">
              {item.orderlist.map((it) => 
                <div className="courses-container">
                  <div className="course">
                    <div className="course-preview">
                    </div>
                    <div className="course-info">
                      <h6>{it.product.name}</h6>
                      <p style={{fontSize:"16px"}}>Quantity : {it.product.min_order_qty}</p>
                      <Link onClick={()=> openDist(it.product.name)} style={{color:"#0085ba", letterSpacing:"0.4px"}}>
                        <button className="btn-product">View Product</button>
                      </Link>
                    </div>
                  </div>
                </div>
              )} 
              </td>)
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
