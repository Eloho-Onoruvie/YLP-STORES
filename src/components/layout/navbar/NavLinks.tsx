import { NavLink } from "react-router-dom";
import { navLinks } from "../navbar/navbarData";


const NavLinks = () => {

    return(

        <ul>

            {navLinks.map((link)=>(

                <li key={link.path}>

                    <NavLink to={link.path}>
                        {link.title}
                    </NavLink>

                </li>

            ))}

        </ul>

    )

}


export default NavLinks;