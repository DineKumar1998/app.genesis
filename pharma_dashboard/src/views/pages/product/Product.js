import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { GetProducts, GetProductsCount, SearchProducts } from "src/api/products/allProducts/products";
import ModalForm from "../../model/products/product"
import Table from "../../tables/products/product"
import UploadTechDetails from '../../model/products/UploadTecDetails'
import ImportFromCsv from "src/views/model/products/UploadList";
import UploadImgVis from "src/views/model/products/UploadImgVisulate";
import { CPagination } from "@coreui/react";
import Page404 from "../page404/Page404";
import Select from 'react-select'
import { GetDivisionType } from "src/api/products/divisionType/divisionType";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      updated: false,
      currentPage: 1,
      totalPage: 0,
      divisionType: [], divisionTypeSelect: null,
      rowPerPage: 20,
      loading: true,
      search: ""
    };
  }

  handleChange = (newValue, actionMeta) => {
    this.setState({ divisionTypeSelect: newValue })
    this.setState({ updated: true })
  };


  // ****************** onSearch Function *****************************

  onSearch = (e) => {
    this.setState({ search: e.target.value });
    if (this.state.search !== "") {
      this.setState({ updated: true })
    }
  }

  // ****************** onClose Function *****************************

  onClose = () => {
    this.setState({ search: "" })
    this.setState({ updated: true })
  }

  // ****************** Add Function *****************************

  addItemToState = (item) => {
    this.setState({ updated: true });
    this.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
  };


  // ****************** Update Function *****************************

  updateState = (item) => {
    if (item) {
      this.setState({ updated: true })
    }
  };

  // ****************** Delete Function *****************************

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: updatedItems });
  };

  // ****************** ActivePageChange Function *****************************

  activePageChange = (item) => {
    this.setState({ currentPage: item })
    this.setState({ updated: true })
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  // ****************** Get Data Function *****************************

  GetData = async () => {
    let rsDiv = await GetDivisionType()

    if(rsDiv.success === true){
      let divRes = []
      if (rsDiv.data.length > 0) {
        rsDiv.data.map((it) => {
          return divRes.push({ value: it.id, label: it.name })
        })
      }
      this.setState({ divisionType: divRes })
    }



     if (this.state.search !== "") {
      let rs = await SearchProducts({
        "name": this.state.search
      })
      if (rs.success === true) {
        this.setState({ items: rs.data });
      }
    }

    else {
      this.setState({ loading: true })

      let skip = 0
      if (this.state.currentPage === 0) {
        skip = 1 * this.state.rowPerPage
      }

      else {
        skip = this.state.currentPage * this.state.rowPerPage
      }


      let skipVal = skip - this.state.rowPerPage

    
    let rs = null ;

    if (this.state.divisionTypeSelect !== null) {
      rs = await GetProducts({
        "division_id" : this.state.divisionTypeSelect.value,
        "limit": this.state.rowPerPage,
        "skip": skipVal
      })
    }
    else {
      rs = await GetProducts({
        "limit": this.state.rowPerPage,
        "skip": skipVal
      })
    }

     

      let rsCount = await GetProductsCount()
      if (rs.success === true && rsCount.success === true) {
        let page = rsCount.data.count / this.state.rowPerPage
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
        this.setState({ items: rs.data });
      }
    }
    this.setState({ loading: false });

  }

  // ****************** ComponentDidMount Function *****************************

  componentDidMount() {
    if (this.props.location.name) {
      this.setState({ search: this.props.location.name })
      this.setState({ updated: true })
    }
    else {
      this.GetData()
    }
  }

  // ****************** ComponentDidUpdate Function *****************************

  componentDidUpdate() {
    if (this.state.updated === true) {
      this.GetData()
      this.setState({ updated: false })

    }
  }

  render() {
    return (
      <>
        {this.state.loading ? <div className="loader"></div> :
          <Container className="App">
            <div>
              <Row>
                <Col>
                  <div className="d-flex bg-light border">
                    <div className="p-2 flex-grow-1">
                      <h5><b>Product Details</b></h5>
                    </div>
                    {this.state.items === true ? <></> :
                      <div className="row">
                        <div className="col-12 col-md-3">
                          <UploadImgVis
                            updateState={this.updateState}
                            buttonLabel="Upload Images/Visulate" />
                        </div>
                        <div className="col-12 col-md-3 ">
                          <UploadTechDetails
                            updateState={this.updateState}
                            buttonLabel="Upload Technical Details" />
                        </div>
                        <div className="col-12 col-md-3 ">
                          <ImportFromCsv buttonLabel="Import From Csv"
                            updateState={this.updateState} />
                        </div>
                        <div className="col-12 col-md-3 ">
                          <ModalForm updateState={this.updateState} buttonLabel="Add Product"
                            addItemToState={this.addItemToState} />
                        </div>
                      </div>
                    }
                  </div>
                </Col>
              </Row>
            </div>

            <Row style={{ marginTop: "20px" }}>


              <Col xs="12" sm="6">
                <fieldset className="field-container" style={{ marginBottom: "8px" }}>
                  <input type="text" value={this.state.search} onChange={(e) => this.onSearch(e)}
                    placeholder="Search..." className="field-search" />
                  <div className="icons-container">
                    <div className="icon-search"></div>
                    <div className="icon-close" onClick={this.onClose}>
                      <div className="x-up"></div>
                      <div className="x-down"></div>
                    </div>
                  </div>
                </fieldset>
              </Col>
              <Col xs="12" sm="6">
                <div style={{ float: "right", width: "50%" }}>
                  <Select
                    value={this.state.divisionTypeSelect}
                    onChange={this.handleChange}
                    isClearable
                    // isSearchable
                    placeholder="Choose Divison"
                    options={this.state.divisionType} />

                </div>
              </Col>

            </Row>

            {
              this.state.items.length === 0 ?
                <Page404 />
                :
                <Row>
                  <Col>
                    <Table
                      loading={this.state.loading}
                      items={this.state.items}
                      updateState={this.updateState}
                      deleteItemFromState={this.deleteItemFromState}
                    />
                    {!this.state.search ?
                      <div className={'mt-2'} >
                        <CPagination
                          // aria-label="Page navigation example"
                          className="pagination justify-content-start"
                          activePage={this.state.currentPage}
                          pages={this.state.totalPage}
                          onActivePageChange={(e) => this.activePageChange(e)}
                        >

                        </CPagination>
                      </div>
                      :
                      <></>
                    }
                  </Col>
                </Row>
            }

          </Container>
        }
      </>
    );
  }
}

export default Products;
