import Fretboard from './Fretboard';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const myTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App(): JSX.Element {
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <Fretboard key="fretboard" />
    </ThemeProvider>
  );
}

export default App;
