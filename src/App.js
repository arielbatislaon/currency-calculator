import React from "react";
import "App.css";
import ConverterForm from './components/converter-form'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        Currency Calculator
      </header>
      <ConverterForm/>
    </div>
  );
}

export default App;
