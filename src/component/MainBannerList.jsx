import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainBannerList = (props) => {
    const navigate = useNavigate();

    const [srchName, setSrchName] = useState('');
    const [srchWriter, setSrchWriter] = useState('');
    const [srchDateFrom, setSrchDateFrom] = useState('');
    const [srchDateTo, setSrchDateTo] = useState('');
    const [list, setList] = useState();

    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState();
    const [countPerPage, setCountPerPage] = useState(5);
    const totalPage = useRef();
    const pagePerBoard = useRef(2);

    const getList = () => {
        fetch(`/api/lush/mainBanner?page=${page}&countPerPage=${countPerPage}&srchName=${srchName}&srchWriter=${srchWriter}&srchDateFrom=${srchDateFrom}&srchDateTo=${srchDateTo}`,
            { headers: { 'Authorization': props.token } }
        ).then(res => {
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
                setList(json.list);
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
            <h2 className="subtitle">Main Banner</h2>

            <div className="columns">
                <div className="column is-one-third">
                    <div className="field">
                        <label className="label">?????????</label>
                        <p className="control">
                            <input type="date" data-is-range={true} data-date-format={"yyyy.MM.dd"} />
                        </p>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label">??????</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="Text input" value={srchName} onChange={(e) => { setSrchName(e.target.value) }} />
                        </p>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label">?????????</label>
                        <p className="control is-expanded">
                            <div className="select is-fullwidth">
                                <select value={srchWriter} onChange={(e) => { setSrchWriter(e.target.value) }}>
                                    <option value="">??????</option>
                                    <option value="?????????">?????????</option>
                                    <option value="?????????">?????????</option>
                                </select>
                            </div>
                        </p>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label">&nbsp;</label>
                        <p className="control is-pulled-right">
                            <button className="button is-secondary" onClick={getList}>??????</button>
                        </p>
                    </div>
                </div>
            </div>
            <div className="field is-grouped is-grouped-right">
                <p className="control">
                    <button className="button is-primary" onClick={() => { navigate('/mainBanner'); }}>??????</button>
                </p>
            </div>
            <table className="table is-bordered is-hoverable is-fullwidth" style={{ tableLayout: 'fixed' }}>
                <colgroup>
                    <col width="5%" />
                    <col width="*" />
                    <col width="30%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr className="is-selected">
                        <th>No</th>
                        <th>??????</th>
                        <th>????????? URL</th>
                        <th>URL</th>
                        <th>?????????</th>
                        <th>?????????</th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.length > 0 ? list.map(value => (
                        <tr key={value.id} className="is-clickable" onClick={() => { navigate(`/mainBanner/${value.id}`); }}>
                            <td>{value.no}</td>
                            <td>{value.name}</td>
                            <td style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{value.thumb_url}</td>
                            <td>{value.url}</td>
                            <td>{value.reg_id}</td>
                            <td>{value.reg_date}</td>
                        </tr>
                    ))
                        :
                        <tr><td colSpan={999}>???????????? ????????????.</td></tr>
                    }
                </tbody>
            </table>

            <div style={{ width: '50%', margin: '0 auto' }}>
                {pageList && pageList.length > 0 &&
                    <nav className="pagination is-centered is-small" role="navigation" aria-label="pagination" style={{ 'marginTop': '20px' }}>
                        <a className="pagination-previous" onClick={() => { setPage((page <= 1 ? 1 : page - 1)) }}>??????</a>
                        <ul className="pagination-list">
                            {pageList.map((value, index) => (
                                <li key={index}><a className={'pagination-link' + (value === page ? ' is-current' : '')} aria-label={`Goto page ${value}`} aria-current={value === page && 'page'} onClick={() => { setPage(value); }}>{value}</a></li>
                            ))}
                        </ul>
                        <a className="pagination-next" onClick={() => { setPage((page >= totalPage.current ? page : page + 1)) }}>??????</a>
                    </nav>
                }
            </div>
        </>
    );
}

export default MainBannerList;