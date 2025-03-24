import { useEffect, useState } from "react"
import Axios from "axios"
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import React from 'react';
import { classNames } from 'primereact/utils';
import UpdatePost from "./UpdatePost";
import AddPost from "./AddPost";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { Dialog } from 'primereact/dialog';


const AllPosts = () => {

    const [allPost, setAllPost] = useState([])
    const [Post, setPost] = useState(null)
    const [activeComponent, setActiveComponent] = useState("")
    const [visible, setVisible] = useState(false);
    const [selectedPostBody, setSelectedPostBody] = useState("")

    const fetchPost = async () => {
        const { data } = await Axios.get('http://localhost:1234/api/post');
        setAllPost(data)
    }

    const deletePost = async (id) => {
        const { data } = await Axios.delete(`http://localhost:1234/api/post/${id}`);
        fetchPost()
    }

    useEffect(() => {
        fetchPost()
    }, [])

    const itemTemplate = (post, index) => {
        return (
            <div className="col-12" key={post._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>

                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{post.title}</div>
                            <div className="card flex justify-content-center">
                                <Button
                                    label="Show content"
                                    icon="pi pi-angle-right"
                                    onClick={() => {
                                        setSelectedPostBody(post.body);
                                        setVisible(true);
                                    }}
                                />
                                <Dialog visible={visible} style={{ width: '50vw' }} modal={true} onHide={() => setVisible(false)}>
                                    <p className="mb-5">{selectedPostBody}</p>
                                </Dialog>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button onClick={() => deletePost(post._id)} icon="pi pi-trash" className="p-button-rounded" >delete</Button>
                            <Button onClick={() => {
                                setActiveComponent("update")
                                setPost(post)
                            }
                            } icon="pi pi-pencil" className="p-button-rounded">edit</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((post, index) => {
            return itemTemplate(post, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            {activeComponent === "update" ? (
                <UpdatePost activeComponent={activeComponent} setActiveComponent={setActiveComponent} Post={Post} fetchPost={fetchPost} />
            ) : activeComponent === "add" ? (
                <AddPost setActiveComponent={setActiveComponent} fetchPost={fetchPost} />
            ) : (
                <>
                    <Button onClick={() => setActiveComponent("add")} icon="pi pi-plus" className="p-button-rounded">add post</Button>
                    <div className="flex gap-3">
                        <IconField iconPosition="left">
                            <InputText placeholder="Search post by title" />
                        </IconField>
                    </div>
                    <DataView value={allPost} listTemplate={listTemplate} />
                </>
            )}
        </div>
    )
}

export default AllPosts;