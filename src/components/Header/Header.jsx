import { Box, Grid, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import CustomButton from '../Button/CustomButton';

import SearchIcon from '@mui/icons-material/Search';

import { useDispatch } from 'react-redux';
import searchAction from '../store/actions/search';

const HeaderWrapper = styled.div`
    width: 100vw;
    height: 8vh;

    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    background-color: #DDD;

`
const HeaderTitle = styled.h1`
    font-family: Roboto;
`

const Header = ({ children, title }) => {

    const dispatch = useDispatch();

    return (
        <HeaderWrapper>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <HeaderTitle>{title}</HeaderTitle>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SearchIcon sx={{ mr: 1, my: 0.5 }} />
                    <TextField 
                        type="search" 
                        id="search-textfield" 
                        label="Encontrar" 
                        variant="standard" 
                        onChange={(e) => dispatch(searchAction.SearchTextUpdate(e.target.value))}
                    />
                </Box>
                <CustomButton
                    content="+ Tarefa"
                    to="/new_task"
                />
                <CustomButton
                    content="Ver Tarefas"
                    to="/"
                />
            </Grid>
        </HeaderWrapper>
    );
};

export default Header;