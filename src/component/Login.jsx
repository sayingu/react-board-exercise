import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default (props) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        userId: '',
        password: ''
    });

    const login = () => {
        fetch(`/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(user)
        }).then(res => {
            if (res.status == 200) {
                res.json().then(json => {
                    props.setToken(json.token);
                    props.setUsername(json.username);
                    window.alert('로그인 성공!');
                    navigate('/');
                });
            } else {
                window.alert('로그인 실패!');
            }
        }).catch(error => { console.error(error); });
    }

    return (
        <>
            <div className="field" >
                <label className="label">id</label>
                <div className="control">
                    <input className="input" type="text" placeholder="user id" value={user.userId} onChange={(e) => { setUser({ ...user, userId: e.target.value }) }} />
                </div>
            </div>
            <div className="field" >
                <label className="label">password</label>
                <div className="control">
                    <input className="input" type="text" placeholder="password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                </div>
            </div>
            <div className="field is-pulled-right is-grouped is-grouped-right">
                <p className="control">
                    <button className="button is-primary" onClick={login}>로그인</button>
                </p>
            </div>
        </>
    )
}