import React from "react";
import profileCover from '../../../assets/images/profileCover.png'
import profile from '../../../assets/images/profile.png'
import "./styles.scss"
import { AddUpdateAbout, GetAbout } from "src/api/about/about";
import { NotificationManager } from "react-notifications";
import { UserProfile } from "src/api/user/user";

async function readDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(reader.result);
    reader.onerror = e => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

class AboutUs extends React.Component {
  state = {
    companyName: "", profileImage:"",
    file: null, image: null, base64: null, objectUrl: null, valid: false, updated: false,
    id: '', about: '', address: '', address2: '', address3: '', phone: '',
    whatsapp: '', whatsapp_greeting: '', website: '', email: '',
    facebook: '', linkedin: '', pinterest: '', twitter: '', corporate_video: '',
    drive_List: [], values: [] , loading : true
  };

  // ******************************ON CHANGE DOWNLAOD LINKS*************************************

  handleRolesChange = (id, event, imgType) => {
    event.preventDefault();
    const { drive_List } = this.state;
    let myRowIndex = drive_List.findIndex((row) => row.division_id === id);
    this.setState({ drive_List });
    if (imgType === "PRO") {
      drive_List[myRowIndex].product_list_link = event.target.value;
      this.setState({ drive_List });
    }
    else if (imgType === "VIS") {
      drive_List[myRowIndex].visualaids_link = event.target.value;
      this.setState({ drive_List });
    }
  }

  // ******************************ON CHANGE BANNER*************************************

  inputFileRef = null;
  handleChangePhotoButton = e => {
    e.preventDefault();
    this.inputFileRef.click();
  };

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

  // ******************************ADD UPDATE*************************************

  submitFormAddUpdate = async (e) => {
    e.preventDefault();
    await this.validation()
    if (this.state.valid === true) {
      let rs = AddUpdateAbout({
        image: this.state.file,
        phone: this.state.phone.trim(),
        whatsapp: this.state.whatsapp.trim(),
        website: this.state.website.trim(),
        email: this.state.email.trim(),
        about: this.state.about,
        address: this.state.address,
        address2: this.state.address2,
        address3: this.state.address3,
        facebook: this.state.facebook.trim(),
        linkedin: this.state.linkedin.trim(),
        pinterest: this.state.pinterest.trim(),
        twitter: this.state.twitter.trim(),
        whatsapp_greeting: this.state.whatsapp_greeting,
        corporate_video: this.state.corporate_video.trim(),
        download_links: this.state.drive_List
      })
      if (rs) {
        NotificationManager.info("Info Updated Successfully", "Info", 2000);
        this.setState({ updated: true })
      }
      this.setState({ valid: false })
    }
  };

  // ******************************Validation Function*************************************

  validation = () => {
    if (!this.state.phone.trim()) { return NotificationManager.error("Enter your Phone No.", "Info", 2000); }
    else if ( this.state.phone.length <= 9 || this.state.phone.length > 12 || this.state.phone.length === 11 ) { return NotificationManager.error("Enter Valid Phone No.", "Info", 2000); }
    else if (!this.state.whatsapp.trim()) { return NotificationManager.error("Enter your WhatsApp No.", "Info", 2000); }
    else if (!this.state.website.trim()) { return NotificationManager.error("Enter your Website", "Info", 2000); }
    else if (!this.state.email.trim()) { return NotificationManager.error("Enter your Email", "Info", 2000); }
    else if (!this.state.about.trim()) { return NotificationManager.error("Enter your Company Info", "Info", 2000); }
    else if (!this.state.address.trim()) { return NotificationManager.error("Enter your Address", "Info", 2000); }
    else if (!this.state.base64.trim()) { return NotificationManager.error("Upload Banner Image", "Info", 2000); }
    else if (!this.state.drive_List) { return NotificationManager.error("Enter Webhopers Product List Link", "Info", 2000) }
    else{ this.setState({ valid: true })}
  }

  // ******************************ComponentDidMount Function*************************************

  async componentDidMount() {
    let rs = await GetAbout();
    if (rs.success === true) {
      const { id, about, about_img, address, address2, address3, phone, whatsapp, whatsapp_greeting, website,
        email, twitter, facebook, pinterest, linkedin, corporate_video } = rs.data;

      this.setState({
        id, about, about_img, address, address2, address3, phone, whatsapp, whatsapp_greeting, website,
        email, twitter, facebook, pinterest, linkedin, corporate_video
      });

      this.setState({ base64: rs.data.about_img })
      this.setState({ drive_List: rs.data.download_links })    

      let rsProfile = await UserProfile()
      if (rsProfile.success === true){
        this.setState({companyName : rsProfile.data.company})
        this.setState({profileImage : rsProfile.data.profile_pic})
      }
    }
    else {
      this.setState({companyName : "Demo"})
      this.setState({profileImage : `${profile}`})
    }
    this.setState({loading : false})

  }

  // ******************************componentDidUpdate Function*************************************

  async componentDidUpdate() {

    if (this.state.updated === true) {
      let rs = await GetAbout();
      if (rs.success === true) {

        const { id, about, about_img, address, address2, address3, phone, whatsapp, whatsapp_greeting, website,
          email, twitter, facebook, pinterest, linkedin, corporate_video } = rs.data;

        this.setState({
          id, about, about_img, address, address2, address3, phone, whatsapp, whatsapp_greeting, website,
          email, twitter, facebook, pinterest, linkedin, corporate_video
        });

        this.setState({ base64: rs.data.about_img })
        this.setState({ drive_List: rs.data.download_links })
        this.setState({ updated: false })
      }
    }
  }

  render() {
    let { base64 } = this.state;
    let defaultImage
    if (!this.state.base64) {
      defaultImage = "https://res.cloudinary.com/mhmd/image/upload/v1557366994/img_epm3iz.png"
    }
    else {
      defaultImage = this.state.base64
    }
    return (
      <>
        { this.state.loading ? <div className="loader"></div> :
        <div>
        <div>
          <div className="container-fluid mt--6">
            <div className="row">
              <div className="col-xl-4 order-xl-2">
                <div className="card card-profile">
                  <img src={profileCover} alt="card placeholder" className="card-img-top" />
                  <div className="row justify-content-center">
                    <div className="col-lg-3 order-lg-2">
                      <div className="card-profile-image">
                          <img src={this.state.profileImage} className="rounded-circle" alt="company logo placeholder" />
                      </div>
                    </div>
                  </div>
                  <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  </div>
                  <div className="card-body pt-0">
                    <div className="row">
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center">
                        </div>
                      </div>
                    </div>
                    <div className="text-center" style={{marginTop: '25px'}}>
                      <h5 className="h3" style={{ fontSize: "20px" }}>
                        {this.state.companyName}
                      </h5>
                      <div className="h5 font-weight-300">
                        <p className="ni location_pin mr-2" style={{ fontSize: "14px" }}>{this.state.address}</p>
                        <p className="ni location_pin mr-2" style={{ fontSize: "14px", color: "blue" }}>{this.state.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 order-xl-1">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0" style={{ fontSize: "20px", }}><b>Edit Company Info</b></h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">

                    {/* ************************************FORM******************************************* */}

                    <form onSubmit={this.submitFormAddUpdate}>
                      <h6 className="heading-small text-muted mb-4">Basic information</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label">Phone Number</label>
                              <input type="tel" value={this.state.phone}
                                onChange={(e) => this.setState({ phone: e.target.value })} className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label">WhatsApp Number</label>
                              <input type="tel" className="form-control" value={this.state.whatsapp}
                                onChange={(e) => this.setState({ whatsapp: e.target.value })} />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label">Email</label>
                              <input type="email" className="form-control" placeholder="demo@gmail.com" value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label">Website</label>
                              <input type="url" className="form-control" placeholder="www.demo.com" value={this.state.website}
                                onChange={(e) => this.setState({ website: e.target.value })} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />

                      {/* ---------------------------------Contact Info--------------------------------- */}

                      <h6 className="heading-small text-muted mb-4">Contact information</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-control-label">Address 1</label>
                              <input className="form-control" value={this.state.address}
                                onChange={(e) => this.setState({ address: e.target.value })} placeholder="Company Address" type="text" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-control-label" >Address 2</label>
                              <input className="form-control" value={this.state.address2}
                                onChange={(e) => this.setState({ address2: e.target.value })} placeholder="Company Address" type="text" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-control-label">Address 3</label>
                              <input className="form-control" value={this.state.address3}
                                onChange={(e) => this.setState({ address3: e.target.value })} placeholder="Company Address" type="text" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />


                      {/* ---------------------------------Link Info--------------------------------- */}

                      <h6 className="heading-small text-muted mb-4">Social Media Link</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" >Facebook Link</label>
                              <input type="text" className="form-control" value={this.state.facebook}
                                onChange={(e) => this.setState({ facebook: e.target.value })} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" >Twitter Link</label>
                              <input type="text" className="form-control" value={this.state.twitter}
                                onChange={(e) => this.setState({ twitter: e.target.value })} />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" >Pinterest Link</label>
                              <input type="text" className="form-control" value={this.state.pinterest}
                                onChange={(e) => this.setState({ pinterest: e.target.value })} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" >Linkedin Link</label>
                              <input type="text" className="form-control" value={this.state.linkedin}
                                onChange={(e) => this.setState({ linkedin: e.target.value })} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />

                      {/* ---------------------------------Other Info--------------------------------- */}

                      <h6 className="heading-small text-muted mb-4">Other information</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label">Video Link</label>
                              <input type="text" className="form-control" value={this.state.corporate_video}
                                onChange={(e) => this.setState({ corporate_video: e.target.value })} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" >WhatsApp Greeting Message</label>
                              <input type="text" className="form-control" value={this.state.whatsapp_greeting}
                                onChange={(e) => this.setState({ whatsapp_greeting: e.target.value })} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                      {/* ---------------------------------About Info--------------------------------- */}

                      <h6 className="heading-small text-muted mb-4">About</h6>
                      <div className="pl-lg-4">
                        <div className="form-group">
                          <label className="form-control-label">Company Information</label>
                          <textarea type="text" value={this.state.about} className="form-control"
                            onChange={(e) => this.setState({ about: e.target.value })} rows={4} placeholder="A few words about you ..." />
                        </div>
                      </div>
                      <hr className="my-4" />

                      {/* ---------------------------------Banner Info--------------------------------- */}

                      <h6 className="heading-small text-muted mb-4">Upload Banner</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-5 mx-auto" >
                            <img src={base64 || defaultImage} alt="upload file" style={{ width: "300px" }} className="d-block mx-auto mb-4 " />
                          </div>
                        </div>
                        <div className="col-lg-5 mx-auto">
                          <input id="customFile" type="file" className="custom-file-input rounded-pill"
                            onChange={this.handleChangePhotoFileInput} ref={input => (this.inputFileRef = input)} />
                          <label className="custom-file-label rounded-pill">Choose file</label>
                        </div>
                        <hr className="my-4" />

                        {/* ---------------------------------Google Drive Links--------------------------------- */}

                        <h6 className="heading-small text-muted mb-4">Google Drive Division Links</h6>
                        <div className="pl-lg-4">
                          {this.state.drive_List !== undefined ?
                            this.state.drive_List.map((it,) =>
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <label className="form-control-label" >Product List link<b> {it.division_name}</b>
                                    </label>
                                    <input
                                      value={it.product_list_link}
                                      className="form-control"
                                      onChange={(e) => this.handleRolesChange(it.division_id, e, "PRO")}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <label className="form-control-label" >Visual-aids link <b> {it.division_name}</b>
                                    </label>
                                    <input
                                      className="form-control"
                                      value={it.visualaids_link}
                                      onChange={(e) => this.handleRolesChange(it.division_id, e, "VIS")}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                            :
                            <></>
                          }
                        </div>
                      </div>
                      <button className="btn btn-primary" type="submit" style={{ backgroundColor: "#55acee", float: "right", marginTop: "20px" }}
                      ><i className="fas fa-save"></i> Save Changes</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
        </div> 
  }
      </>
    );
  };
}

export default AboutUs;