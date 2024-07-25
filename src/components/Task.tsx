import React, { useState } from 'react';
import { Checkbox, IconButton, ListItem, ListItemText, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskProps {
    id: number;
    name: string;
    done: boolean;
    onToggle: (id: number, done: boolean) => void;
    onTrash: (id: number) => void;
    onRename: (id: number, newName: string) => void;
}

const Task: React.FC<TaskProps> = ({ id, name, done, onToggle, onTrash, onRename }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState(name);

    return (
        <ListItem className={done ? 'done' : ''} disablePadding>
            <Checkbox checked={done} onChange={() => onToggle(id, !done)} />
            {!editMode ? (
                <ListItemText
                    primary={name}
                    onClick={() => setEditMode(true)}
                    style={{ cursor: 'pointer' }}
                />
            ) : (
                <form
                    onSubmit={(ev) => {
                        ev.preventDefault();
                        onRename(id, editedName);
                        setEditMode(false);
                    }}
                >
                    <TextField
                        type="text"
                        value={editedName}
                        onChange={(ev) => setEditedName(ev.target.value)}
                    />
                </form>
            )}
            <IconButton onClick={() => onTrash(id)} edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
};

export default Task;
