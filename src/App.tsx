import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from './components/Button/Button';


export function App() {

  return (
      <div>
        <h1>Hello!</h1>
        <Button 
        onClick={() => console.log("Button clicked!")}
        children = "Ok"
      />
      </div>
  );
}