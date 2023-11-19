import Table from 'react-bootstrap/Table';
import { ref, onValue, off, getDatabase, set } from "firebase/database";
import { database } from './Firebase';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _, { debounce } from "lodash";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './Content.scss';

const Content = (props) => {

    const { room } = useContext(UserContext);
    const [listUsers, setListUsers] = useState([]);
    const [dataExport, setDataExport] = useState([]);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    useEffect(() => {
        const dbRef = ref(database, room.Room + '/' + room.Subject + '/Student');
        const fetchData = (snapshot) => {
            if (snapshot.exists()) {
                const dataArray = Object.values(snapshot.val());
                setListUsers(dataArray);
            } else {
                setListUsers([]);
            }
        };
        onValue(dbRef, fetchData);
        return () => {
            off(dbRef, 'value', fetchData);
        };
    }, [room]);

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }

    const handleDeleteUser = (user) => {
        setDataUserDelete(user);
        setIsShowModalDelete(true);
    }

    const handleSort = (sortBy, sortField) => {
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUsers(cloneListUser);
    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUser = _.cloneDeep(listUsers);
            cloneListUser = cloneListUser.filter(item => item.Name.includes(term))
            setListUsers(cloneListUser);
        } else {
            const dbRef = ref(database, room.Room + '/' + room.Subject + '/Student');
            const fetchData = (snapshot) => {
                if (snapshot.exists()) {
                    const clonedData = _.cloneDeep(snapshot.val());
                    const dataArray = Object.values(clonedData);
                    setListUsers(dataArray);
                }
            };
            onValue(dbRef, fetchData);
        }
    }, 500)

    const getUserExport = (_, done) => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(["Name", "Id", "CheckIn", "CheckOut", "Status"]);
            listUsers.forEach(item => {
                let arr = [];
                arr[0] = item.Name;
                arr[1] = item.Id;
                arr[2] = item.CheckIn;
                arr[3] = item.CheckOut;
                arr[4] = item.Status;
                result.push(arr);
            })
            setDataExport(result);
            done();
        }
    }

    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("Only accept csv file...");
                return;
            }
            Papa.parse(file, {
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 2) {
                            if (rawCSV[0][0] !== "Name" || rawCSV[0][1] !== "Id") {
                                toast.error("Wrong format header CSV file...");
                            } else {
                                const db = getDatabase();
                                rawCSV.forEach((item, index) => {
                                    if (index > 0 && item.length === 2) {
                                        let obj = {};
                                        obj.Name = item[0];
                                        obj.Id = item[1];
                                        set(ref(db, room.Room + '/' + room.Subject + '/Student/' + obj.Id), {
                                            Name: obj.Name,
                                            Id: obj.Id,
                                            CheckIn: "00:00",
                                            CheckOut: "00:00",
                                            Status: "none"
                                        });
                                    }
                                })
                            }
                        } else {
                            toast.error("Wrong format CSV file...");
                        }
                    } else {
                        toast.error("Don't found data on CSV file...");
                    }
                }
            });
        }

    }

    return (
        <>
            <div className='my-3 add-new d-sm-flex'>
                <span><b>List Users:</b><h5 style={{ opacity: '0.5' }}>{room.Room} <i className="fa-solid fa-arrow-right"></i> {room.Subject}</h5></span>
                <div className='group-btns '>
                    <label htmlFor='upload' className='btn btn-warning'>
                        <i className="fa-solid fa-file-import"></i> Import
                    </label>
                    <input id='upload' type='file' hidden onChange={(event) => handleImportCSV(event)} />
                    <CSVLink
                        filename={"attendance_download.csv"}
                        className='btn btn-info'
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={getUserExport}
                    ><i className="fa-solid fa-file-export"></i> Export</CSVLink>
                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>
                        <i className="fa-solid fa-circle-plus"></i> Add user
                    </button>
                </div>
            </div>
            <div className='col-12 col-sm-4 my-3'>
                <input
                    className='form-control'
                    placeholder='Search user by name'
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <div className='customize-table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <div className='sort-header'>
                                    <span>Name</span>
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <i className="fa-solid fa-arrow-down" onClick={() => handleSort("desc", "Name")}></i>
                                        <i className="fa-solid fa-arrow-up" onClick={() => handleSort("asc", "Name")}></i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Id</span>
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <i className="fa-solid fa-arrow-down" onClick={() => handleSort("desc", "Id")}></i>
                                        <i className="fa-solid fa-arrow-up" onClick={() => handleSort("asc", "Id")}></i>
                                    </span>
                                </div>
                            </th>
                            <th>CheckIn</th>
                            <th>CheckOut</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers && listUsers.length > 0 ? (
                            listUsers.map((item, index) => (
                                <tr key={`user-${index}`}>
                                    <td className='align-middle'>{item.Name}</td>
                                    <td className='align-middle'>{item.Id}</td>
                                    <td className='text-success align-middle'>{item.CheckIn}</td>
                                    <td className='text-success align-middle'>{item.CheckOut}</td>
                                    <td className={item.Status === 'none' ? 'text-danger align-middle' : 'text-success align-middle'}>{item.Status}</td>
                                    <td style={{ display: 'flex', border: 'none' }}>
                                        <button
                                            className='btn btn-warning mx-2'
                                            onClick={() => handleEditUser(item)}
                                        >Edit</button>
                                        <button
                                            className='btn btn-danger mx-2'
                                            onClick={() => handleDeleteUser(item)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">None</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
            />

            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
            />

            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
            />
        </>
    )
}
export default Content;