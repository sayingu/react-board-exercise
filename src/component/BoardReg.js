import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Board = () => {
    const navigate = useNavigate();

    const [board, setBoard] = useState();

    useEffect(() => {
        var now = new Date();
        setBoard({
            id: -1,
            no: -1,
            subject: '',
            content: '',
            writer: '정정화',
            date: `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`
        });
    }, []);

    const save = () => {
        fetch(`${process.env.REACT_APP_API_URL}/board`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(board)
        }).then(res => {
            res.json().then(json => {
                alert(json.message);
                navigate('/');
            });
        });
    }

    return (
        board ?
            <>
                <div className="field">
                    <label className="label">subject</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" value={board.subject} onChange={(e) => { setBoard({ ...board, subject: e.target.value }) }} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">content</label>
                    <div className="control">
                        <textarea className="textarea" value={board.content} onChange={(e) => { setBoard({ ...board, content: e.target.value }) }} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">writer</label>
                    <div className="control">
                        {board.writer}
                    </div>
                </div>
                <div className="field">
                    <label className="label">date</label>
                    <div className="control">
                        {board.date}
                    </div>
                </div>
                <div className="field is-grouped is-grouped-right">
                    <p className="control">
                        <button className="button is-primary" onClick={save}>저장</button>
                    </p>
                    <p className="control">
                        <button className="button is-secondary" onClick={() => { navigate('/'); }}>목록</button>
                    </p>
                </div>
            </>
            :
            <></>
    )
}

export default Board;