import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { NotificationManager } from "react-notifications";
import { AddOffer, UpdateOffer} from "src/api/offer/offer";
import { GetDistributor } from "src/api/distributor/distributor";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import moment from "moment";

const animatedComponents = makeAnimated();


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
    title: "",
    description:"",
    valid_upto:"",
    distributor: [],
    distributorSelected: [],
    distributorList: [],
    file: null, image : null, base64: null, objectUrl: null, 
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
        objectUrl: URL.createObjectURL(file)
      });
    });
  };

  // ****************** Add Function *****************************

  submitFormAdd = async (e) => {
    e.preventDefault();
    await this.DistributorFilter()
    await this.validation();
    if (this.state.valid === true) {
      let rs = await AddOffer({
        title : this.state.title,
        description: this.state.description,
        distributor : this.state.distributorSelected,
        image: this.state.file,
        valid_upto: this.state.valid_upto,
        reps: this.state.distributorSelected
      });
      if (rs !== true) {
        this.props.addItemToState(rs);
        NotificationManager.info("Added Successfully", "Info", 2000);
      }
      else{
        NotificationManager.error("Something Went Wrong", "Info", 2000);
      }
      this.props.toggle();


    }
  };

  // ****************** Edit Function *****************************

  submitFormEdit = async (e) => {
    e.preventDefault();
    await this.DistributorFilter()
    await this.validation();
    if (this.state.valid === true) {
      let rs = await UpdateOffer({
        id: this.state.id,
        title : this.state.title,
        description: this.state.description,
        distributor : this.state.distributorSelected,
        image: this.state.file,
        valid_upto: this.state.valid_upto,
        reps: this.state.distributorSelected
      });
      if (rs !== true) {
        this.props.updateState(this.state.id);
        NotificationManager.info("Updated Successfully", "Info", 2000);
      }
      else{
        NotificationManager.error("Something Went Wrong", "Info", 2000);
      }
        this.props.toggle();
    }
  };


  DistributorFilter = () => {
    let newDistributorSelected = []
    if(this.state.distributor){
      this.state.distributor.map((it) => {
        newDistributorSelected.push(it.value)
        return null
      })
    }
    this.setState({distributorSelected : newDistributorSelected})
  }

  // ****************** Validation Function *****************************

  validation = (e) => {
    if (!this.state.title) {return NotificationManager.error("Please Enter Title", "Info", 2000);} 
    if (!this.state.description) {return NotificationManager.error("Please Enter description", "Info", 2000);} 
    else {this.setState({ valid: true }); }
  };

  // ****************** componentDidMount Function *****************************

  async componentDidMount() {

    let rs = await GetDistributor() 
    if (rs) {
           this.setState({distributorList : rs})
      }

    if (this.props.item) {
      const { id, title, description } = this.props.item;
      this.setState({ id, title, description });
      this.setState({base64 : this.props.item.image})
      var new_date = moment(this.props.item.valid_upto, "YYYY/MM/DD").add(1, 'days');
      let newDate = new Date(new_date).toISOString()
      this.setState({valid_upto : newDate})
      let reps = []
      this.props.item.reps.map((it) => {
        reps.push({value : it.id , label : it.name})
        return null
      })
      this.setState({distributor : reps})
    }
  }
  
  render(
  ) {
    let { base64 } = this.state;
    let defaultImage = this.state.base64
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
        <Label>Title</Label>
            <Input type="text" name="title" id="title" onChange={this.onChange} value={this.state.title === null ? '' : this.state.title} />
        </FormGroup> 
        <FormGroup>
            <Label>description</Label>
            <Input type="textarea" name="description" id="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description} />
        </FormGroup>
        <FormGroup>
        <Label for="distributor">Distributor</Label>
        <Select isMulti value={this.state.distributor} components={animatedComponents} onChange={(selectedOption) => this.setState({distributor : selectedOption})} options = {this.state.distributorList.map((item) => {
          return { value: item.id, label: item.name};})}/>
        </FormGroup>
        <FormGroup>
            <Label>Valid Upto</Label>
            <Input type="date"  name="date" value={this.state.valid_upto } onChange= {(e)=> this.setState({valid_upto:e.target.value})} />
        </FormGroup>
        {this.state.base64 ? <FormGroup><img src={base64 || defaultImage} style={{maxWidth:"200px", maxHeight:"200px"}} alt="selected"/> </FormGroup>: <></>}
        <FormGroup>
            <Label>Select Image</Label>
            <Input type="file" accept="image/x-png,image/gif,image/jpeg" name="image" id="image" onChange={this.handleChangePhotoFileInput} ref={input => (this.inputFileRef = input)} />
        </FormGroup>
        <Button  color="primary">Submit</Button>
    </Form>
    );
  }
}

export default AddEditForm