import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { GetType } from "src/api/products/productType/productType";
import ModalForm from "../../../model/products/type";
import Table from "../../../tables/products/type";
import Page404 from "../../page404/Page404";

class Type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      updated: false,
      loading: true
    };
  }

  // ****************** Add Function *****************************

  addItemToState = (item) => {
    this.setState({ updated: true });
  };

  // ****************** Update Function *****************************

  updateState = (item) => {
    this.setState({ updated: true });
  };

  // ****************** Delete Function *****************************

  deleteItemFromState = (id) => {
    this.setState({ updated: true });
  };

  // ****************** GetData Function ********************

  getData = async () => {
    let rs = await GetType();
    if (rs.success === true) {
      this.setState({ items: rs.data });
      this.setState({ loading: false })
    }
  }

  // ****************** ComponentDidMount Function ********************

  async componentDidMount() {
    this.getData()
  }

  // ****************** componentDidUpdate Function ***********************

  async componentDidUpdate() {
    if (this.state.updated) {
      this.getData()
      this.setState({updated: false});
    }
  }

  render() {
    return (
      <>
        {this.state.loading ? <div class="loader"></div> :
          <Container className="App">
            <div>
              <Row>
                <Col>
                  <div className="d-flex bg-light border">
                    <div className="p-2 flex-grow-1">
                      <h5><b>Product Type</b></h5>
                    </div>
                    {this.state.items === true ? <></> :
                      <div className="p-2">
                        <ModalForm
                          buttonLabel="Add Type"
                          addItemToState={this.addItemToState}
                        />
                      </div>
                    }
                  </div>
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                {this.state.items === true ? <Page404 /> :
                  <Table
                    items={this.state.items}
                    updateState={this.updateState}
                    deleteItemFromState={this.deleteItemFromState}
                  />
                }
              </Col>
            </Row>
          </Container>
        }
      </>
    );
  }
}

export default Type;
