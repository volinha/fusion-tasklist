import { render, screen } from '@testing-library/react';
import Header from './Header';

const text = 'test';

test('should render the text, a searchbox and a button', () => {
    render(<Header>{text}</Header>)
    const titleElement = screen.getByText(text);
    expect(titleElement).toBeInTheDocument();
})