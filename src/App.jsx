import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import BoardList from "./component/BoardList";
import BoardMod from "./component/BoardMod";
import BoardReg from "./component/BoardReg";
import Index from "./component/Index";
import Login from "./component/Login";
import MainBannerList from "./component/MainBannerList";
import MainBannerMod from "./component/MainBannerMod";
import MainBannerReg from "./component/MainBannerReg";
import MainProductList from "./component/MainProductList";
import MainProductMod from "./component/MainProductMod";
import MainProductReg from "./component/MainProductReg";
import MainReviewList from "./component/MainReviewList";
import MainReviewMod from "./component/MainReviewMod";
import MainReviewReg from "./component/MainReviewReg";
import PrivateRouter from "./router/PrivateRouter";

const App = () => {
    const [username, setUsername] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
    }, []);

    return (
        <main className="container">
            <h1 className="title"><Link to="/">React board exercise</Link></h1>
            {username ? (<h2>{username}님 환영합니다. <button onClick={() => { setToken(); setUsername(); }}>Logout</button></h2>) : <></>}
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
                <Route path="/boardList" element={<BoardList />} />
                <Route path="/board/:id" element={<BoardMod />} />
                <Route path="/board" element={<BoardReg />} />
                <Route path="/mainBannerList" element={<PrivateRouter token={token} setToken={setToken} setUsername={setUsername}><MainBannerList token={token} /></PrivateRouter>} />
                <Route path="/mainBanner" element={<MainBannerReg />} />
                <Route path="/mainBanner/:id" element={<PrivateRouter token={token} setToken={setToken} setUsername={setUsername}><MainBannerMod /></PrivateRouter>} />
                <Route path="/mainReviewList" element={<MainReviewList />} />
                <Route path="/mainReview" element={<MainReviewReg />} />
                <Route path="/mainReview/:id" element={<MainReviewMod />} />
                <Route path="/mainProductList" element={<MainProductList />} />
                <Route path="/mainProduct" element={<MainProductReg />} />
                <Route path="/mainProduct/:id" element={<MainProductMod />} />
            </Routes>
        </main>
    );
}

export default App;