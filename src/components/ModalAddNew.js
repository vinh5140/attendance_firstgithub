import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getDatabase, ref, set } from "firebase/database";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const ModalAddNew = (props) => {

    const { show, handleClose } = props;
    const { room } = useContext(UserContext);
    const [name, setName] = useState("");
    const [id, setId] = useState("");

    const handleSaveUser = (idStore) => {
        const db = getDatabase();
        set(ref(db, room.Room + '/' + room.Subject + '/Student/' + idStore), {
            Name: name,
            Id: id,
            CheckIn: "00:00",
            CheckOut: "00:00",
            Status:"none"
        });
        handleClose();
        setName("");
        setId("");
        toast.success("A user is created succeed!")
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Id</label>
                            <input type="text" className="form-control" value={id} onChange={(event) => setId(event.target.value)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser(id)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalAddNew;