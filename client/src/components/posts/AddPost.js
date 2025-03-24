import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Axios from 'axios'

const AddPost = ({ setActiveComponent, fetchPost }) => {
    const [valueTitle, setValueTitle] = useState("");
    const [valueBody, setValueBody] = useState("");

    const add = async () => {
        const updatedPost = { title: valueTitle, body: valueBody };
        if (valueTitle === "" || valueBody === "") {
            alert("title and body are required!!!")
            setActiveComponent("");
        }
        else {
            const res = await Axios.post(`http://localhost:1234/api/post/`, updatedPost);
            setActiveComponent("");
            await fetchPost()
        }
    }
    return (
        <div className="card flex justify-content-center">
            <Card title="Add Post" className="md:w-25rem">
                <div className="field">
                    <label style={{ display: "block", marginBottom: "5px" }}>Title:</label>
                    <InputText value={valueTitle} onChange={(e) => setValueTitle(e.target.value)} />
                </div>
                <div className="field">
                    <label>Body:</label>
                    <InputTextarea value={valueBody} onChange={(e) => setValueBody(e.target.value)} rows={5} cols={30} />
                </div>
                <Button onClick={add} label="Save" icon="pi pi-check" />
                <Button onClick={() => setActiveComponent("")} label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
            </Card>
        </div>
    );
}

export default AddPost;