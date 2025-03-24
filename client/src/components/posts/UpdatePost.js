import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Axios from 'axios'

const UpdatePost = ({ activeComponent, setActiveComponent, Post, fetchPost }) => {
    const [valueTitle, setValueTitle] = useState(Post.title || "");
    const [valueBody, setValueBody] = useState(Post.body || "");

    const update = async () => {
        const updatedPost = { title: valueTitle, body: valueBody };
        const { data } = await Axios.put(`http://localhost:1234/api/post/${Post._id}`, updatedPost);
        setActiveComponent("");
        await fetchPost()
    }

    return (
        <div className="card flex justify-content-center">
            <Card title={Post.title} className="md:w-25rem">
                <div className="card flex justify-content-center">
                    <InputText value={valueTitle} onChange={(e) => setValueTitle(e.target.value)} />
                </div>
                <div className="card flex justify-content-center">
                    <InputTextarea value={valueBody} onChange={(e) => setValueBody(e.target.value)} rows={10} cols={30} />
                </div>
                <Button onClick={update} label="Save" icon="pi pi-check" />
                <Button onClick={() => setActiveComponent("")} label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
            </Card>
        </div>
    )
}

export default UpdatePost;
