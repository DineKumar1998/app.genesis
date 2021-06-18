import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { GetProducts, GetProductsCount, SearchProducts } from "src/api/products/allProducts/products";
import ModalForm from "../../model/products/product"
import Table from "../../tables/products/product"
import UploadTechDetails from '../../model/products/UploadTecDetails'
import ImportFromCsv from "src/views/model/products/UploadList";
import UploadImgVis from "src/views/model/products/UploadImgVisulate";
import { CPagination } from "@coreui/react";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      updated: false,
      currentPage: 1,
      totalPage: 0,
      rowPerPage: 20,
      loading: true,
      search:""
    };
  }


  // ****************** onSearch Function *****************************

  onSearch = (e) => {
    this.setState({search : e.target.value});
    if (this.state.search !== ""){
      this.setState({updated : true})
    }
  }

  // ****************** onClose Function *****************************

  onClose = () => {
    this.setState({search : ""})
    this.setState({updated : true})
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
  };

  // ****************** Get Data Function *****************************

  GetData = async () => {
    if (this.state.search !== "") {
      let rs = await SearchProducts({
        "name" : this.state.search
      })
      this.setState({ items: rs });
      this.setState({ loading: false });
      this.setState({ updated: false })
      
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

      let rs = await GetProducts({
        "limit": this.state.rowPerPage,
        "skip": skipVal
      })

      let rsCount = await GetProductsCount()

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
        this.setState({ updated: false })
      }
    }
  }

  // ****************** ComponentDidMount Function *****************************

  async componentDidMount() {
    if (this.props.location.name){
      this.setState({search : this.props.location.name})
      this.setState({updated : true})
    }
    this.GetData()
  }

  // ****************** ComponentDidUpdate Function *****************************

  async componentDidUpdate() {
    if (this.state.updated === true) {
      this.setState({updated: false});
      this.GetData()
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
                        <div class="col-12 col-md-3">
                          <UploadImgVis 
                          updateState={this.updateState}
                          buttonLabel="Upload Images/Visulate" />
                        </div>
                        <div class="col-12 col-md-3 ">
                          <UploadTechDetails 
                          updateState={this.updateState}
                          buttonLabel="Upload Technical Details" />
                        </div>
                        <div class="col-12 col-md-3 ">
                          <ImportFromCsv buttonLabel="Import From Csv"
                          updateState={this.updateState} />
                        </div>
                        <div class="col-12 col-md-3 ">
                          <ModalForm updateState={this.updateState} buttonLabel="Add Product"
                            addItemToState={this.addItemToState} />
                        </div>
                      </div>
                    }
                  </div>
                </Col>
              </Row>
            </div>
            <div className="p-2">
              <fieldset class="field-container col-6 col-md-12">
                <input type="text" value={this.state.search} onChange={(e) =>  this.onSearch(e)} 
                  placeholder="Search..." class="field-search" />
                <div class="icons-container">
                  <div class="icon-search"></div>
                  <div class="icon-close" onClick={this.onClose}>
                    <div class="x-up"></div>
                    <div class="x-down"></div>
                  </div>
                </div>
              </fieldset>
            </div>
            <Row>
              <Col>
                <Table
                  loading={this.state.loading}
                  items={this.state.items}
                  updateState={this.updateState}
                  deleteItemFromState={this.deleteItemFromState}
                />
                {this.state.items === true && this.state.search === "" ? <></> :
                  <div className={'mt-2'} >
                    <CPagination
                      className="pagination"
                      activePage={this.state.currentPage}
                      pages={this.state.totalPage}
                      onActivePageChange={(e) => this.activePageChange(e)}
                    ></CPagination>
                  </div>
                }
              </Col>
            </Row>
          </Container>
        }
      </>
    );
  }
}

export default Products;
