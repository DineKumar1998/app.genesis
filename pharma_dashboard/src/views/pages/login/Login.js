import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import wave from '../../../assets/images/wave.png'
import bg from '../../../assets/images/bg.svg'
import avatar from '../../../assets/images/avatar.svg'
import { AdminLogin, AdminResetPassword } from "src/api/login/login";
import { isEmail } from "src/lib/validator";

export default class Login extends Component {
  state ={
    email:"",
    recoverEmail:"",
    password:"",
    prevEmail:"",
    prevPass:"",
    valid: false,
    error : false,
    modal : false,
    loading: false,
    loadingR: false
  }

  // ---------------------------- ON CHANGE ------------------------------------

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // ---------------------------- ON MODAL OPEN ------------------------------------

  toggle = () => {
    this.setState({modal: !this.state.modal})
  }

  // ----------------------------- LOGIN FUNCTION ---------------------------------

  login = async (e) => {

    e.preventDefault()
    await this.validation()
    this.setState({loading: true})
    if (this.state.valid === true) {
      let rs = await AdminLogin({
        email : this.state.email,
        password : this.state.password
      })
      this.setState({loading: false})

      if (rs.success === true){
          localStorage.setItem("token", rs.data.token)
          window.location.assign("/")
      }
      else {
        NotificationManager.error(rs.message, "Info", 2000)
        this.setState({valid : false})
      }
    }
  }

  // ----------------------------- PASSWORD RESET FUNCTION --------------------------

  resetPassword = async () => {
    if (!this.state.recoverEmail){
      return NotificationManager.error("Please Enter Email", "Info", 2000)
    }
    else if (!isEmail(this.state.recoverEmail)){
      return NotificationManager.error("Please Enter Valid Email", "Info", 2000)
    }
    else {
      this.setState({loadingR: true})

      let rs = await AdminResetPassword ({
        email : this.state.recoverEmail
      })
      this.setState({loadingR: false})

      if (rs.success === true){
        NotificationManager.success("Password Reset SuccessFully", "Info", 2000)
      }
      else {
          NotificationManager.error(rs.message, "Info", 2000)
      }
      this.toggle()

    }
  }

  // --------------------------- VALIDATIONS ------------------------------------

  validation() {
    if (!this.state.email){
      return NotificationManager.error("Please Enter Email", "Info", 2000)
    }
    else if (! isEmail(this.state.email)){
      return NotificationManager.error("Please Enter Valid Email", "Info", 2000)
    }
    else if (!this.state.password){
      return NotificationManager.error("Please Enter Password", "Info", 2000)
    }
    else {
      this.setState({valid : true})
    }
  }

  render() {
    let setError = {}

    if (this.state.error === true && this.state.prevEmail === this.state.email && this.state.prevPass === this.state.password ){
        setError  =  {borderColor:"red", color:"red"}
    }
    else if (this.state.email !== "" || this.state.password !==""){
      setError  = {borderColor:"#d9d9d9", color:"#2dd096"} 
    }
    else {
      setError  = {borderColor:"#d9d9d9", color:"#d9d9d9"} 
    }
    
    return (
      <div className="login">
        <NotificationContainer />
      <img className="wave" alt="wave" src={wave} />
      <div className="container-login">
        <div className="img">
          <img src={bg} alt="background"  />
        </div>
        <div className="login-content">
          <form className="login-form">
            <img src={avatar} alt="avatar"  />
            <h2 ><b className="login-h2">Welcome</b></h2>
            <div className="input-div one" style={setError}>
              <div className="login-i" style={setError}>
                <i className="fas fa-user login-i" />
              </div>

              {/* -------------------------- LOGIN fORM ------------------------------------ */}

              <div className="div">
                <input type="email" className="input-login" placeholder="Email"
                value={this.state.email} onChange={this.onChange} name="email"
                />
              </div>
            </div>
            <div className="input-div pass" style={setError}>
              <div className="login-i" style={setError}> 
                <i className="fas fa-lock login-i" />
              </div>
              <div className="div">
                <input type="password" className="input-login" placeholder="Password"  
                value={this.state.password} onChange={this.onChange} name="password"
                />
              </div>
            </div>

            {/* ---------------------------- FORGET PASSWORD --------------------------------- */}

            <span className="a-login" style={{cursor : "pointer"}}  onClick={this.toggle}>Forgot Password?</span>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Forgot Password</ModalHeader>
              <ModalBody>
              <div className="form-group row" >
              <label className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input type="email" value={this.state.recoverEmail} name="recoverEmail"
                  onChange={this.onChange} className="form-control" />
              </div>
            </div>
              </ModalBody>
              <ModalFooter>
                <Button color="#2ed198 btn-sm" style={{backgroundColor:"#2ed198", color:"white", borderRadius:"30px"}} onClick={this.resetPassword}>
                { this.state.loading ? <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {" "} Loading... </> : <>Reset Password</>  }
                </Button>{' '}
              </ModalFooter>
            </Modal>
            <button type="submit" className="btn-login" onClick={this.login}>
            { this.state.loading ? <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
             {" "} Loading... </> : <>login</>  }
            </button>
          </form>
        </div>
      </div>
    </div>
    );
  }
}
