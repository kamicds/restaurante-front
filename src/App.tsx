import { AuthProvider } from './contexts/AuthContex';
import './index.css'
import { AppRoutes } from './routes/AppRoutes';

function App(){
  return(
<AuthProvider>
  <AppRoutes/>
</AuthProvider>
  );
}

export default App;