import { describe, expect, it } from 'vitest';
import { render, screen } from 'test-utils';
import App from 'pages/Home';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    screen.debug();
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
});
