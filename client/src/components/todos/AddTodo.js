import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Axios from 'axios';

const AddTodo = ({ setActiveComponent, fetchTodo }) => {
    const [valueTitle, setValueTitle] = useState("");
    const [valueTags, setValueTags] = useState([]);
    const [valueCompleted, setValueCompleted] = useState("");

    const add = async () => {
        const addTask = { title: valueTitle, tags: valueTags.length > 0 ? valueTags : undefined, completed: valueCompleted };
        if (valueTitle === "") {
            alert("Title is required!");
            setActiveComponent("");
        } else {
            await Axios.post(`http://localhost:1234/api/todo/`, addTask);
            setActiveComponent("");
            await fetchTodo();
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Card title="Add Task" className="md:w-25rem">
                <div className="field">
                    <label style={{ display: "block", marginBottom: "5px" }}>Title:</label>
                    <InputText value={valueTitle} onChange={(e) => setValueTitle(e.target.value)} />
                </div>
                <div className="field">
                    <label style={{ display: "block", marginBottom: "5px" }}>Tags:</label>
                    <InputTextarea value={valueTags.join(',')} onChange={(e) => {
                        const tagsArray = e.target.value.split(',').map(tag => tag.trim());
                        setValueTags(tagsArray);
                    }} rows={3} cols={30} />
                </div>
                <div className="field">
                    <label style={{ display: "block", marginBottom: "5px" }}>Completed?</label>
                    <InputText value={valueCompleted} onChange={(e) => setValueCompleted(e.target.value)} />
                </div>
                <Button onClick={add} label="Save" icon="pi pi-check" />
                <Button onClick={() => setActiveComponent("")} label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
            </Card>
        </div>
    );
};

export default AddTodo;
