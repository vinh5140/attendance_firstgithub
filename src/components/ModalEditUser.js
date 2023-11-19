import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getDatabase, ref, set, remove } from "firebase/database";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit} = props;
    const { room } = useContext(UserContext);
    const [name, setName] = useState("");
    const [idNew, setIdNew] = useState("");
    const [idOld, setIdOld] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [status, setStatus] = useState("");

    const handleEditUser = (name, idNew, idOld) => {
        const db = getDatabase();
        remove(ref(db, room.Room + '/' + room.Subject + '/Student/' + idOld));
        set(ref(db, room.Room + '/' + room.Subject + '/Student/' + idNew), {
            Name: name,
            Id: idNew,
            CheckIn: checkIn,
            CheckOut: checkOut,
            Status: status
        });
        handleClose();
        toast.success("Update user succeed!");
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.Name);
            setIdNew(dataUserEdit.Id);
            setIdOld(dataUserEdit.Id);
            setCheckIn(dataUserEdit.CheckIn);
            setCheckOut(dataUserEdit.CheckOut);
            setStatus(dataUserEdit.Status);
        }
    }, [show, dataUserEdit])

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Id</label>
                            <input type="text" className="form-control" value={idNew} onChange={(event) => setIdNew(event.target.value)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser(name, idNew, idOld)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalEditUser;