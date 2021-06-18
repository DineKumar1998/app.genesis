import React from "react";
import Select from 'react-select';
import { Button, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { NotificationManager } from "react-notifications";
import { AddProducts, UpdateProducts} from "src/api/products/allProducts/products";
import { GetPackingType } from "src/api/products/packingType/packingType";
import { GetType } from "src/api/products/productType/productType";
import { GetDivisionType } from "src/api/products/divisionType/divisionType";
import { GetCategoryType } from "src/api/products/category/category";
import { DetachPic } from "src/api/gallery/gallery";
import C from "src/constants";


async function readDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(reader.result);
      reader.onerror = e => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
  
class AddEditForm extends React.Component {
  state = {
    id: "",
    division_id: "",
    type_id: "",
    category_id : '',
    name: "",
    description:"",
    price: "",
    min_order_qty: "1",
    images: [],
    visualate: [],
    technical_detail: "",
    packing: "",
    packing_type: "",
    sku: "",
    hsn_code: "",
    new_launched: "false",
    visualImage: null,
    productImage: null,
    imagePreviewUrl: '',
    packageType:[], divisionType : [], category:[],type:[],
    packingTypeSelect:{}, divisionTypeSelect:{}, categorySelect:{}, typeSelect:{},
    file: null, image : null, base64: null,
    file2: null, image2 : null, base642: null,
    imgUrls : [], visUrls : [], imgFile: [], visFile: [],
    valid : false, update : false,

    selectedImages: []
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // -----------------------METADATA FUNCTION-----------------------------

   getFileMetadata = file => {
    return {
      lastModified: file.lastModified,
      name: file.name,
      size: file.size,
      type: file.type,
      webkitRelativePath: file.webkitRelativePath
    }
  }

  // -----------------------ONCHANGE FUNCTION-----------------------------

   handleUploadImg =   ( e ) => {
    let newstate = [];
    let selectedImages = [];
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];
      let url = URL.createObjectURL(file);
      selectedImages.push(file);
      let metadata = this.getFileMetadata(file);
      newstate = [...newstate,  { url, metadata, file }];
    }
    this.setState({imgUrls : newstate})
  };

  handleUploadVis =   ( e ) => {
    let newstate = [];
    let selectedImages = [];
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];
      let url = URL.createObjectURL(file);
      selectedImages.push(file);
      let metadata = this.getFileMetadata(file);
      newstate = [...newstate,  { url, metadata, file }];
    }
    this.setState({visUrls : newstate})
  };

// ***************** IMAGE FUNCTION ****************************

  handleChangePhotoFileInput = e => {
    const target = e.currentTarget;
    const file = target.files.item(0);

    // validate file as image
    if (!file.type.startsWith("image/")) {
      return NotificationManager.error("Image Format Not Supported", "Info", 2000)
    }

    // store reference to the File object and a base64 representation of it
    readDataUrl(file).then(dataUrl => {
      this.setState({
        ...this.state,
        file,
        base64: dataUrl,
      });
    });
  };

  handleChangePhotoFileInputVisual = e => {
    const target = e.currentTarget;
    const file2 = target.files.item(0);

    // validate file as image
    if (!file2.type.startsWith("image/")) {
      return NotificationManager.error("Image Format Not Supported", "Info", 2000)
    }
    // store reference to the File object and a base64 representation of it
    readDataUrl(file2).then(dataUrl => {
      this.setState({
        ...this.state,
        file2,
        base642: dataUrl,
      });
    });
  };

  selectFormater() {
    let pkgType = ""
    let divId = ""
    let catId = ""
    let typeId = ""

    if (this.state.packingTypeSelect && this.state.divisionTypeSelect && this.state.categorySelect
      && this.state.typeSelect){
      pkgType =  this.state.packingTypeSelect.label 
      divId = this.state.divisionTypeSelect.value
      catId = this.state.categorySelect.value
      typeId = this.state.typeSelect.value
      this.setState({packing_type : pkgType})
      this.setState({division_id : divId})
      this.setState({category_id : catId})
      this.setState({type_id : typeId})
    }

    let imageItem = []
    let imgUrls = [this.state.imgUrls]
    if(imgUrls.length > 0){
      imgUrls.map((it) => 
        it.map((item) => 
          imageItem.push(item.file)
        )
      )
    }

    let visItem = []
    let visUrls = [this.state.visUrls]
    if(visUrls.length > 0){
      visUrls.map((it) => 
        it.map((item) => 
          visItem.push(item.file)
        )
      )
    }

    this.setState({imgFile : imageItem})
    this.setState({visFile : visItem})
  }

  // ****************** Add Function *****************************

  submitFormAdd = async (e) => {
    e.preventDefault();
    await this.selectFormater()
    await this.validation();
    if (this.state.valid === true) {
      let new_launched = false
      if (this.state.new_launched === "true"){
        new_launched = true
      }
      let rs = await AddProducts({
        name : this.state.name,
        description: this.state.description,
        price: parseInt(this.state.price),
        min_order_qty: parseInt(this.state.min_order_qty),
        technical_detail : this.state.technical_detail,
        packing : this.state.packing,
        type_id : this.state.type_id,
        category_id : this.state.category_id,
        packing_type : this.state.packing_type,
        division_id : this.state.division_id,
        sku : this.state.sku,
        hsn_code : this.state.hsn_code,
        images : this.state.images,
        visualate : this.state.visualate,
        new_launched : new_launched
      });
      if (rs !== true) {
        this.props.addItemToState(rs);
        NotificationManager.info("Product Added Successfully", "Info", 2000);
      }
      else {
        NotificationManager.error("Something Went Wrong", "Info", 2000);
      }
      this.props.toggle();
    }
  };

  // ****************** Edit Function *****************************

  submitFormEdit = async (e) => {
    e.preventDefault();
    await this.selectFormater()
    await this.validation();
    if (this.state.valid === true) {
      let new_launched = false
      if (this.state.new_launched === "true"){
        new_launched = true
      }
      let rs = await UpdateProducts({
        id: this.state.id,
        name : this.state.name,
        description: this.state.description,
        price: parseInt(this.state.price),
        min_order_qty: parseInt(this.state.min_order_qty),
        technical_detail : this.state.technical_detail,
        packing : this.state.packing,
        type_id : this.state.type_id,
        category_id : this.state.category_id,
        packing_type : this.state.packing_type,
        division_id : this.state.division_id,
        sku : this.state.sku,
        hsn_code : this.state.hsn_code,
        images : this.state.imgFile,
        visualate : this.state.visFile,
        new_launched : new_launched
      });
      if (rs !== true && rs.id) {
        this.props.updateState(rs.id);
        NotificationManager.success("Product Updated Successfully", "Info", 2000);
      }
      else{
        NotificationManager.error("Something Went Wrong", "Info", 2000);
      }
      this.props.toggle();
    }
    return false
  };

  // ****************** Validation Function ***********************************

  validation = () => {
    if (!this.state.name || this.state.name.trim().length === 0) {return NotificationManager.error("Please Enter Name", "Info", 2000);} 
    else if (!this.state.price) {return NotificationManager.error("Please Enter Price", "Info", 2000);} 
    else if (!this.state.description || this.state.description.trim().length === 0) {return NotificationManager.error("Please Enter Composition", "Info", 2000);} 
    else if (!this.state.packingTypeSelect || Object.keys(this.state.packingTypeSelect).length === 0) {return NotificationManager.error("Please Select Packing Type", "Info", 2000);} 
    else if (!this.state.divisionTypeSelect || Object.keys(this.state.divisionTypeSelect).length === 0) {return NotificationManager.error("Please Select Division", "Info", 2000);} 
    else if (!this.state.categorySelect || Object.keys(this.state.categorySelect).length === 0) {return NotificationManager.error("Please Select Category", "Info", 2000);} 
    else if (!this.state.typeSelect || Object.keys(this.state.typeSelect).length === 0) {return NotificationManager.error("Please Select Product Type", "Info", 2000);} 
    else if (!this.state.min_order_qty) {return NotificationManager.error("Please Enter Minimum Order Quantity", "Info", 2000);} 
    else {this.setState({ valid: true }); }
  };


  // ****************** Remove Function ***********************************

  removeimage = async(imgUrl, type) => {
    if (type === "Vis"){
      let rs = await DetachPic({
        id: this.state.id,
        url: (imgUrl).replace(C.SERVER_URL, ''),
        type: "VIS"
      })
      if (rs) {
        let newFileVis = []
        this.state.visUrls.map((it) => 
        {
          if (it.url !== imgUrl){
            newFileVis.push(it)
          }
        }
        )
        this.setState({visUrls : newFileVis})
      }
      else {
        NotificationManager.error("Something Went Wrong", "Error", 2000);
      }

    }
    
    else {
      let rs = await DetachPic({
        id: this.state.id,
        url: (imgUrl).replace(C.SERVER_URL, ''),
        type: "IMG"
      })
      if (rs) {
        let newFile = []
        this.state.imgUrls.map((it) => {
          if (it.url !== imgUrl){
            newFile.push(it)
          }
          this.setState({imgUrls : newFile})
        })
      }
      else {
        NotificationManager.error("Something Went Wrong", "Error", 2000);
      }
    }
  }

  // ********************** Get Data Function *************************************

   getData = async() => {
     
    let rsPackaging = await GetPackingType()
    let rsType = await GetType()
    let rsDivision = await GetDivisionType()
    let rsCategory = await GetCategoryType()

    if (rsPackaging && rsType && rsDivision && rsCategory) {
      this.setState({ packageType: rsPackaging })
      this.setState({ type: rsType })
      this.setState({ divisionType: rsDivision })
      this.setState({ category: rsCategory })
    }

    if (this.props.item) {
      const { id, name, description, price, min_order_qty, technical_detail, packing, sku, hsn_code } = this.props.item;
      this.setState({ id, name, description, price, min_order_qty, technical_detail, packing, sku, hsn_code });

      if (this.props.item.new_launched === true){
        this.setState({new_launched  : "true"})
      }else{
        this.setState({new_launched  : "false"})
      }

      if (this.props.item.images && Array.isArray(this.props.item.images)) {
        let selectedImg = []
        let selectedVis = []
        let imgMap = [this.props.item.images]
        imgMap.map((it) =>
          it.map((item) => {
            if (item.type === "IMG") {
              selectedImg.push({ url: item.url })
            }
            else {
              selectedVis.push({ url: item.url })
            }
          }))

        this.setState({ imgUrls: selectedImg })
        this.setState({ visUrls: selectedVis })
      }
      
      let packingTypeprops = {}
      let divisionTypeProps = {}
      let categoryTypeProps = {}
      let TypeProps = {}

      if (this.props.item.packing_type && Array.isArray(this.state.packageType)) {
        this.state.packageType.map((it) => {
          if (it.name === this.props.item.packing_type) {
            packingTypeprops = { value: it.id, label: it.name }
          }
          return true
        })
      }

      if (this.props.item.division_name && Array.isArray(this.state.divisionType)) {
        this.state.divisionType.map((it) => {
          if (it.name === this.props.item.division_name) {
            divisionTypeProps = { value: it.id, label: it.name }
          }
          return true
        })
      }

      if (this.props.item.category_name && Array.isArray(this.state.category)) {
        this.state.category.map((it) => {
          if (it.name === this.props.item.category_name) {
            categoryTypeProps = { value: it.id, label: it.name }
          }
          return true
        })
      }

      if (this.props.item.type_name && Array.isArray(this.state.type)) {
        this.state.type.map((it) => {
          if (it.name === this.props.item.type_name) {
            TypeProps = { value: it.id, label: it.name }
          }
          return true
        })
      }
      this.setState({ packingTypeSelect: packingTypeprops })
      this.setState({ divisionTypeSelect: divisionTypeProps })
      this.setState({ categorySelect: categoryTypeProps })
      this.setState({ typeSelect: TypeProps })

    }
   }

  // ******************* componentDidMount Function *****************************

  async componentDidMount() {
    this.getData()
  }

    // ******************* componentDidUpdate Function *****************************

    async componentDidUpdate() {

      if (this.state.update === true){
        this.getData()
        this.setState({update : false})

      }
    }
  

  render() {
    return (

      <>
  
      {/* _________________________________TEXT INPUT______________________________________ */}

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
          <Label>Composition</Label>
            <Input type="text" name="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description} />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Price</Label>
            <Input type="number" name="price" onChange={this.onChange} value={this.state.price === null ? '' : this.state.price} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Minimum Order</Label>
            <Input type="number" name="min_order_qty" onChange={this.onChange} value={this.state.min_order_qty === null ? '' : this.state.min_order_qty} />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
          <Label>Technical Detail</Label>
          <Input type="text" name="technical_detail" onChange={this.onChange} value={this.state.technical_detail === null ? '' : this.state.technical_detail} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Packing Dimension</Label>
            <Input type="text" name="packing" placeholder="eg : 10*10" onChange={this.onChange} value={this.state.packing === null ? '' : this.state.packing} />
          </FormGroup>
        </Col>
      </Row>

      {/* ___________________________________SELECT___________________________________ */}


      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Packing Type</Label>
            <Select value={this.state.packingTypeSelect} onChange={(selectedOption) => this.setState({packingTypeSelect : selectedOption})} options = {this.state.packageType.map((item) => {
            return { value: item.id, label: item.name};})}/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Division Type</Label>
            <Select value={this.state.divisionTypeSelect} onChange={(selectedOption) => this.setState({divisionTypeSelect : selectedOption})} options = {this.state.divisionType.map((item) => {
            return { value: item.id, label: item.name};})}/>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Category</Label>
            <Select value={this.state.categorySelect} onChange={(selectedOption) => this.setState({categorySelect : selectedOption})} options = {this.state.category.map((item) => {
          return { value: item.id, label: item.name};})}/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Product Type</Label>
            <Select value={this.state.typeSelect} onChange={(selectedOption) => this.setState({typeSelect : selectedOption})} options = {this.state.type.map((item) => {
          return { value: item.id, label: item.name};})}/>
          </FormGroup>
        </Col>
      </Row>

      {/* _______________________________SKU & HNS Code__________________________________ */}

      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Sku Code</Label>
            <Input type="text" name="sku" onChange={this.onChange} value={this.state.sku === null ? '' : this.state.sku} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Hsn Code</Label>
            <Input type="text" name="hsn_code" onChange={this.onChange} value={this.state.hsn_code === null ? '' : this.state.hsn_code} />
          </FormGroup>
        </Col>
      </Row>

      {/* ________________________________ New Launched _________________________________ */}

      <Row form>
        <Col md={12}>
          <FormGroup>
          
          <div className="form-check form-check-inline">
            <span>New Launched</span>
            <input className="form-check-input" checked={this.state.new_launched === 'true'}  style={{marginLeft :"150px"}}
              onChange={(e) => this.setState({new_launched : e.target.value})} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="true" />
            <label className="form-check-label" >Yes</label>
          </div>
          <div className="form-check form-check-inline" style={{marginLeft :"150px"}}>
            <input className="form-check-input" checked={this.state.new_launched === 'false'} onChange={(e) => this.setState({new_launched : e.target.value})} type="radio" name="inlineRadioOptions" id="inlineRadio2" value="false" />
            <label className="form-check-label" >No</label>
          </div>

          </FormGroup>
        </Col>
      </Row>


      {/* _______________________________________IMAGE_____________________________________ */}

      <Row form>
        <Col md={6}>
        <div container style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {this.state.imgUrls.map(f => {
              return (
                <>
                  {this.state.imgUrls.length < 50 ?
                  
                  <div style={{position:"relative"}}>
                  <button onClick={(e) => this.removeimage(f.url)} class="close AClass">
                     <span>&times;</span>
                  </button>
                  <img src={f.url} alt='products' height="80" width="80" /> 

              </div>
                  // <img src={f.url} alt='products' height="80" width="80" /> 
                  
                  :
                    <img src={f.url} alt='products' height="30" width="30" />
                  }
                </>
              );
            })}
          </div>
          {/* {this.state.base64 ? <FormGroup><img src={base64 || defaultImage} style={{maxWidth:"200px", maxHeight:"200px"}} alt="selected"/> </FormGroup>: <></>} */}
        </Col>

        <Col md={6}>
        <div container style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {this.state.visUrls.map(f => {
              return (
                <>
                  {this.state.visUrls.length < 50 ?
                  
                  <div style={{position:"relative"}}>
                  <button onClick={(e) => this.removeimage(f.url, "Vis")} class="close AClass">
                     <span>&times;</span>
                  </button>
                  <img src={f.url} alt='products' height="80" width="80" /> 

              </div>                  
                  :
                    <img src={f.url} alt='products' height="30" width="30" />
                  }
                </>
              );
            })}
          </div>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Select Product Image</Label>
            <Input type="file" accept="image/*" multiple onChange={this.handleUploadImg} />
            {/* <Input type="file" accept="image/x-png,image/gif,image/jpeg" name="imageProduct"  onChange={this.handleChangePhotoFileInput} ref={input => (this.inputFileRef = input)} /> */}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Select Visualate Image</Label>
            <Input type="file" accept="image/x-png,image/gif,image/jpeg" name="imageVisualate" multiple  onChange={this.handleUploadVis} />
          </FormGroup>
        </Col>
      </Row>
      
      <Button color="primary" onClick={this.props.item ? this.submitFormEdit : this.submitFormAdd} >Submit</Button>
    </>
    );
  }
}

export default AddEditForm