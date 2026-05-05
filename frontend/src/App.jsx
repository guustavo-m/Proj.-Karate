import Control from "./control/Control";
import Display from "./display/Display";
import './App.css'

function App() {
  const path = window.location.pathname;

  if (path === "/control") return <Control />;
  if (path === "/display") return <Display />;

  return <h1>Use /control ou /display</h1>;
}

export default App;