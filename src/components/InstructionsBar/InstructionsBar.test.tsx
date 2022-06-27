import InstructionsBar from './InstructionsBar';
import { renderWithProviders } from '../../utils/test';
import userEvent from '@testing-library/user-event';

describe('InstructionsBar', () => {
  const defaultOnClick = jest.fn();

  const defaultProps = {
    onClick: defaultOnClick,
  };

  it('should render a "View challenges" button', () => {
    const { getByText } = renderWithProviders(<InstructionsBar {...defaultProps} />);
    expect(getByText('View challenges')).toBeInTheDocument();
  });

  it('should call the onClick prop when the button is clicked', () => {
    const clickElement = () => userEvent.click(getByText('View challenges'));
    const { getByText } = renderWithProviders(<InstructionsBar {...defaultProps} />);

    clickElement();
    expect(defaultOnClick.mock.calls).toHaveLength(1);
    clickElement();
    expect(defaultOnClick.mock.calls).toHaveLength(2);
    defaultOnClick.mockReset();
  });
});
