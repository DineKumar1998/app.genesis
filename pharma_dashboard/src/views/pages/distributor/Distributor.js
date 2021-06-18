import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "../../model/distributor/distributorModel";
import Table from "../../tables/distributor/distributor";
import { DistributorCount, GetDistributor, SearchDistributor } from "src/api/distributor/distributor";
import { CPagination } from "@coreui/react";
import Page404 from "../page404/Page404";
import ImportFromCsv from "src/views/model/distributor/bulkUpload";

class Distributor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      update: false,
      currentPage: 1,
      totalPage: 0,
      rowPerPage: 20,
      loading: true,
      search: ""
    };
  }

    // ****************** onSearch Function *****************************

    onSearch = (e) => {
      this.setState({search : e.target.value});
      if (this.state.search !== ""){
        this.setState({update : true})
      }
    }
  
    // ****************** onClose Function *****************************
  
    onClose = () => {
      this.setState({search : ""})
      this.setState({update : true})
    }
  


  // ****************** Add Function *****************************

  addItemToState = (item) => {
    if (item) {
      this.setState({ update: true })
    }
  };

  // ****************** Update Function *****************************

  updateState = (item) => {
    if (item) {
      this.setState({ update: true })
    }
  };

  // ****************** Delete Function *****************************

  deleteItemFromState = (id) => {
    if (id) {
      this.setState({ update: true })
    }
  };

  // ****************** ActivePageChange Function *****************************

  activePageChange = (item) => {
    this.setState({ currentPage: item })
    this.setState({ update: true })
  };

  // ****************** Get Data Function *****************************

  GetData = async () => {

    if (this.state.search !== "") {
      let rs = await SearchDistributor({
        "name" : this.state.search,
        is_owner: true
      })
      this.setState({ items: rs });
      this.setState({ loading: false });
      this.setState({ update: false })
    }
    else {
    let skip = 0
    if (this.state.currentPage === 0) {
      skip = 1 * this.state.rowPerPage
    }
    else {
      skip = this.state.currentPage * this.state.rowPerPage
    }

    let skipVal = skip - this.state.rowPerPage
    let rs = await GetDistributor({
      "limit": this.state.rowPerPage,
      "skip": skipVal,
      "is_owner": true
    })

    let rsCount = await DistributorCount()
    if (rs !== true && rsCount) {
      let page = rsCount.count / this.state.rowPerPage
      let num = Number(page) === page && page % 1 !== 0;
      if (num === true) {
        var str = page.toString();
        var numarray = str.split('.');
        var a = parseInt(numarray)
        this.setState({ totalPage: a + 1 });
      }
      else {
        this.setState({ totalPage: page });
      }
      this.setState({ items: rs });
      this.setState({ loading: false });
      this.setState({ update: false })
    }
  }
  }

  // ****************** ComponentDidMount Function *****************************

  async componentDidMount() {
    if (this.props.location.name){
      this.setState({search : this.props.location.name})
      this.setState({update : true})
    }
    this.GetData()

  }

  // ****************** ComponentDidUpdate Function *****************************

  async componentDidUpdate() {
    if (this.state.update === true) {
      this.setState({updated: false});
      this.GetData()
    }
  }

  render() {
    return (
      <>
        {
          this.state.loading ? <div class="loader"></div> :
            <Container className="App">
              <div>
                <div className="d-flex bg-light border">
                  <div className="p-2 flex-grow-1">
                    <h5>
                      <b>Distributor Details</b>
                    </h5>
                  </div>
                  {this.state.items.length === 0 ? <></> :
                    <div className="row">
                      <div class="col-12 col-md-4 ">
                        <ImportFromCsv
                          updateState={this.updateState}
                          buttonLabel="Upload Excel sheet" />
                      </div>
                      <div class="col-12 col-md-3 ">
                      </div>
                      <div class="col-12 col-md-4 ">
                        <ModalForm
                          stateId={this.props.location.id}
                          buttonLabel="Add Distributor"
                          addItemToState={this.addItemToState}
                        />
                      </div>
                    </div>
                  }
                </div>
              </div>
                <div className="p-2">
                  <fieldset class="field-container col-6 col-md-12">
                    <input type="text" value={this.state.search} onChange={(e) => this.onSearch(e)}
                      placeholder="Search..." class="field-search" />
                    <div class="icons-container">
                      <div class="icon-search" style={{top:"0px",left:"0px"}}></div>
                      <div class="icon-close" style={{top:"0px",left:"-5px"}} onClick={this.onClose}>
                        <div class="x-up"></div>
                        <div class="x-down"></div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              <Row>
                <Col>
                  {this.state.items.length === 0 ? <Page404 /> :
                    <>
                      <Table
                        loading={this.state.loading}
                        items={this.state.items}
                        updateState={this.updateState}
                        deleteItemFromState={this.deleteItemFromState}
                      />
                      <div className={'mt-2'} >
                        <CPagination
                          className="pagination"
                          activePage={this.state.currentPage}
                          pages={this.state.totalPage}
                          onActivePageChange={(e) => this.activePageChange(e)}
                        ></CPagination>
                      </div>
                    </>
                  }
                </Col>
              </Row>
            </Container>
        }
      </>
    );
  }
}

export default Distributor;