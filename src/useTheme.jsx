import { useContext } from 'react';
import { ThemeContext } from './Theme';

const useTheme = () => useContext(ThemeContext);

export default useTheme;