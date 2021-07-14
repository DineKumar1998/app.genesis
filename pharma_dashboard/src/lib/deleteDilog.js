import React from "react";
import { Modal, ModalBody} from 'reactstrap';
import { ModalContext } from "./context";

const ConfirmDelete = () => {
    const btnStyle = { borderRadius: "300px" }
    return (
        <ModalContext.Consumer>
            {context => {
                if (context.showModal) {
                    return (
                        <Modal isOpen={context.showModal}  >
                            <ModalBody style={{ textAlign: "center" }}>
                                <i style={{ fontSize: "65px", color: "red" }} class="fas fa-exclamation-triangle"></i> <br />
                                <h4 style={{ paddingTop: "20px", fontWeight: "400" }}><b>Confirm Permanent Deletion</b></h4>   <br />
                                <p>
                                    Are you sure you want to delete the selected item permanently?
                                    Once deleted permanently. they cannot be recovered
                                </p>
                                <button style={btnStyle} onClick={() => context.deleteItem(context.id)} type="button" className="btn btn-danger">Delete</button>
                                <button style={btnStyle} onClick={context.toggleModal} className="btn btn-primary">Cancel</button>
                            </ModalBody>
                        </Modal>
                    );
                }
                return null;
            }}
        </ModalContext.Consumer>
    );
};

export default ConfirmDelete;