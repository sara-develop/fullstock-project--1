import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Axios from 'axios'

const UpdateTodo = ({ setActiveComponent, fetchTodo, task }) => {
    const [valueTitle, setValueTitle] = useState(task.title || "");
    const [valueTags, setValueTags] = useState(task.tags || []);
    const [valueCompleted, setValueCompleted] = useState(task.completed || false);

    const update = async () => {
        const updatedTask = { title: valueTitle, tags: valueTags.length > 0 ? valueTags : undefined, completed: valueCompleted };
        const { data } = await Axios.put(`http://localhost:1234/api/todo/${task._id}`, updatedTask);
        setActiveComponent("");
        await fetchTodo()
    }

    return (<>
        <div className="card flex justify-content-center">
            <Card title={task.title} className="md:w-25rem">
                <div className="card flex justify-content-center">
                    <InputText value={valueTitle} onChange={(e) => setValueTitle(e.target.value)} />
                </div>
                <div className="card flex justify-content-center">
                    <InputTextarea value={valueTags.join(',')} onChange={(e) => {
                        const tagsArray = e.target.value.split(',').map(tag => tag.trim());
                        setValueTags(tagsArray);
                    }} rows={10} cols={30} />
                </div>
                <div className="card flex justify-content-center">
                    <InputTextarea value={valueCompleted} onChange={(e) => setValueCompleted(e.target.value)} rows={10} cols={30} />
                </div>
                <Button onClick={update} label="Save" icon="pi pi-check" />
                <Button onClick={() => setActiveComponent("")} label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
            </Card>
        </div>
    </>)
}

export default UpdateTodo;