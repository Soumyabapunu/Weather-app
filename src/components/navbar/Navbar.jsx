import {nav,demo} from "./navbar.module.css"
const Navbar =()=>{
    return(
        <div>
            <nav className={`${nav}${demo}`}>
             <h1></h1>
            </nav>
            <h2 id={demo}></h2>
        </div>
    )
}
export default Navbar