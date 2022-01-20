import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Container(props) {
    return (
        <Box sx={{ minWidth: 275 }} style={{marginTop: '8px'}}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.quantity == 1 ? props.quantity + " tarefa" : props.quantity + " tarefas"}
                    </Typography>
                    {props.children}
                </CardContent>
                <CardActions>
                    
                </CardActions>
            </Card>
        </Box>
    );
}
