import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface TaskFormProps {
    onAdd: (name: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
    const [taskName, setTaskName] = useState('');

    function handleSubmit(ev: React.FormEvent) {
        ev.preventDefault();
        const trimmedTaskName = taskName.trim();
        if (trimmedTaskName) {
            onAdd(trimmedTaskName);
            setTaskName('');
        } else {
            alert("Lütfen görev giriniz.");
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>+</Button>
            <TextField
                type="text"
                value={taskName}
                onChange={(ev) => setTaskName(ev.target.value)}
                placeholder="Yapılacakları giriniz"
                sx={{ flexGrow: 1 }}
            />
        </form>
    );
};

export default TaskForm;
