
import { useState } from 'react'
import './App.css'
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './characteres'

function App() {
  
  const [password, setPassword] = useState('')
  const [passwordLenght, setPasswordLenght] = useState(20) 
  const [IncluideUppercase, setIncludeUppercase] = useState(false)
  const [IncluideLowercase, setIncludeLowercase] = useState(false)
  const [IncluideNumbers, setIncludeNumbers] = useState(false)
  const [IncluideSymbols, setIncludeSymbols] = useState(false)


  const handleGeneratePassword = (e) => {
    if (
      !IncluideUppercase &&
      !IncluideLowercase &&
      !IncluideNumbers &&
      !IncluideSymbols
    ) {
      notify('You must Select atleast one option', true)
    }
    let characterList = ''

    if (IncluideLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (IncluideUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (IncluideNumbers) {
      characterList = characterList + numbers
    }

    if (IncluideSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLenght; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Nothing To Copy', true)
    } else {
      copyToClipboard()
      alert('COPY SUCCESS!')
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator_header">
            Password Generator
          </h2>
          <div className="generator_password">
            <h3>{password}</h3>
            <button  onClick={handleCopyPassword} className="copy_btn">
              <i className='far fa-clipboard'></i>
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="password-strenght">Password Lenght</label>
            <input defaultValue={passwordLenght} onChange={(e) => setPasswordLenght (e.target.value)} type="number" id='password'  name='password' max={20} min={10}/>
          </div>

          <div className="form-group">
            <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
            <input checked={IncluideUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} type="checkbox" id='Uppercase'  name='Uppercase'/>
          </div>

          <div className="form-group">
            <label htmlFor="lower-letters">Include Lowercase Letters</label>
            <input checked={IncluideLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} type="checkbox" id='Lowercase'  name='Lowercase'/>
          </div>

          <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input checked={IncluideNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} type="checkbox" id='include-numbers'  name='include-numbers'/>
          </div>

          <div className="form-group">
            <label htmlFor="include-sybols">Include Sybols</label>
            <input checked={IncluideSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} type="checkbox" id='include-sybols'  name='include-sybols'/>
          </div>

          <button onClick={handleGeneratePassword} className="generator_btn">Generate Password</button>
        </div>
      </div>
    </div>
  )
}

export default App
