import React from "react";
import { Col, Row } from "reactstrap";
import { GetProducts } from "src/api/products/allProducts/products";
import Model from '../../model/gallery/gallery'
import Page404 from "../page404/Page404";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      classStyle: "",
      id: "",
      images: [],
      visualate: [],
      updated: false
    };

    // Define inline styles
    this.styles = { backgroundColor: props.data.color || "#000", };
  }
  toggleImage() {
    this.setState({ classStyle: "grow" })
  }

  pageUpdated = id => {
    // this.state.updated

  }

  // ***************************** Component Did Mount *******************************

  componentDidMount() {
    let img = []
    let vis = []
    if (this.props.data) {
      if (this.props.data.imgType === "IMG") {
        this.setState({ id: this.props.data.id })
        img.push({ type: this.props.data.imgType, url: this.props.data.img })
      }
      else if (this.props.data.imgType === "VIS") {
        this.setState({ id: this.props.data.id })
        vis.push({ type: this.props.data.imgType, url: this.props.data.img })
      }
    }
    this.setState({ images: img })
    this.setState({ visualate: vis })
  }



  render() {
    const { img, imgType, name, type, category, division, id } = this.props.data;

    return (
      <div>
        <div id="vueBind" className="container-gallery">
          <div v-for="data in content" className="card">
            {imgType === "IMG" ? <div className="ribbon-wrapper-green"><div className="ribbon-green">Image</div></div> :
              <div className="ribbon-wrapper-blue"><div className="ribbon-blue">Visualate</div></div>}
            <div className="imgBox">
              <img src={img} alt="product" />
            </div>
            <div className="content">
              <div className="contentBox">
                <h3>{name}<br />
                  <span>{type}</span><br />
                  <span>{category}</span><br />
                  <span>{division}</span>
                </h3>
              </div>
              <ul className="social">
              </ul>
            </div>
          </div>
          <div>
          </div>
        </div>
        <Row style={{ marginTop: "-70px", paddingLeft: "40px", paddingRight: "30px" }}>
          <Col xs="6">
            <Model
              buttonLabel="Attach"
              id={this.state.id}
              url={img}
              type={imgType}
              updated={this.props.updated}
            />

          </Col>
          <Col xs="6">
            <Model
              buttonLabel="Detach"
              id={id}
              images={img}
              name={name}
              updated={this.props.updated}
              type={imgType} />
          </Col>
        </Row>
      </div>
    );
  }
}

class CardGridView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      updated: false,
      loading: true
    };
  }


  // ****************** Update Function *****************************

  updateState = (item) => {
    if (item === true) {
      this.setState({ updated: true })
    }
  };


  async componentDidMount() {
    let rs = await GetProducts();

    let newData = [];
    if (rs.success === true) {
      rs.data.map((it) => {
        if (Array.isArray(it.images)) {
          it.images.map((img) => {
            newData.push({
              img: img.url,
              imgType: img.type,
              id: it.id,
              name: it.name,
              type: it.type_name,
              category: it.category_name,
              division: it.division_name,
            });
            return null
          });
        }
        return null
      });
      this.setState({ data: newData });
      this.setState({loading : false})
    }
    else {
      this.setState({ data: true });
      this.setState({loading : false})
    }
  }
  // ***************************** Component Did Update *******************************

  async componentDidUpdate() {
    let rs = await GetProducts();
    if (this.state.updated === true) {
      let updatedData = [];
      if (rs.success === true) {
        rs.data.map((it) => {
          if (Array.isArray(it.images)) {
            it.images.map((img) => {
              updatedData.push({
                img: img.url,
                imgType: img.type,
                id: it.id,
                name: it.name,
                type: it.type_name,
                category: it.category_name,
                division: it.division_name,
                color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
              });
              return null
            });
          }
          return null
        });
        this.setState({ data: updatedData });
        this.setState({ updated: false })
      }
    }
  }

  render() {
    return (
      <>
        {this.state.loading ? <div className="loader"></div> :
          <>
          {this.state.data === true ? <Page404 /> : 
          <div className="card-grid-view row" >
            {this.state.data.map((cardData, index) => (
              <Card updated={this.updateState} data={cardData} key={"card-id-" + index} />
            ))}
          </div>
        }
          </>
        }
      </>
    );
  }
}

export default CardGridView;
