import Login from "../component/Login";

const PrivateRouter = (props) => {
    return (props.token ? (props.children ? props.children : <></>) : <Login setToken={props.setToken} setUsername={props.setUsername} />);
};
export default PrivateRouter;