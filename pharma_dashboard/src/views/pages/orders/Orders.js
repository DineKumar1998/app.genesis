import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { GetOrders } from "src/api/orders/orders";
import Table from "../../tables/order/order";
import Page404 from "../page404/Page404";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      divisionType : [], divisionTypeSelect : [],
      updated: false,
      loading : true
    };
  }

  // ****************** Delete Function *****************************

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: updatedItems });
  };

  // ****************** Get Data Function ***************************

  getData = async() => {
    let rs = await GetOrders();
    if (rs.success === true ) {
      this.setState({ items: rs.data });
    }
    this.setState({loading : false})
  }

  // ****************** ComponentDidMount Function ********************

  async componentDidMount() {
   this.getData()
  }

  // ****************** componentDidUpdate Function ********************

  async componentDidUpdate() {
    if (this.state.updated) {
      this.getData()
      this.setState({updated: false});
    }
  }

  // ************************ Render ******************************

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
                  <h5 className="h5_cstm"><b>Orders Details</b></h5>
                </div>
                <div className="p-3 flex-grow-1">
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col>
          {this.state.items.length === 0 ? <Page404/> :
            <Table
            items={this.state.items}
            deleteItemFromState={this.deleteItemFromState}
            /> 
           } 
          </Col>
        </Row>
      </Container> }
      </>
    );
  }
}

export default Orders;
