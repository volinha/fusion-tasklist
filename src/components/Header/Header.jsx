import { Box, Grid, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import CustomButton from '../Button/CustomButton';

import SearchIcon from '@mui/icons-material/Search';

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
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="search-textfield" label="Encontrar" variant="standard" />
                </Box>
                <CustomButton
                    content="+ Tarefa"
                />
            </Grid>
        </HeaderWrapper>
    );
};

export default Header;