import { Button,Modal } from 'react-bootstrap'
import React,{ Component } from 'react';
import axios from 'axios'

class EditUser extends Component{
  constructor(props) {
    super(props);
    this.state = {
      id :'',
      fields: {},
      errors: {},
      touched: {},
      show: false,
      formSubmitted: false,
      submitDisabled: true    
    }
    this.onEditUser = this.onEditUser.bind(this);
  }
  
  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }
  
  handleChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
      submitDisabled:false
    })
  }

  handleTouch(e){
    let {touched} = this.state;
    if(e.target.name && touched[e.target.name] !==true){
      touched[e.target.name] = true;
      this.setState({
        touched
       });
    }
  }

  onEditUser = (e) => {
    e.preventDefault();
    this.setState({
      formSubmitted: true,
    });
    if(this.validateForm()){
      let fields = {};
      fields["userName"] = "";
      fields["userEmail"] = "";
      fields["userMobile"] = "";
      fields["userRole"] = "";
      this.setState({ 
        fields: fields,
      });
      this.hideModal()
      localStorage.setItem("Jobzilla",JSON.stringify([this.state.fields]))
      window.location.reload()

          //Adding axios code
               const options = { 
               headers: { 
               'Content-Type': 'application/json', 
               } 
               };
             axios
             .put("https://techm-jobzilla.herokuapp.com/jobs/user/user", this.state.fields, options)
             .then(Response=>{console.log("Success..",Response)
             this.props.history.push('/')})
             .catch(error=>{console.log("Error Occured..",error)})
      
      alert("You have updated Successfully");
    }
  }
    
  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
   
    if (!fields["userMobile"]) {
      formIsValid = false;
      errors["userMobile"] = "*Please enter your mobile no.";
    }

    if (typeof fields["userMobile"] !== "undefined") {
      if (!fields["userMobile"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["userMobile"] = "*Please enter valid mobile/landline no.";
      }
    }
    if (!fields["userRole"]) {
      formIsValid = false;
      errors["userRole"] = "*Please select user role";
    }

    this.setState({
      errors: errors,
      submitDisabled: !formIsValid
    });
    return formIsValid;
  }

  render(){
    return (
      <>
      {/* Below button is used to call the modal popup .please remove once you call this from manage user */}
      <Button onClick={() =>this.showModal(true)}>Small modal</Button>
      <Modal
        show={this.state.show}
        onHide={() => this.hideModal(false)}
        aria-labelledby="contained-modal-title-vcenter"> 
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit user
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
          <fieldset disabled="disabled">
                  <div className="form-group">
                      <label htmlFor="userName">Name</label>
                      <input type="text" id="userName" name="userName" placeholder="joe doe" className="form-control"  value={this.state.fields.userName} />
                    
                  </div>
                  
                  <div className="form-group">
                      <label htmlFor="userEmail">Official Email</label>
                      <input type="email" id="userEmail" name="userEmail" placeholder="joedoe@example.com" className="form-control"  value={this.state.fields.userEmail} />
                    
                  </div>
                  </fieldset> 
                  <div className="form-group">
                      <label htmlFor="userMobile">Mobile/Landline</label>
                      <input type="text" id="userMobile" name="userMobile" placeholder="98500 00000" className="form-control"  value={this.state.fields.userMobile} onChange={ (e) => {this.handleChange(e);this.validateForm();} }
                      onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } />
                      {
                          this.state.formSubmitted || this.state.touched.userMobile?
                          <div className="errorMsg">{this.state.errors.userMobile}</div>:''                   
                      }
                  </div>
                     
                  <div className="form-group">
                      <label htmlFor="userRole">Role</label>
                      <select id="userRole" name="userRole" className="form-control" value={this.state.fields.userRole} onChange={ (e) => {this.handleChange(e); this.validateForm()} }
                      onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } >
                      {
                          this.state.formSubmitted ?
                          <div className="errorMsg">{this.state.errors.userRole}</div>:''                   
                      }
                          <option value="select role" selected>Select Role </option> 
                          <option value="admin">Admin</option>
                          <option value="provider">Provider</option>
                          <option value="recruiter">Recruiter</option>
                      </select>
                  </div> 
                  
                  <button className="btn darkBlue float-right px-4" disabled={this.state.submitDisabled}  onClick={this.onEditUser}>Edit User</button> 

            
          </form>
          </Modal.Body>
      </Modal>
      </>
    );
  }
}

export default EditUser