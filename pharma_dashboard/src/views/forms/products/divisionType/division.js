import React from "react";
import validator from 'validator';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { NotificationManager } from "react-notifications";
import { AddDivisionType, UpdateDivisionType } from "src/api/products/divisionType/divisionType";

class AddEditForm extends React.Component {
  state = {
    id: "",
    name: "",
    email:"",
    phone:"",
    address:"",
    active:null,
    valid: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // ****************** Add Function *****************************

  submitFormAdd = async (e) => {
    e.preventDefault();
    await this.validation();
    if (this.state.valid === true) {
      let rs = await AddDivisionType({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address,
        active: this.state.active,
      });
      if (rs) {
        this.props.addItemToState(rs);
        NotificationManager.info("Division Added Successfully", "Info", 2000);
      }
      else{
        NotificationManager.error("Something Went Wrong", "Error", 2000);
      }
      this.props.toggle();
    }
  };

  // ****************** Edit Function *****************************

  submitFormEdit = async (e) => {
    e.preventDefault();
    await this.validation();
    if (this.state.valid === true) {
      let rs = await UpdateDivisionType({
        id: this.state.id,       
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address,
        active: this.state.active,
      });
      if (rs) {
          NotificationManager.info("Division Updated Successfully", "Info", 2000);
          this.props.updateState(rs);
      }
      else {
        NotificationManager.error("Something Went Wrong", "Error", 2000);
      }
      this.props.toggle();
    }
  };

  // ****************** Validation Function *****************************

  validation = (e) => {
    if (!this.state.name) {
      return NotificationManager.error("Please Enter Division", "Info", 2000);
    } 
    else if (!validator.isEmail(this.state.email)) {
      return NotificationManager.error("Please Enter Email", "Info", 2000);
    }
    else if (!validator.isMobilePhone(this.state.phone)) {
      return NotificationManager.error("Please Enter Phone No.", "Info", 2000);
    }
    else if (!this.state.address) {
      return NotificationManager.error("Please Enter Address", "Info", 2000);
    }
    else if (!this.state.active) {
      return NotificationManager.error("Please Enter Status", "Info", 2000);
    }
    else {
      this.setState({ valid: true });
    }
  };

  // ****************** componentDidMount Function *****************************

  async componentDidMount() {
    if (this.props.item) {
      const { id, name, email, phone, address, active} = this.props.item;
      this.setState({ id, name, email, phone, address, active });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
        <Label for="name">Division Type</Label>
        <Input
          type="text"
          name="name"
          onChange={this.onChange}
          value={this.state.name === null ? "" : this.state.name}
        />
      </FormGroup> 
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="text"
          name="email"
          onChange={this.onChange}
          value={this.state.email === null ? "" : this.state.email}
        />
      </FormGroup> 
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input
          type="tel"
          name="phone"
          onChange={this.onChange}
          value={this.state.phone === null ? "" : this.state.phone}
        />
      </FormGroup> 
      <FormGroup>
        <Label for="address">Address</Label>
        <Input
          type="textarea"
          name="address"
          onChange={this.onChange}
          value={this.state.address === null ? "" : this.state.address}
        />
      </FormGroup> 
      <FormGroup>
        <Label for="select">Status</Label>
        <Input type="select" name="select" onChange={(e) => this.setState({active : e.target.value})}
          value={this.state.active === null ? "" : this.state.active}>
          <option value="">Select</option>
          <option value={true}>Active</option>
          <option value={false}>InActive</option>
        </Input>
      </FormGroup>
        <Button  color="primary">Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm