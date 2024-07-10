import Fretboard from './Fretboard.js';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const myTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <Fretboard key="fretboard"/>
    </ThemeProvider>
  );
}

export default App;
