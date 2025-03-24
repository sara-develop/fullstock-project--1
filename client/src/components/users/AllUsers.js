import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Axios from 'axios'
import React from 'react';
import UpdateUser from './UpdateUser';
import AddUser from './AddUser';

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([])
    const [activeComponent, setActiveComponent] = useState("")
    const [user, setUser] = useState("")

    const fetchUsers = async () => {
        const { data } = await Axios.get('http://localhost:1234/api/user')
        setAllUsers(data)
    }

    const deleteUser = async (id) => {
        const { data } = await Axios.delete(`http://localhost:1234/api/user/${id}`);
        fetchUsers()
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Users</span>
        </div>
    );

    const footer = `In total there are ${allUsers ? allUsers.length : 0} users.`;

    return (<>

        <div className="card">
            {activeComponent === "update" ? <UpdateUser fetchUsers={fetchUsers} user={user} setActiveComponent={setActiveComponent} /> :
                activeComponent === "add" ? <AddUser fetchUsers={fetchUsers} setActiveComponent={setActiveComponent} /> :
                    <>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button style={{marginBottom: "5px" }} onClick={() => setActiveComponent("add")} icon="pi pi-plus" className="p-button-rounded">add user</Button>
                        </div>
                        <DataTable value={allUsers} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                            <Column field="name" header="Name"></Column>
                            <Column field="username" header="User Name"></Column>
                            <Column field="email" header="Email Address" ></Column>
                            <Column field="address" header="Adress"></Column>
                            <Column field="phone" header="Phone Number"></Column>
                            <Column body={(rowData) => (
                                <div className="flex align-items-center gap-2">
                                    <Button onClick={() => deleteUser(rowData._id)} icon="pi pi-trash" className="p-button-rounded" />
                                    <Button onClick={() => {
                                        setActiveComponent("update")
                                        setUser(rowData)
                                    }
                                    } icon="pi pi-pencil" className="p-button-rounded" />
                                </div>
                            )} />
                        </DataTable>
                    </>}</div>
    </>);
}

export default AllUsers;