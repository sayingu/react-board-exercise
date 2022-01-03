import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BoardList from "./component/BoardList";
import BoardMod from "./component/BoardMod";
import BoardReg from "./component/BoardReg";
import Index from "./component/Index";
import MainBannerList from "./component/MainBannerList";
import MainBannerReg from "./component/MainBannerReg";
import MainBannerMod from "./component/MainBannerMod";

const App = () => {
    useEffect(() => {
    }, []);

    return (
        <main className="container">
            <h1 className="title">React board exercise</h1>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/boardList" element={<BoardList />} />
                <Route path="/board/:id" element={<BoardMod />} />
                <Route path="/board" element={<BoardReg />} />
                <Route path="/mainBannerList" element={<MainBannerList />} />
                <Route path="/mainBanner" element={<MainBannerReg />} />
                <Route path="/mainBanner/:id" element={<MainBannerMod />} />
            </Routes>
        </main>
    );
}

export default App;