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
    { key: "Products", label: "Products and Quantity",  },
    { key: "created_on", label: "Created On",  },
    { key: "Delete", label: "", _style: { width: "1%" }, sorter: false,filter: false,},
  ];


// *******************Delete City*****************************

  const deleteItem = async (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete){
      let rs = await DeleteOrder(id)
      if (rs.success === true){
        props.deleteItemFromState(id);
        return NotificationManager.info("Deleted SuccessFully", "Info", 2000);
      }
      else{
        return NotificationManager.error(rs.message, "Info", 2000);
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
              <p className="p_name">{item.rep_name}</p>
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
                      <p className="p_name"><i className="fad p_icon fa-cart-plus"></i> &nbsp;{it.product.name.toUpperCase()}</p>
                      <p  className="p_quantity"><i className="fad p_icon fa-balance-scale"></i>&nbsp; Quantity : {it.product.min_order_qty}</p>
                      <p className="p_info">{it.product.division_name}</p>
                      <Link onClick={()=> openDist(it.product.name)} style={{color:"#0085ba", letterSpacing:"0.4px"}}>
                        <button className="btn-product"><span style={{fontSize : "14px"}}>View Product</span></button>
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
