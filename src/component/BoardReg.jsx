import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BoardReg = () => {
    const navigate = useNavigate();

    const [obj, setObj] = useState();

    useEffect(() => {
        var now = new Date();
        setObj({
            id: -1,
            no: -1,
            subject: '',
            content: '',
            writer: '정정화',
            date: `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`
        });
    }, []);

    const save = () => {
        fetch(`/api/board`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(obj)
        }).then(res => {
            res.json().then(json => {
                alert(json.message);
                navigate('/boardList');
            });
        });
    }

    return (
        obj ?
            <>
                <div className="field">
                    <label className="label">name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" value={obj.subject} onChange={(e) => { setObj({ ...obj, subject: e.target.value }) }} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">content</label>
                    <div className="control">
                        <CKEditor
                            editor={ClassicEditor}
                            className="textarea"
                            data={obj.content}
                            onChange={(event, editor) => {
                                setObj({ ...obj, content: editor.getData() });
                            }}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">writer</label>
                    <div className="control">
                        {obj.writer}
                    </div>
                </div>
                <div className="field">
                    <label className="label">date</label>
                    <div className="control">
                        {obj.date}
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
            <></>
    )
}

export default BoardReg;