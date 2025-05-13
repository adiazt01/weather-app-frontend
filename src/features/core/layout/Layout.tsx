import { Outlet } from "react-router"
import { FloatingMenu } from "../components/float-menu/FloatMenu"

export const Layout = () => {
    return (
        <>
            <Outlet />
            <FloatingMenu />
            <div
                className="absolute -z-10 inset-0 h-full w-full bg-white bg-[radial-gradient(rgba(0,0,0,0.02)_16px,transparent_16px)] 
                [background-size:64px_64px]"
            ></div>
        </>
    )
}