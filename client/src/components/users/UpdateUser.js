import { useState } from "react";
import { InputText } from "primereact/inputtext"
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import Axios from 'axios'

const UpdateUser = ({ fetchUsers, user, setActiveComponent }) => {

    const [valueName, setValueName] = useState(user.name || "");
    const [valueUsername, setValueUsername] = useState(user.username || "");
    const [valueEmail, setValueEmail] = useState(user.email || "");
    const [valueAddress, setValueAddress] = useState(user.address || "");
    const [valuePhone, setValuePhone] = useState(user.phone || "");

    const update = async () => {
        const updatedUser = { name: valueName, username: valueUsername, email: valueEmail, address: valueAddress, phone: valuePhone };
        const data = await Axios.put(`http://localhost:1234/api/user/${user._id}`, updatedUser);
        setActiveComponent("");
        await fetchUsers()
    }

    return (<>
        <div className="card flex justify-content-center">
            <Card title={user.name} className="md:w-25rem">
                <div className="card flex justify-content-center" >
                    <InputText value={valueName} onChange={(e) => setValueName(e.target.value)} />
                </div>
                <div className="card flex justify-content-center">
                    <InputText value={valueUsername} onChange={(e) => setValueUsername(e.target.value)} />
                </div>
                <div className="card flex justify-content-center">
                    <InputText value={valueEmail} onChange={(e) => setValueEmail(e.target.value)} />
                </div>
                <div className="card flex justify-content-center">
                    <InputText value={valueAddress} onChange={(e) => setValueAddress(e.target.value)} />
                </div>
                <div className="card flex justify-content-center">
                    <InputText value={valuePhone} onChange={(e) => setValuePhone(e.target.value)} />
                </div>
                <Button onClick={update} label="Save" icon="pi pi-check" />
                <Button onClick={() => setActiveComponent("")} label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
            </Card>
        </div>
    </>)
}

export default UpdateUser;