import { Button, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../../components/Container/Container';
import Task from '../../components/Task/Task';

const Home = () => {
    const tasks = useSelector(state => state.tasks);

    function isOpen(item){
        return item.status === 'open';
    }

    function isDone(item){
        return item.status === 'done';
    }

    var openTasks = tasks.filter(isOpen);
    var doneTasks = tasks.filter(isDone);

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
                            >
                            </Task>
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