import React from "react";
import {
  CBadge,
  CCardBody,
  CCollapse,
  CButton,
  CDataTable,
} from "@coreui/react";

import { Col, Container, Row } from "reactstrap";
import { DeleteEnquiry, GetEnquiry } from '../../../api/enquiry/enquiry'
import { NotificationManager } from "react-notifications";
import { IconDelete } from "../../icon/index";
import Page404 from "src/views/pages/page404/Page404";

const Table = () => {
  const [details, setDetails] = React.useState([]);
  const [Data, setData] = React.useState(null)
  const [update, setUpdate] = React.useState(false)
  const [loading, setloading] = React.useState(true)
  const [searchInput, setSearchInput] = React.useState("")


  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "name" },
    { key: "phone" },
    { key: "email" },
    { key: "message" },
    { key: "valid_upto", label: 'Created On' },
    {
      key: "Delete",
      label: "",
      sorter: false,
      filter: false,
    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  const closeSearch = () => {
    setSearchInput("")
  }


  const deleteItem = async (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      let rs = await DeleteEnquiry(id)
      if (rs) {
        setUpdate(true)
        return NotificationManager.info("State Deleted SuccessFully", "Info", 2000);
      }
      else {
        return NotificationManager.error("Something Went Wrong", "Info", 2000);
      }
    }
  };


  React.useEffect(() => {
    async function fetchMyAPI() {
      let rs = await GetEnquiry()
      if (rs) {
        setData(rs)
        setloading(false)
      }
    }
    fetchMyAPI()
    if (update) {
      fetchMyAPI()
      setUpdate(false)
    }
  }, [update])

  // React.useEffect(() => {

  //   if (searchInput !== "") {
  //     console.log("ok")
  //   }

  // }, [searchInput])

  return (
    <>
      {loading ? <div className="loader"></div> :
        <Container className="App">
          <div>
            <Row>
              <Col>
                <div className="d-flex bg-light border">
                  <div className="p-2 flex-grow-1">
                    <h5><b>Enquiries</b></h5>
                  </div>
                  {/* <div className="p-2">
                    <fieldset class="field-container col-6 col-md-12">
                      <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search..." class="field-search" />
                      <div class="icons-container">
                        <div class="icon-search"></div>
                        <div class="icon-close" onClick={closeSearch}>
                          <div class="x-up"></div>
                          <div class="x-down"></div>
                        </div>
                      </div>
                    </fieldset>
                  </div> */}
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col>
              {Data === true ? <Page404 /> :
                <CDataTable
                  items={Data}
                  fields={fields}
                  columnFilter
                  tableFilter
                  // itemsPerPageSelect={{ label: 'Items per page:', values: [20, 50, 100, 150] }}
                  itemsPerPage={20}
                  hover
                  sorter
                  pagination
                  scopedSlots={{
                    status: (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                      </td>
                    ),
                    show_details: (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              toggleDetails(index);
                            }}
                          >
                            {details.includes(index) ? "Hide" : "Show"}
                          </CButton>
                        </td>
                      );
                    },
                    details: (item, index) => {
                      return (
                        <CCollapse show={details.includes(index)}>
                          <CCardBody>
                            <h4>{item.username}</h4>
                            <p className="text-muted">User since: {item.registered}</p>
                            <CButton size="sm" color="info">
                              User Settings
                </CButton>
                            <CButton size="sm" color="danger" className="ml-1">
                              Delete
                </CButton>
                          </CCardBody>
                        </CCollapse>
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
            </Col>
          </Row>
        </Container>
      }
    </>

  );
};

export default Table;
