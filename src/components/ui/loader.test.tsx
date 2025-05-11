import { render, screen } from '@testing-library/react';
import { Loader } from './loader';

describe('Loader Component', () => {
  it('renders with default size', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('h-4 w-4'); // default size
  });

  it('renders with custom size', () => {
    render(<Loader size="lg" />);
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('h-8 w-8'); // large size
  });

  it('renders with custom className', () => {
    render(<Loader className="custom-class" />);
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('custom-class');
  });
}); 