import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BoardList from "./component/BoardList";
import BoardMod from "./component/BoardMod";
import BoardReg from "./component/BoardReg";

const App = () => {
    useEffect(() => {
    }, []);

    return (
        <main className="container">
            <h1 className="title">React board exercise</h1>
            <Routes>
                <Route path="/" element={<BoardList />} />
                <Route path="/board/:boardId" element={<BoardMod />} />
                <Route path="/board" element={<BoardReg />} />
            </Routes>
        </main>
    );
}

export default App;