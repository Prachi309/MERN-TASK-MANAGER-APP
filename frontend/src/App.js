
import './App.css';
import TaskManager from './TaskManager';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';   
function App() {
  return (
  
    <div className="app">
    <div className="video-background">
      <video autoPlay loop muted>
        <source src="/3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <div className="App">
    <TaskManager/>
    </div>
  </div>
  );
}

export default App;
