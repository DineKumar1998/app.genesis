import React from "react";
import { Col, Row } from 'reactstrap'
import { CDataTable, CPagination } from "@coreui/react";
import { GetCustomer, GetCustomerCount, SearchCustomer } from "src/api/customers/customer";
import Model from '../../model/distributor/Franchisee'
import Page404 from "src/views/pages/page404/Page404";


const Table = () => {
  const [rowPerPageSelected, setrowPerPage] = React.useState("10")
  const rowPerPage = parseInt(rowPerPageSelected)
  const [Data, setData] = React.useState(null)
  const [currentPage, setActivePage] = React.useState(1)
  const [totalPage, setTotalPage] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  // ****************** onClose Function *****************************

  const onClose = () => {
    setSearch("")
  }

  // ****************** onSearch Function *****************************

  const onSearch = (e) => {
    setSearch(e.target.value);
  }

  const fields = [
    { key: "name", label: "Name" },
    { key: "rep_name", label: "MR" },
    { key: "franchisee_name", label: "Franchisee" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "state", label: "State" },
    { key: "city", label: "City" },
    { key: "profession", label: "Profession" },
    { key: "working_place", label: "Work Place" },
  ];

  const fetchMyAPI = async () => {
    if (search !== "") {
      let rs = await SearchCustomer({
        "name": search,
      })
      if (rs !== true) {
        for (let i = 0; i < rs.length; i++) {
          rs[i].rep_name = rs[i].rep_id.name;
          rs[i].franchisee_name = rs[i].franchisee_id.name;
        }
        setData(rs)
      }
      setLoading(false)
    }
    else {
      let skip = 0
      if (currentPage === 0) {
        skip = 1 * rowPerPage
      }
      else {
        skip = currentPage * rowPerPage
      }
      let skipVal = skip - rowPerPage

      let rs = await GetCustomer({
        "limit": rowPerPage,
        "skip": skipVal,
      })

      let rsCount = await GetCustomerCount()
      if (rs && rsCount) {
        let page = rsCount.count / rowPerPage
        let num = Number(page) === page && page % 1 !== 0;
        if (num === true) {
          var str = page.toString();
          var numarray = str.split('.');
          var a = parseInt(numarray)
          setTotalPage(a + 1);

        }
        else {
          setTotalPage(page)
        }

        if (rs !== true && rs.length > 0) {
          for (let i = 0; i < rs.length; i++) {
            rs[i].rep_name = rs[i].rep_id.name;
            rs[i].franchisee_name = rs[i].franchisee_id.name;
          }
          setData(rs)
        }
        setLoading(false)
      }
    }
  }


  React.useEffect(() => {
      fetchMyAPI();      
  }, [search])

  React.useEffect(() => {
    if (currentPage) {
      fetchMyAPI();
    }
  }, [currentPage])



  React.useEffect(() => {
    if (rowPerPage) {
      setLoading(true)
      fetchMyAPI();
    }
  }, [rowPerPage])


  return (
    <>
      {loading ? <div className="loader"></div> :
        <>
          <div>
            <Row>
              <Col>
                <div className="d-flex bg-light border">
                  <div className="p-2 flex-grow-1">
                    <h5><b>Customer Details</b></h5>
                  </div>
                  <div className="p-2">
                    <div className="form-inline justify-content-sm-end c-datatable-items-per-page">
                      <label className="mfe-2">Items per page:</label>
                      <select className="form-control" aria-label="changes number of visible items" value={rowPerPageSelected}
                        onChange={(e) => setrowPerPage(e.target.value)}>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={150}>150</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="p-2">
              <fieldset class="field-container col-6 col-md-12">
                <input type="text" value={search} onChange={(e) => onSearch(e)}
                  placeholder="Search..." class="field-search" />
                <div class="icons-container">
                  <div class="icon-search"></div>
                  <div class="icon-close" onClick={onClose}>
                    <div class="x-up"></div>
                    <div class="x-down"></div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          {Data === true ? <Page404 /> :
            <>
              <CDataTable
                items={Data}
                fields={fields}
                loading={loading}
                hover
                sorter
                scopedSlots={{
                  rep_name: (item, index) => {
                    return (
                      <td className="py-2">
                        <p>{item.rep_name}</p>
                      </td>
                    );
                  },
                  franchisee_name: (item, index) => {
                    return (
                      <td className="py-2">
                        <Model buttonLabel={item.franchisee_name} franchiseeId={item.franchisee_id.id} />
                      </td>
                    );
                  },
                  working_place: (item, index) => {
                    return (
                      <td className="py-2">
                        {item.working_place === null ? <>NA</> : <>{item.working_place}</>}
                      </td>
                    );
                  },
                }}
              />
              <div className={'mt-2'} >
                <CPagination
                  class="pagination"
                  activePage={currentPage}
                  pages={totalPage}
                  onActivePageChange={(i) => { setActivePage(i); }}
                ></CPagination>
              </div>
            </>}

        </>
      }
    </>
  );
};

export default Table;
