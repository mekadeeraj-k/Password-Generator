import { useCallback, useEffect, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(0);
  const [numallowed, setNumAllowed] = useState(false);
  const [charallowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numallowed) str += "0123456789";
    if(charallowed) str += "!@#$%^&*()-_=+|[]{};:/?.>,";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numallowed, charallowed, setPassword]);

  useEffect(() =>  {
      PasswordGenerator()
  },[length, numallowed, charallowed, PasswordGenerator])

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Show "Copied!" for 2 seconds
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  return (

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-4 my-8 text-orange-500 bg-gray-700">
      
      <h5 className='text-4l text-white text-center py-4'>PasswordGenerator</h5>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
        type="text"
        value={password} 
        className = " flex outline-none w-full py-1 px-3"
        placeholder='Password'
        readOnly
        />
        <button 
        onClick={handleCopy}
        className=' flex outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>{copySuccess ? "Copied!" : "COPY"}
        </button>
      </div>

      <div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
          </div>
            <input 
            type="range"
            min = {6}
            max = {100}
            value = {length}
            className = 'flex cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
             />
             <label> length: {length}</label>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked= {numallowed} 
          id ="numberInput"
          onChange={()=> {
            setNumAllowed((prev) => !prev);
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked= {charallowed} 
          id ="characterInput"
          onChange={()=> {
            setCharAllowed((prev) => !prev);
          }}
          />
          <label htmlFor="characterInput">Character</label>
        </div>
        </div>
        </div>
      </div>
    </div>
  
  )
}

export default App
