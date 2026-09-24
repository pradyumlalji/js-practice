"use client";

import React, { useRef, useState } from "react";

const AddOrDeleteForm = ({ onAddHandler }) => {
    const [formData, setFormData] = useState("");

    const taskSubmitHandler = (e) => {
        e.preventDefault();

        if (!formData.trim()) return;

        onAddHandler(formData);
        setFormData("");
    };

    return (
        <div className="bg-amber-100 p-2">
            <form onSubmit={taskSubmitHandler}>
                <input
                    className="border"
                    type="text"
                    value={formData}
                    onChange={(e) => {
                        setFormData(e.target.value);
                    }}
                />

                <button className="border ml-2 px-2 rounded-sm" type="submit">
                    +add
                </button>
            </form>
        </div>
    );
};

const TaskComponent = ({ task, deleteHandler, onStart, onTaskDragOver, onTaskDrop }) => {
    return (
        <div
            draggable={true}
            onDragStart={() => {
                onStart(task.id);
            }}
            onDragOver={(e) => {
                onTaskDragOver(e, task.id);
            }}
            onDrop={(e) => {
                onTaskDrop(e, task.id, task.status);
            }}
            className="cursor-pointer flex justify-between p-2 rounded-sm bg-green-100"
        >
            <p>{task.name}</p>

            <button onClick={() => deleteHandler(task.id)}>❌</button>
        </div>
    );
};

const DragAndDropTodo = () => {
    const [taskList, setTaskList] = useState([]);

    // Which task am I dragging?
    const draggedTaskRef = useRef(null);

    // Which task am I currently hovering over?
    const targetTaskRef = useRef(null);

    // Should I insert before or after the target?
    const positionRef = useRef(null);

    const onAddHandler = (taskName) => {
        const newTask = {
            id: Date.now(),
            name: taskName,
            status: "todo",
        };

        setTaskList((prev) => [...prev, newTask]);
    };

    const deleteHandler = (taskId) => {
        setTaskList((prev) => prev.filter((task) => task.id !== taskId));
    };

    // WHAT am I dragging?
    const onDragStartHandler = (taskId) => {
        draggedTaskRef.current = taskId;
    };

    // WHICH task am I hovering over?
    // BEFORE or AFTER that task?
    const onTaskDragOverHandler = (e, targetTaskId) => {
        e.preventDefault();

        targetTaskRef.current = targetTaskId;

        const rect = e.currentTarget.getBoundingClientRect();

        const middle = rect.top + rect.height / 2;

        if (e.clientY < middle) {
            positionRef.current = "before";
        } else {
            positionRef.current = "after";
        }
    };

    // Handle both:
    // 1. Moving between columns
    // 2. Reordering within the same column
    const onTaskDropHandler = (e, targetTaskId, targetStatus) => {
        e.preventDefault();

        const draggedTaskId = draggedTaskRef.current;
        const position = positionRef.current;

        if (!draggedTaskId) return;

        setTaskList((prev) => {
            // Find dragged task
            const draggedTask = prev.find((task) => task.id === draggedTaskId);

            if (!draggedTask) {
                return prev;
            }

            // Remove dragged task first
            const remainingTasks = prev.filter((task) => task.id !== draggedTaskId);

            // Find target task after removing dragged task
            const targetIndex = remainingTasks.findIndex((task) => task.id === targetTaskId);

            /*
             * If target task doesn't exist,
             * it means we are dropping somewhere
             * where there is no task.
             *
             * Put it at the end of the target column.
             */
            if (targetIndex === -1) {
                return [
                    ...remainingTasks,
                    {
                        ...draggedTask,
                        status: targetStatus,
                    },
                ];
            }

            // Calculate insertion position
            let insertIndex = targetIndex;

            if (position === "after") {
                insertIndex = targetIndex + 1;
            }

            // Update status
            const updatedTask = {
                ...draggedTask,
                status: targetStatus,
            };

            // Insert task
            remainingTasks.splice(insertIndex, 0, updatedTask);

            return remainingTasks;
        });

        // Cleanup refs
        draggedTaskRef.current = null;
        targetTaskRef.current = null;
        positionRef.current = null;
    };

    // Drop directly into column
    // Useful for empty columns / below the last task
    const onColumnDropHandler = (e, status) => {
        e.preventDefault();

        const draggedTaskId = draggedTaskRef.current;

        if (!draggedTaskId) return;

        setTaskList((prev) => {
            const draggedTask = prev.find((task) => task.id === draggedTaskId);

            if (!draggedTask) {
                return prev;
            }

            const remainingTasks = prev.filter((task) => task.id !== draggedTaskId);

            return [
                ...remainingTasks,
                {
                    ...draggedTask,
                    status,
                },
            ];
        });

        // Cleanup
        draggedTaskRef.current = null;
        targetTaskRef.current = null;
        positionRef.current = null;
    };

    const renderColumn = (status, title) => {
        const tasks = taskList.filter((task) => task.status === status);

        return (
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                }}
                onDrop={(e) => {
                    onColumnDropHandler(e, status);
                }}
                className="border p-4 min-h-[300px]"
            >
                <p className="text-center text-2xl font-bold">{title}</p>

                <div className="flex flex-col gap-2 my-4">
                    {tasks.map((task) => (
                        <TaskComponent
                            key={task.id}
                            task={task}
                            deleteHandler={deleteHandler}
                            onStart={onDragStartHandler}
                            onTaskDragOver={onTaskDragOverHandler}
                            onTaskDrop={onTaskDropHandler}
                        />
                    ))}
                </div>

                {status === "todo" && <AddOrDeleteForm onAddHandler={onAddHandler} />}
            </div>
        );
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-10">
            {renderColumn("todo", "Todo")}
            {renderColumn("pending", "Pending")}
            {renderColumn("complete", "Complete")}
        </div>
    );
};

export default DragAndDropTodo;
