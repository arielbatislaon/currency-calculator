import React,{useReducer} from 'react'
import "App.css";
import ConverterForm from './components/converter-form'
import { DISPATCH_ACTION } from './config';

const ErrorFallback = ({ error }) => {
  return (
    <div role="alert">
      <p>Error Encountered !</p>
      <pre>{error.message}</pre>
    </div>
  );
};


const reducer = (state, action) => {
	switch (action.type) {
		case DISPATCH_ACTION.DISPLAY_ERROR:
			return {error: action.payload}
		default:
			return state
	}
}

export const CurrencyCalculatorContext = React.createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, {})
  return (
   
    <div className="app">
       <CurrencyCalculatorContext.Provider
			value={{ calculatorState: state, calculatorDispatch: dispatch}}
		   >
      <header className="app-header">
        Currency Calculator
      </header>
      <ConverterForm/>
      {state.error && <ErrorFallback error={state.error}/>}
      </CurrencyCalculatorContext.Provider>
    </div>
   
  );
}

export default App;
