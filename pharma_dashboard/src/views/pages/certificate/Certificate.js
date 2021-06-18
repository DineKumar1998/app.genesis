import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "../../model/certificate/certificate";
import Table from "../../tables/certificate/certificate";
import { GetCertificate } from "src/api/certificate/certificate";

class State extends Component {
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

  // ****************** Get Data Function *****************************

  getData = async () => {
    let rs = await GetCertificate();
    if (rs) {
      this.setState({ items: rs });
      this.setState({ loading: false })
      this.setState({updated : false})
    }
  }


  // ****************** ComponentDidMount Function ********************

  async componentDidMount() {
    this.getData()
  }

  // ****************** componentDidUpdate Function ***********************

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
                      <h5><b>Certificate Details</b></h5>
                    </div>
                    {this.state.items === true ? <> </> :
                      <div className="p-2">
                        <ModalForm
                          buttonLabel="Add Certificate"
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
                <Table
                  items={this.state.items}
                  updateState={this.updateState}
                  deleteItemFromState={this.deleteItemFromState}
                />
              </Col>
            </Row>
          </Container>
        }
      </>
    );
  }
}

export default State;
