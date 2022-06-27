import NavBar from './NavBar';
import { renderWithProviders } from '../../utils/test';

describe('NavBar', () => {
  const defaultProps = {
    links: [
      { text: 'Link1', href: '/link1' },
      { text: 'Link2', href: '/link2' },
      { text: 'Link3', href: '/link3' },
    ],
  };

  it.each(defaultProps.links.map((l) => l.text))(
    'should render NavBar %s',
    (text) => {
      const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);
      expect(getByText(text)).toBeInTheDocument();
    }
  );

  it.each(defaultProps.links)(
    'should render an `href` attribute for each link',
    ({ text, href }) => {
      const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);
      expect(getByText(text)).toHaveAttribute('href');
      expect(getByText(text).getAttribute('href')).toBe(href);
    }
  );
});
