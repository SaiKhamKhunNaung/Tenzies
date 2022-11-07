import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

    export default function App() {

        const [dice, setDice] = React.useState(allNewDice())

        const [tenzies, setTenzies] = React.useState(false)
        
        const [counter, setCounter] = React.useState(0)
        
        //check all box is held, value is same and make the game win
        React.useEffect(() => {
            const allHeld = dice.every(die => die.isHeld)
            const firstValue = dice[0].value
            const allSameValue = dice.every(die => die.value === firstValue)
            if (allHeld && allSameValue) {
                setTenzies(true)
                console.log("You Won")
            }
            return () => {
                //cleanup
            };
        }, [dice]);

        //generating an array of random number for dice
        function generateNewDice() {
            return {
                 value: Math.floor((Math.random() * 6) + 1),
                 isHeld: false,
                 id: nanoid()
            }
        }

        //looping an array of random number and adding it to DICE state
        function allNewDice() {
            const newDice = []
            for (let i = 0; i< 10; i++){
                newDice.push(generateNewDice())
            }
            return newDice
        }

        //create newArray of Dice when button clicked
        function rollDice() {
            if (!tenzies) {
               setDice(oldDice => oldDice.map(die => {
                   return die.isHeld ? die : generateNewDice()
               }))
               setCounter(prevCounter => prevCounter + 1)
            } else {
                setTenzies(false)
                setDice(allNewDice())
               
            }
        }

        //change isHeld value by getting id from die component
        function holdDice(id) {
            setDice(oldDice => oldDice.map(die => {
                return die.id === id ? {...die,isHeld: !die.isHeld} :die
            }))
        }
        
        //give DIE COMPONENT props
        const diceElements = dice.map(die =>
            <Die
                key={die.id}
                holdDice={()=>holdDice(die.id)}
                value={die.value} 
                isHeld={die.isHeld}
            />)

    return (
        <main>
            
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <div className="container-ins"><p className="instructions">Roll until all dice are the same.Click each die to freeze it at its current value between rolls.</p></div>
            
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll" }</button>
            <p>You have clicked the button {counter} times.</p>
            
        </main>
    )
}