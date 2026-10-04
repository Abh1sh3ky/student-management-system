import React from "react";

const DeleteModal = ({ closeModal, confirmDelete }) => {
    return (
        <div className="modalOverlay">
            <div className="modalBox">

                <h2>Are you sure?</h2>

                <p>Are you sure you want to delete this student?</p>
                <p>This action cannot be undone.</p>

                <div className="modalButtons">
                    <button onClick={closeModal}>
                        Cancel
                    </button>

                    <button onClick={confirmDelete} style={{backgroundColor:"red"}}>
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}

export default DeleteModal;
