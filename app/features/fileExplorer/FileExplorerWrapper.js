"use client";
import { useState } from "react";

const initialData = [
    {
        id: 1,
        name: "public",
        isFolder: true,
        children: [{ id: 2, name: "index.html", isFolder: false }],
    },
    {
        id: 3,
        name: "src",
        isFolder: true,
        children: [
            { id: 4, name: "App.js", isFolder: false },
            { id: 5, name: "index.js", isFolder: false },
            { id: 6, name: "utils.js", isFolder: false },
            {
                id: 7,
                name: "feature",
                isFolder: true,
                children: [
                    { id: 8, name: "Button.js", isFolder: false },
                    { id: 9, name: "Tab.js", isFolder: false },
                    { id: 10, name: "Accordion.js", isFolder: false },
                    {
                        id: 11,
                        name: "Types",
                        isFolder: true,
                        children: [
                            { id: 12, name: "ButtonTypes.js", isFolder: false },
                            { id: 13, name: "TabTypes.js", isFolder: false },
                            { id: 14, name: "AccordionTypes.js", isFolder: false },
                        ],
                    },
                ],
            },
        ],
    },
    { id: 15, name: "package.json", isFolder: false },
];

// ---- Hoisted OUTSIDE the parent so identities are stable across renders ----

const FileComponent = ({ fileDetails, handleDelete }) => (
    <div className="flex gap-2 mt-2">
        <p> 📑 {fileDetails.name}</p>
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleDelete(fileDetails);
            }}
            className=" px-2"
        >
            ❌
        </button>
    </div>
);

const FolderComponent = ({ children, fileDetails, handleAdd, handleDelete }) => {
    const [openDropdown, setOpenDropdown] = useState(true);
    return (
        <div className="mt-4">
            <div className="flex flex-col">
                <div className="flex gap-2">
                    <button onClick={() => setOpenDropdown(!openDropdown)}>
                        {openDropdown ? "🔼" : "🔽"}
                    </button>
                    <p>📁{fileDetails.name}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAdd(fileDetails, true);
                        }}
                        className="border px-2"
                    >
                        + 📁
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAdd(fileDetails, false);
                        }}
                        className="border px-2"
                    >
                        + 📑
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(fileDetails);
                        }}
                        className="border px-2"
                    >
                        ❌
                    </button>
                </div>
                {openDropdown && <div className="pl-8">{children}</div>}
            </div>
        </div>
    );
};

const TreeNode = ({ node, handleAdd, handleDelete }) => {
    if (!node.isFolder) {
        return <FileComponent fileDetails={node} handleDelete={handleDelete} />;
    }

    return (
        <FolderComponent handleAdd={handleAdd} handleDelete={handleDelete} fileDetails={node}>
            {node.children.map((child) => (
                <TreeNode
                    key={child.id}
                    node={child}
                    handleAdd={handleAdd}
                    handleDelete={handleDelete}
                />
            ))}
        </FolderComponent>
    );
};

const AddForm = ({ submitHandler }) => {
    const [fileOrFolderName, setFileOrFolderName] = useState("");

    return (
        <form
            className="mt-5 border p-4 rounded-md w-max"
            onSubmit={(e) => {
                e.preventDefault();
                if (!fileOrFolderName.trim()) return;
                submitHandler(fileOrFolderName);
                setFileOrFolderName("");
            }}
        >
            <p className="font-semibold text-md">New item to add</p>
            <label htmlFor="new-item-name">Item name</label>
            <div className="flex gap-2 mt-1">
                <input
                    id="new-item-name"
                    className="border w-max px-2"
                    type="text"
                    value={fileOrFolderName}
                    onChange={(e) => setFileOrFolderName(e.target.value)}
                />
                <button className="border px-2" type="submit">
                    submit
                </button>
            </div>
        </form>
    );
};

// ---- Main component ----

const FileExplorerWrapper = () => {
    const [rootMap, setRootMap] = useState(initialData);
    const [newItem, setNewItem] = useState({ parentId: "", isFolder: true });
    const [showForm, setShowForm] = useState(false);

    const addHandler = (parentId, fileOrFolderToAdd, root = rootMap) =>
        root.map((fileOrFolder) => {
            if (fileOrFolder.id === parentId && fileOrFolder.isFolder) {
                return { ...fileOrFolder, children: [...fileOrFolder.children, fileOrFolderToAdd] };
            } else if (fileOrFolder.children) {
                return {
                    ...fileOrFolder,
                    children: addHandler(parentId, fileOrFolderToAdd, fileOrFolder.children),
                };
            }
            return fileOrFolder;
        });

    const deleteHandler = (targetFileOrObject, root = rootMap) =>
        root
            .filter((fileOrFolder) => targetFileOrObject.id !== fileOrFolder.id)
            .map((childrenFileOrFolder) =>
                childrenFileOrFolder.isFolder
                    ? {
                          ...childrenFileOrFolder,
                          children: deleteHandler(
                              targetFileOrObject,
                              childrenFileOrFolder.children,
                          ),
                      }
                    : childrenFileOrFolder,
            );

    const handleDelete = (targetFileOrObject) => {
        setRootMap(deleteHandler(targetFileOrObject));
    };

    const handleAdd = (parentFolder, isFolder) => {
        setShowForm(true);
        setNewItem({ ...newItem, parentId: parentFolder.id, isFolder });
    };

    const submitHandleAdd = (fileOrFolderName) => {
        const fileOrFolderToAdd = {
            id: crypto.randomUUID(),
            name: fileOrFolderName,
            isFolder: newItem.isFolder,
            ...(newItem.isFolder ? { children: [] } : {}),
        };
        setRootMap(addHandler(newItem.parentId, fileOrFolderToAdd));
        setShowForm(false);
    };

    return (
        <div className="flex justify-between">
            <div>
                <h2 className="text-xl font-bold">File Explorer</h2>
                {rootMap.map((mapData) => (
                    <TreeNode
                        node={mapData}
                        key={mapData.id}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
            {showForm && <AddForm submitHandler={submitHandleAdd} />}
        </div>
    );
};

export default FileExplorerWrapper;
