import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainBannerReg = () => {
    const navigate = useNavigate();

    const [obj, setObj] = useState();

    useEffect(() => {
        var now = new Date();
        setObj({
            id: -1,
            name: '',
            thumb_url: '',
            url: '',
            reg_id: '정정화',
            reg_date: `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`
        });
    }, []);

    const save = () => {
        fetch(`/api/lush/mainBanner`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(obj)
        }).then(res => {
            res.json().then(json => {
                alert(json.message);
                navigate('/mainBannerList');
            });
        });
    }

    return (
        obj ?
            <>
                <h2 className="subtitle">Main Banner</h2>
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
                <div className="field is-grouped is-grouped-right">
                    <p className="control">
                        <button className="button is-primary" onClick={save}>저장</button>
                    </p>
                    <p className="control">
                        <button className="button is-secondary" onClick={() => { navigate('/boardList'); }}>목록</button>
                    </p>
                </div>
            </>
            :
            <><h2 className="subtitle">Main Banner</h2></>
    )
}

export default MainBannerReg;