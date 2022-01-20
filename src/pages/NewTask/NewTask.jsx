import { Button, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import TagActions from '../../components/store/actions/tags';
import TaskActions from '../../components/store/actions/tasks';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';


const NewTask = () => {

    const dispatch = useDispatch();
    const tagsArray = useSelector(state => state.tags);
    const tasksArray = useSelector(state => state.tasks);

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [tag, setTag] = useState('');

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handlePriority = (e) => {
        setPriority(e.target.value);
    };

    function handleTag(e) {
        setTag(e.target.value);
    }

    function handleAddTag() {
        dispatch(TagActions.AddTagList(uuid(), tag));
        setTag('');
        document.getElementById('input-text-tag').focus();
    }

    function sendTask() {
        if (!title || !priority) return alert("preencha todos os campos")
        const task = {
            id: uuid(),
            title: title,
            status: 'open',
            priority: priority,
            createdAt: Date.now(),
            finishedAt: '',
            tags: tagsArray.tags,
            comments: '',
        }
        dispatch(TaskActions.AddTask(task));
    }

    return (
        <Grid container columns={12} direction="row" style={{ margin: '16px' }}>
            <Grid item xs={4}>
                <Grid
                    container
                    columns={12}
                    spacing={4}
                    direction="column"
                    onChange={handleTitle}
                    value={title}
                >
                    <Grid item xs={4}>
                        <TextField
                            id="titulo-tarefa"
                            label="Título"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="id-select-prioridade">Prioridade</InputLabel>
                            <Select
                                labelId="id-select-prioridade"
                                id="select-prioridade"
                                value={priority}
                                label="Age"
                                variant="standard"
                                onChange={handlePriority}
                            >
                                <MenuItem value={'normal'}>Normal</MenuItem>
                                <MenuItem value={'importante'}>Importante</MenuItem>
                                <MenuItem value={'urgente'}>Urgente</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl sx={{ width: '100%' }} variant="standard">
                            <InputLabel htmlFor="input-text-tag">Tag</InputLabel>
                            <Input
                                id="input-text-tag"
                                type="text"
                                label="Tag"
                                value={tag}
                                onChange={handleTag}
                                fullWidth
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="add tag to list"
                                            onClick={() => handleAddTag()}
                                        >
                                            <AddBoxIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={6}>
                            <h3 style={{ margin: '2px' }}>Lista de Tags:</h3> <Divider />
                            <List>
                                {tagsArray.tags.map((item, index) => {
                                    return (
                                        <ListItem key={item.id}>
                                            <ListItemText>
                                                {index + 1 + " - " + item.value} <Divider />
                                            </ListItemText>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete-tag"
                                                onClick={() => dispatch(TagActions.RemoveTagList(item.id))}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="outlined" onClick={() => sendTask()}>addtask</Button>
                        <Button variant="outlined" onClick={() => console.log(tasksArray)}>taskarray</Button>
                        <Button variant="outlined" onClick={() => console.log(tagsArray)}>tagsarray</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NewTask;