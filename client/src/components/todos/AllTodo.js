import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import Axios from 'axios'
import UpdateTodo from './UpdateTodo';
import AddTodo from './AddTodo';

const AllTodo = () => {
    const [allTask, setAllTask] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [activeComponent, setActiveComponent] = useState("")
    const [task, setTask] = useState()

    const fetchTodo = async () => {
        const { data } = await Axios.get('http://localhost:1234/api/todo')
        setAllTask(data)
    }

    const deleteTask = async (id) => {
        const { data } = await Axios.delete(`http://localhost:1234/api/todo/${id}`);
        fetchTodo()
    }

    useEffect(() => {
        fetchTodo()
    }, [])

    const updatecompleted = async (id) => {
        const { data } = await Axios.put(`http://localhost:1234/api/todo/updateComplete/${id}`);
        fetchTodo()
    }

    const listItem = (task, index) => {

        return (
            <div className="col-12" key={task.id}>
                <div className={classNames('flex flex-column p-4 gap-4 border-2 surface-border surface-card border-round shadow-md hover:shadow-lg transition-all duration-300', { 'border-top-1 surface-border': index !== 0 })}>
                    <div className="text-3xl font-semibold text-center text-gray-800 mb-4">{task.title}</div>
                    <div className="flex justify-center gap-3 mb-4">
                        {task.tags.length > 0 ? (
                            task.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500 text-sm">No tags</span>
                        )}
                    </div>
                    <div className="flex justify-center items-center mt-3">
                        <span className="font-semibold flex flex-col items-center gap-2">
                            {task.completed && <i className="pi pi-check text-green-500 text-lg"></i>}
                            {!task.completed && <i className="pi pi-times text-red-500 text-lg"></i>}
                            {task.completed ? "Completed" : "Not Completed"}
                        </span>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <Button onClick={() => { updatecompleted(task._id) }} icon="pi pi-check" className="p-button-rounded p-button-primary p-button-md w-full text-sm flex gap-2 justify-center items-center">change status</Button>
                        <Button onClick={() => {
                            setTask(task);
                            console.log(task);
                            setActiveComponent("update");
                        }} icon="pi pi-pencil" className="p-button-rounded p-button-primary p-button-md w-full text-sm flex gap-2 justify-center items-center">update</Button>
                        <Button onClick={() => { deleteTask(task._id) }} icon="pi pi-trash" className="p-button-rounded p-button-primary p-button-md w-full text-sm flex gap-2 justify-center items-center">delete</Button>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (task) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-3" key={task.id}>
                <div className="p-6 border-2 surface-border surface-card border-round shadow-md hover:shadow-lg transition-all duration-300 min-h-[300px]">
                    <div className="text-3xl font-semibold text-center text-gray-800 mb-4">{task.title}</div>
                    <div className="text-3xl font-semibold text-center text-gray-800 mb-4">
                        {task.tags.length > 0 ? (
                            task.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500 text-sm">No tags</span>
                        )}
                    </div>
                    <div className="flex justify-center items-center mt-3">
                        <span className="font-semibold flex flex-col items-center gap-2">
                            {task.completed && <i className="pi pi-check text-green-500 text-lg"></i>}
                            {!task.completed && <i className="pi pi-times text-green-500 text-lg"></i>}
                            {task.completed ? "Completed" : "Not Completed"}
                        </span>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <Button onClick={() => { updatecompleted(task._id) }} icon="pi pi-check" className="p-button-rounded p-button-primary p-button-md w-full text-sm flex gap-2 justify-center" > change status </Button>
                        <Button onClick={() => {
                            setTask(task);
                            setActiveComponent("update");
                        }} icon="pi pi-pencil" className="p-button-rounded p-button-primary p-button-md w-full text-sm flex gap-2 justify-center">update</Button>
                        <Button onClick={() => { deleteTask(task._id) }} icon="pi pi-trash" className="p-button-rounded p-button-primary p-button-md w-full text-sm flex gap-2 justify-center">delete</Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (task, layout, index) => {
        if (!task) {
            return;
        }

        if (layout === 'list') return listItem(task, index);
        else if (layout === 'grid') return gridItem(task);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            {activeComponent === "update" ? <UpdateTodo setActiveComponent={setActiveComponent} fetchTodo={fetchTodo} task={task} /> :
                activeComponent === "add" ? <AddTodo setActiveComponent={setActiveComponent} fetchTodo={fetchTodo} /> :
                    <>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button style={{ marginBottom: "5px", }} onClick={() => {
                                setActiveComponent("add");
                            }} icon="pi pi-plus" className="p-button-rounded">Add Task</Button>
                        </div>
                        <DataView value={allTask} itemTemplate={itemTemplate} layout={layout} header={header()} /></>}
        </div>
    )
}

export default AllTodo;