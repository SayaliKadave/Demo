import React, { Component ,Fragment} from 'react';
// import axios from 'axios';
import HeaderAll from '../CommonComp/HeaderAll'
import Footer from '../CommonComp/Footer'
import UserService from '../../Services/UserService';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

 

//  import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';



class ManageUser extends Component{
    emptyUser = {
        id:null,
        userName:'',
        email:'',
        contactNumber:'',
        userRole:''
    };
    constructor(){
        super();

        this.state = {

            users: null,
            userDialog: false,
            deleteUserDialog: false,
            deleteUsersDialog: false,
            user: this.emptyUser,
            selectedUsers: null,
            submitted: false,
            globalFilter: null
            
            
        }
        this.userService = new UserService();
        this.editUser = this.editUser.bind(this);
        this.confirmDeleteUser = this.confirmDeleteUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.hideDeleteUserDialog = this.hideDeleteUserDialog.bind(this);
        this.hideDeleteUsersDialog = this.hideDeleteUsersDialog.bind(this);
        this.deleteSelectedUsers = this.deleteSelectedUsers.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        
        }
        componentDidMount() {
            this.userService.getAllUser().then(data => this.setState({ users: data }));
           // this.productService.getProductsWithOrdersSmall().then(data => this.setState({ products: data }));
       }
       editUser(user){
        this.setState({
            user: { ...user },
            userDialog: true
        });
    }

       confirmDeleteUser(user) {
        this.setState({
            user,
            deleteUserDialog: true
        });
    }

    hideDeleteUserDialog() {
        this.setState({ deleteUserDialog: false });
    }

    deleteUser() {
        let users = this.state.users.filter(val => val.id !== this.state.user.id);
        this.setState({
            users,
            deleteUserDialog: false,
            user: this.emptyUser
        });
        // this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    hideDeleteUsersDialog() {
        this.setState({ deleteUsersDialog: false });
    }

    deleteSelectedUsers() {
        let users = this.state.users.filter(val => !this.state.selectedUsers.includes(val));
        this.setState({
            users,
            deleteUsersDialog: false,
            selectedUsers: null
        });
        // this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    confirmDeleteSelected(User) {
        this.setState({ 
            deleteUsersDialog: true });
    }


       actionBodyTemplate(rowData) {
        return (
            <>
                <i class="fa fa-pencil-square-o pr-3" aria-hidden="true"  onClick={() => this.editUser(rowData)} />
                <i class="fa fa-trash-o" aria-hidden="true" onClick={() => this.confirmDeleteUser(rowData)} />
            </>
        );
    }
       render(){

        const paginatorLeft = <Button icon="pi pi-refresh"/>;
        const header = (
            <div className="table-header d-flex justify-content-between ">
                <div className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText onInput={(e) => this.setState({ globalFilter: e.target.value })}type="search" placeholder="Search..." />
                </div>
                <div className="">
                    <button className="btn btn-blue mr-2">Add User</button>
                    <button className="btn btn-border" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedUsers || !this.state.selectedUsers.length}>Delete</button>
                </div>
            </div>
        );
                {/* <Button label="Add User" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} /> */}
        // <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedUsers || !this.state.selectedUsers.length} />
        //         <h5 className="p-m-0">Manage Users</h5>
        //         <span className="p-input-icon-left">
        //             <i className="pi pi-search" />
        //             <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
        //         </span>
        //     </div>
        // );
        

        const deleteUserDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteUserDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteUser} />
            </>
        );


        const deleteUsersDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteUsersDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedUsers} />
            </>


    
        );

           return(
            <Fragment>
            <div className="content">
                {/*  Header */}
                <HeaderAll></HeaderAll>
                {/* Main Content on the page */}
                <div className="content_section main">
                    <div className="mt-3">
                        <h4>Manage Users</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                        <section className="white-middle-section mt-4">                               
                            <div>                                
               
               <DataTable ref={(el) => this.dt = el} value={this.state.users} selection={this.state.selectedUsers} onSelectionChange={(e) => this.setState({ selectedUsers: e.value })} paginator={true} 
       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" rows={5} rowsPerPageOptions={[2,4,6]}  removableSort={true} sortMode="multiple"
       globalFilter={this.state.globalFilter}
       header={header}>
                    

<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
<Column field="userName" header="Name" sortable></Column>
 <Column field="email" header="EmailId" sortable></Column>
                       
 <Column field="contactNumber" header="Contact"  sortable></Column>
                        
                       
<Column field="userRole" header="Role"  sortable></Column>
<Column header="Action" body={this.actionBodyTemplate}></Column>
                </DataTable>
           </div>

           <Dialog visible={this.state.deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={this.hideDeleteUserDialog}>
            <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.user && <span>Are you sure you want to delete <b>{this.state.user.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={this.hideDeleteUsersDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.user && <span>Are you sure you want to delete </span>}
                    </div>
                </Dialog>
           

                </section>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>  
            </Fragment>
        )
    }
}
    export default ManageUser