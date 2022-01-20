import { Button, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../../components/Container/Container';
import Task from '../../components/Task/Task';

const Home = () => {
    const tasks = useSelector(state => state.tasks.taskList);
    const searchValue = useSelector(state => state.search.value);

    const filteredTasks = !!searchValue ? 
    tasks.filter(task => {
        return  task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                task.status.toLowerCase().includes(searchValue.toLowerCase()) ||
                task.priority.toLowerCase().includes(searchValue.toLowerCase());
    })
    : tasks;

    var openTasks = filteredTasks.filter(item => {
        return item.status === 'open';
    });

    var doneTasks = filteredTasks.filter(item => {
        return item.status === 'done';
    });

    return (
        <div>
            <Grid 
            container 
            spacing={12} 
            columns={12}
            justifyContent="center"
            direction="row"
            >
            <Grid item xs={5}>
                <Container 
                    title="Abertas"
                    quantity={openTasks.length}
                >
                    {openTasks.map(item => {
                        return(
                            <Task
                                key={item.id}
                                task={item}
                            />
                        )
                    })}
                </Container>
            </Grid>
            <Grid item xs={5}>
                <Container 
                    title="Concluídas"
                    quantity={doneTasks.length}
                >
                    {doneTasks.map(item => {
                        return(
                            <Task
                                key={item.id}
                                task={item}
                                done
                            > 
                            {item.title}
                            </Task>
                        )
                    })}
                </Container>
            </Grid>
            </Grid>
        </div>
    );
};

export default Home;