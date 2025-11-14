import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

function Nopagefound(){
    const routers = useNavigate()
    const homeFun = () => {
        routers('/home')
    }
    return(
     <Fragment>
        <h1>Oops your requested page is not found!</h1>
        <button className="btn"  style={{backgroundColor:"#090909ff",color:"white"}} onClick={ () => homeFun() }>Home</button>
     </Fragment>
    );
}
export default Nopagefound;
