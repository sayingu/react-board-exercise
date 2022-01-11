import { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import BoardList from "./component/BoardList";
import BoardMod from "./component/BoardMod";
import BoardReg from "./component/BoardReg";
import Index from "./component/Index";
import MainBannerList from "./component/MainBannerList";
import MainBannerReg from "./component/MainBannerReg";
import MainBannerMod from "./component/MainBannerMod";
import MainReviewList from "./component/MainReviewList";
import MainReviewReg from "./component/MainReviewReg";
import MainReviewMod from "./component/MainReviewMod";
import MainProductList from "./component/MainProductList";
import MainProductReg from "./component/MainProductReg";
import MainProductMod from "./component/MainProductMod";

const App = () => {
    useEffect(() => {
    }, []);

    return (
        <main className="container">
            <h1 className="title"><Link to="/">React board exercise</Link></h1>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/boardList" element={<BoardList />} />
                <Route path="/board/:id" element={<BoardMod />} />
                <Route path="/board" element={<BoardReg />} />
                <Route path="/mainBannerList" element={<MainBannerList />} />
                <Route path="/mainBanner" element={<MainBannerReg />} />
                <Route path="/mainBanner/:id" element={<MainBannerMod />} />
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