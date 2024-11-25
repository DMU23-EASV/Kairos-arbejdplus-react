import './App.css'
//import PhoneScreen from "./PhoneScreen.tsx";
//import LoginComp from "./Components/LoginComp.tsx"

import TimeComp from "./Components/TimeComp.tsx";



function App() {

    return (
        <div>
            <table>
                <tbody>
                    <TimeComp title={"Tid Start"}/>
                    <TimeComp title={"Tid Slut"}/>
                </tbody>
            </table>
        </div>

   

);
}

export default App;

