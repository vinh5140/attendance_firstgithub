import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getDatabase, ref, remove } from "firebase/database";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete } = props;
    const { room } = useContext(UserContext);
    const [id, setId] = useState("");

    const confirmDelete = (idStore) => {
        const db = getDatabase();
        remove(ref(db, room.Room + '/' + room.Subject + '/Student/' + idStore))
            .then(() => {
                handleClose();
                toast.success("Delete user succeed!")
            })
    }

    useEffect(() => {
        if (show) {
            setId(dataUserDelete.Id);
        }
    }, [show, dataUserDelete])

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        This action can't be undo!
                        Do you want delete this user?
                        <br />
                        <b>Name = {dataUserDelete.Name}?</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete(id)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalConfirm;