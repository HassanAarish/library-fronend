import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";

function App() {
  return (
    <>
      <Navbar title="Online Library" about="About Library" />
      <div className="container my-3">
        <TextForm heading="Enter The Text to Analyze Below" />
      </div>
    </>
  );
}

export default App;
