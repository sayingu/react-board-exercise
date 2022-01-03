import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardList = () => {
    const navigate = useNavigate();

    const [srchSubject, setSrchSubject] = useState('');
    const [srchWriter, setSrchWriter] = useState('');
    const [srchDateFrom, setSrchDateFrom] = useState('');
    const [srchDateTo, setSrchDateTo] = useState('');
    const [boardList, setBoardList] = useState();

    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState();
    const [countPerPage, setCountPerPage] = useState(5);
    const totalPage = useRef();
    const pagePerBoard = useRef(2);

    const getList = () => {
        fetch(`${process.env.REACT_APP_API_URL}/board?page=${page}&countPerPage=${countPerPage}&srchSubject=${srchSubject}&srchWriter=${srchWriter}&srchDateFrom=${srchDateFrom}&srchDateTo=${srchDateTo}`).then(res => {
            res.json().then(json => {
                totalPage.current = Math.ceil(json.totalCount / countPerPage);
                var _pageList = [];
                for (var i = 1; i <= totalPage.current; i++) {
                    _pageList.push(i);
                    if (i % pagePerBoard.current === 0) {
                        if (_pageList.includes(page)) {
                            break;
                        } else {
                            _pageList = [];
                        }
                    }
                }
                setPageList(_pageList);
                setBoardList(json.list);
            });
        });
    };

    useEffect(() => {
        const calendars = window.bulmaCalendar.attach('[type="date"]');
        calendars.forEach(calendar => {
            calendar.on('select', date => {
                var srchDate = date.data.value().split(' - ');
                setSrchDateFrom(srchDate[0]);
                setSrchDateTo(srchDate[1]);
            });
            calendar.on('clear', () => {
                setSrchDateFrom('');
                setSrchDateTo('');
            });
        });
    }, []);

    useEffect(() => {
        getList();
    }, [page, countPerPage]);

    return (
        <>
            <h1 className="subtitle">Board</h1>
            <div className="field is-grouped is-grouped-right">
                <p className="control">
                    <input type="date" data-is-range={true} data-date-format={"yyyy.MM.dd"} />
                </p>
                <p className="control">
                    <input className="input" type="text" placeholder="Text input" value={srchSubject} onChange={(e) => { setSrchSubject(e.target.value) }} />
                </p>
                <p className="control">
                    <div className="select">
                        <select value={srchWriter} onChange={(e) => { setSrchWriter(e.target.value) }}>
                            <option value="">전체</option>
                            <option value="정정화">정정화</option>
                            <option value="진상호">진상호</option>
                        </select>
                    </div>
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
                {pageList && pageList.length > 0 &&
                    <nav className="pagination is-centered is-small" role="navigation" aria-label="pagination" style={{ 'marginTop': '20px' }}>
                        <a className="pagination-previous" onClick={() => { setPage((page <= 1 ? 1 : page - 1)) }}>이전</a>
                        <ul className="pagination-list">
                            {pageList.map((value, index) => (
                                <li key={index}><a className={'pagination-link' + (value === page ? ' is-current' : '')} aria-label={`Goto page ${value}`} aria-current={value === page && 'page'} onClick={() => { setPage(value); }}>{value}</a></li>
                            ))}
                        </ul>
                        <a className="pagination-next" onClick={() => { setPage((page >= totalPage.current ? page : page + 1)) }}>다음</a>
                    </nav>
                }
            </div>
        </>
    );
}

export default BoardList;