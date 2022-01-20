import { render, screen } from '@testing-library/react';
import CustomButton from './CustomButton';

const text = 'test';

test('should render the button', () => {
    render(<CustomButton>{text}</CustomButton>);

    const buttonElement = screen.getByText(text);

    expect(buttonElement).toBeInTheDocument();

})