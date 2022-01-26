import React from 'react';
import styled from 'styled-components';

const NotFoundPage = styled.div`
    width: calc(100vw -);
    height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;

    background: var(--primary);
    color: var(--gray);
`

const NotFound = () => {
    return (
        <NotFoundPage>
            Error 404 :(
        </NotFoundPage>
    );
};

export default NotFound;