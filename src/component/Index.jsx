import { Link } from "react-router-dom"

export default () => {
    return (
        <div>
            <div><Link to="/boardList">Board list sample</Link></div>
            <div><Link to="/mainBannerList">Main banner list</Link></div>
            <div><Link to="/mainReviewList">Main review list</Link></div>
            <div><Link to="/mainProductList">Main product list</Link></div>
        </div>
    )
}