import { useState } from "react"
import { InputText } from "primereact/inputtext"
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import Axios from 'axios'

const AddUser = ({ fetchUsers, setActiveComponent }) => {
    const [valueName, setValueName] = useState("");
    const [valueUsername, setValueUsername] = useState("");
    const [valueEmail, setValueEmail] = useState("");
    const [valueAddress, setValueAddress] = useState("");
    const [valuePhone, setValuePhone] = useState("");

    const add = async () => {
        const updatedUser = { name: valueName, username: valueUsername, email: valueEmail, address: valueAddress, phone: valuePhone };
        if (valueName === "" || valueUsername === "" || valueEmail === "" || valueAddress === "") {
            alert("missing some detailes!!!")
            setActiveComponent("");
        }
        else {
            const { data } = await Axios.post(`http://localhost:1234/api/user/`, updatedUser);
            setActiveComponent("");
            await fetchUsers()
        }
    }

    return (
        <div className="card flex justify-content-center">
            <Card title="Add User" className="md:w-25rem">
                <div className="field">
                    <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
                    <InputText value={valueName} onChange={(e) => setValueName(e.target.value)} />
                </div>
                <div className="field">
                    <label style={{ display: "block", marginBottom: "5px" }}>Username:</label>
                    <InputText value={valueUsername} onChange={(e) => setValueUsername(e.target.value)} />
                </div>
                <div className="field">
                    <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
                    <InputText value={valueEmail} onChange={(e) => setValueEmail(e.target.value)} />
                </div>
                <div className="field">
                    <label style={{ display: "block", marginBottom: "5px" }}>Address:</label>
                    <InputText value={valueAddress} onChange={(e) => setValueAddress(e.target.value)} />
                </div>
                <div className="field">
                    <label style={{ display: "block", marginBottom: "5px" }}>Phone:</label>
                    <InputText value={valuePhone} onChange={(e) => setValuePhone(e.target.value)} />
                </div>
                <Button onClick={add} label="Save" icon="pi pi-check" />
                <Button onClick={() => setActiveComponent("")} label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
            </Card>
        </div>
    );
}

export default AddUser
