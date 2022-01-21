import react from 'react';

import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import styled from 'styled-components';

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';

const Tags = styled.button`
    font-family: "Roboto", Helvetica;
    font-size: 14px;
    font-weight: 600;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    margin-top: 4px;
    padding: 2px 8px;

    background-color: #AAA;
    color: #333;

    border-radius: 15px;
    border: none;

    cursor: pointer;
`

const CardButtons = styled(Button)`
    width: 100%;
    margin: 4px -4px !important;

    font-family: "Roboto", Helvetica !important;
    letter-spacing: 1px !important;
`

export default function Task({ task, done }) {
    return (
        <Box style={{ marginTop: '8px' }}>
            <Card variant="outlined" >
                <Grid container columns={12}>
                    <Grid item xs={8}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {task.title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {task.priority}
                            </Typography>
                            {task.tags.map((item, index) => {
                                return (
                                    <Tags key={index}>
                                        <WarningIcon fontSize="small" />{item.value}
                                    </Tags>
                                )
                            })
                            }
                        </CardContent>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container direction="column" alignItems="flex-end" spacing={6} >
                            <Grid item>
                                <Button>
                                    {done ? <CommentIcon /> : <EditIcon />}
                                </Button>
                            </Grid>
                            <Grid item>
                                {done ?
                                    <CardButtons variant="contained" color="info"><CheckIcon />Finalizada</CardButtons>
                                    :
                                    <>
                                        <CardButtons variant="contained" color="success"><CheckIcon />Concluir</CardButtons>
                                        <CardButtons variant="contained" color="error"><DeleteIcon />Cancelar</CardButtons>
                                    </>
                                }

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <CardActions>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {done ?
                            "Finalizado em: " + new Date(task.finishedAt).toLocaleString()
                            :
                            "Criado em: " + new Date(task.createdAt).toLocaleString()
                        }
                    </Typography>
                </CardActions>
            </Card>
        </Box>
    );
}
