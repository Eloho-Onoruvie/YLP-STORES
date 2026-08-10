import{

Routes,
Route

} from "react-router-dom"



import Home from "../pages/Home/Home"

import About from "../pages/About/About"

import Shop from "../pages/Shop/Shop"



const AppRoutes = ()=>{

    return(

        <Routes>

            <Route path="/"
            element={<Home/>}
            />


            <Route path="/shop"
            element={<Shop/>}
            />


            <Route path="/about"
            element={<About/>}
            />

        </Routes>

    )

}


export default AppRoutes;