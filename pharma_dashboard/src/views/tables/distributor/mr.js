import React from "react";
import { CBadge, CDataTable } from "@coreui/react";

const Table = (props) => {
  const Data = props.items;

  const fields = [
    { key: "name", label: "Name" },
    { key: "active", label: "Status" , sorter: false, filter: false,},
    {key: "franchisee_name",label: "Franchisee"},
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "dob", label: "DOB" },
    { key: "op_area", label: "OP Area" },
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

  return (
    <CDataTable
      items={Data}
      fields={fields}
      // columnFilter
      tableFilter
      itemsPerPageSelect={{label: 'Items per page:',  values: [20, 50, 100, 150]}}
      itemsPerPage={20}
      hover
      sorter
      pagination
      scopedSlots={{
        name: (item, index) => {
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
      } 
    } 
    />
  );
};

export default Table;
