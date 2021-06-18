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
      updated: false,
      loading : true
    };
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
    const itemIndex = this.state.items.findIndex((data) => data.id === item.id);
    this.setState({ updated: true });
    const newArray = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1),
    ];
    this.setState({ items: newArray });
  };

  // ****************** Delete Function *****************************

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: updatedItems });
  };

  // ****************** Get Data Function ***************************

  getData = async() => {
    let rs = await GetOrders();
    if (rs) {
      this.setState({ items: rs });
      this.setState({loading : false})
    }
  }

  // ****************** ComponentDidMount Function ********************

  async componentDidMount() {
   this.getData()
  }

  // ****************** componentDidUpdate Function ********************

  async componentDidUpdate() {
    if (this.state.updated) {
      this.setState({updated: false});
      this.getData()
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
                  <h5><b>Orders Details</b></h5>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col>
          {this.state.items === true ? <Page404/> :
            <Table
              items={this.state.items}
              updateState={this.updateState}
              deleteItemFromState={this.deleteItemFromState}
            /> }
          </Col>
        </Row>
      </Container> }
      </>
    );
  }
}

export default Orders;
