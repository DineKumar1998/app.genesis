import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { NotificationManager } from "react-notifications";
import { AddState, UpdateState } from "src/api/stateAndCity/state";

class AddEditForm extends React.Component {
  state = {
    id: "",
    name: "",
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
      let rs = await AddState({
        name: this.state.name,
      });
      this.props.addItemToState(rs);
      this.props.toggle();
      NotificationManager.info("State Added Successfully", "Info", 2000);
    }
  };

  // ****************** Edit Function *****************************

  submitFormEdit = async (e) => {
    e.preventDefault();
    await this.validation();
    if (this.state.valid === true) {
      let rs = await UpdateState({
        id: this.state.id,
        name: this.state.name,
      });
        this.props.updateState(rs);
        this.props.toggle();
        NotificationManager.info("State Updated Successfully", "Info", 2000);
      
    }
  };

  // ****************** Validation Function *****************************

  validation = (e) => {
    if (!this.state.name) {
      return NotificationManager.error("Please Enter State", "Info", 2000);
    } else {
      this.setState({ valid: true });
    }
  };

  async componentDidMount() {
    if (this.props.item) {
      const { id, name } = this.props.item;
      this.setState({ id, name });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label >State Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            onChange={this.onChange}
            value={this.state.name === null ? "" : this.state.name}
          />
        </FormGroup>
        <Button  color="primary">Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm