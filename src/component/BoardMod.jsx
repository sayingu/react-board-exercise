import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BoardMod = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [board, setBoard] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/board/${params.id}`).then(res => {
            res.json().then(json => {
                setBoard(json);
            });
        });
    }, []);

    const save = () => {
        fetch(`${process.env.REACT_APP_API_URL}/board/${params.id}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(board)
        }).then(res => {
            res.json().then(json => {
                alert(json.message);
            });
        });
    }

    const del = () => {
        if (window.confirm('Delete?')) {
            fetch(`${process.env.REACT_APP_API_URL}/board/${params.id}`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(board)
            }).then(res => {
                res.json().then(json => {
                    alert(json.message);
                    navigate('/boardList');
                });
            });
        }
    }

    return (
        board ?
            <>
                <div className="field" >
                    <label className="label">id</label>
                    <div className="control">
                        {board.id}
                    </div>
                </div>
                <div className="field">
                    <label className="label">subject</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" value={board.subject} onChange={(e) => { setBoard({ ...board, subject: e.target.value }) }} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">content (with ckeditor)</label>
                    <div className="control">
                        <CKEditor
                            editor={ClassicEditor}
                            className="textarea"
                            data={board.content}
                            onChange={(event, editor) => {
                                setBoard({ ...board, content: editor.getData() });
                            }}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">content (no editor)</label>
                    <div className="control" dangerouslySetInnerHTML={{ __html: board.content }}>
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
                        <button className="button is-secondary" onClick={() => { navigate('/boardList'); }}>목록</button>
                    </p>
                </div>
            </>
            :
            <></>
    )
}

export default BoardMod;