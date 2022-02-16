import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MainBannerMod = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [obj, setObj] = useState();

    useEffect(() => {
        fetch(`/api/lush/mainBanner/${params.id}`).then(res => {
            res.json().then(json => {
                setObj(json);
            });
        });
    }, []);

    const save = () => {
        fetch(`/api/lush/mainBanner/${params.id}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(obj)
        }).then(res => {
            res.json().then(json => {
                alert(json.message);
            });
        });
    }

    const del = () => {
        if (window.confirm('Delete?')) {
            fetch(`/api/lush/mainBanner/${params.id}`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(res => {
                res.json().then(json => {
                    alert(json.message);
                    navigate('/mainBannerList');
                });
            });
        }
    }

    return (
        obj ?
            <>
                <h2 className="subtitle">Main Banner</h2>
                <div className="field" >
                    <label className="label">id</label>
                    <div className="control">
                        {obj.id}
                    </div>
                </div>
                <div className="field">
                    <label className="label">이름</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" value={obj.name} onChange={(e) => { setObj({ ...obj, name: e.target.value }) }} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">썸네일 URL</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" value={obj.thumb_url} onChange={(e) => { setObj({ ...obj, thumb_url: e.target.value }) }} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">URL</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" value={obj.url} onChange={(e) => { setObj({ ...obj, url: e.target.value }) }} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">writer</label>
                    <div className="control">
                        {obj.reg_id}
                    </div>
                </div>
                <div className="field">
                    <label className="label">date</label>
                    <div className="control">
                        {obj.reg_date}
                    </div>
                </div>
                <div className="field is-pulled-left">
                    <p className="control">
                        <button className="button has-background-danger-dark has-text-white" onClick={del}>삭제</button>
                    </p>
                </div>
                <div className="field is-pulled-right is-grouped is-grouped-right">
                    <p className="control">
                        <button className="button is-primary" onClick={save}>저장</button>
                    </p>
                    <p className="control">
                        <button className="button is-secondary" onClick={() => { navigate('/mainBannerList'); }}>목록</button>
                    </p>
                </div>
            </>
            :
            <><h2 className="subtitle">Main Banner</h2></>
    )
}

export default MainBannerMod;