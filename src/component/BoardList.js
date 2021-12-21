import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardList = () => {
    const navigate = useNavigate();

    const [srchSubject, setSrchSubject] = useState('');
    const [boardList, setBoardList] = useState();

    const [page, setPage] = useState(1);
    const [countPerPage, setCountPerPage] = useState(5);
    const [pageList, setPageList] = useState();

    const getList = () => {
        fetch(`${process.env.REACT_APP_API_URL}/board?page=${page}&countPerPage=${countPerPage}&srchSubject=${srchSubject}`).then(res => {
            res.json().then(json => {
                var _pageList = [];
                for (var i = 1; i <= Math.ceil(json.totalCount / countPerPage); i++) {
                    _pageList.push(i);
                }
                setPageList(_pageList);
                setBoardList(json.list);
            });
        });
    };

    useEffect(() => {
        getList();
    }, [page, countPerPage]);

    return (
        <>
            <div className="field is-grouped is-grouped-right">
                <p className="control">
                    <input className="input" type="text" placeholder="Text input" value={srchSubject} onChange={(e) => { setSrchSubject(e.target.value) }} />
                </p>
                <p className="control">
                    <button className="button is-secondary" onClick={getList}>검색</button>
                </p>
            </div>
            <div className="field is-grouped is-grouped-right">
                <p className="control">
                    <button className="button is-primary" onClick={() => { navigate('/board'); }}>등록</button>
                </p>
            </div>
            <table className="table is-bordered is-hoverable is-fullwidth">
                <colgroup>
                    <col width="10%" />
                    <col width="*" />
                    <col width="15%" />
                    <col width="20%" />
                </colgroup>
                <thead>
                    <tr className="is-selected">
                        <th>No</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList && boardList.length > 0 ? boardList.map(value => (
                        <tr key={value.id} style={{ cursor: "pointer" }} onClick={() => { navigate(`/board/${value.id}`); }}>
                            <td>{value.no}</td>
                            <td>{value.subject}</td>
                            <td>{value.writer}</td>
                            <td>{value.date}</td>
                        </tr>
                    ))
                        :
                        <tr><td colSpan={999}>데이터가 없습니다.</td></tr>
                    }
                </tbody>
            </table>

            <div style={{ width: '50%', margin: '0 auto' }}>
                {pageList && pageList.length > 0 && (
                    <nav className="pagination is-centered is-small" role="navigation" aria-label="pagination" style={{ 'marginTop': '20px' }}>
                        <a className="pagination-previous" onClick={() => { setPage((page <= 1 ? 1 : page - 1)) }}>이전</a>
                        <a className="pagination-next" onClick={() => { setPage((page >= pageList[pageList.length - 1] ? page : page + 1)) }}>다음</a>
                        <ul className="pagination-list">
                            {pageList.map((value, index) => (
                                <li key={index}><a className={'pagination-link' + (value === page ? ' is-current' : '')} aria-label={`Goto page ${value}`} aria-current={value === page && 'page'} onClick={() => { setPage(value); }}>{value}</a></li>
                            ))}
                        </ul>
                    </nav>
                )
                }
            </div>
        </>
    );
}

export default BoardList;