import { findByText, render, screen } from '@testing-library/react';
import Container from './Container';

const title = "title";

test('should render container with a title', async () => {
    render(<Container title={title}/>)

    const containerElement = await screen.findByText(title);

    expect(containerElement).toBeInTheDocument();
})