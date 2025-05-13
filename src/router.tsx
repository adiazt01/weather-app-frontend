import { BrowserRouter, Route, Routes } from "react-router"
import { WeatherPage } from "./features/weather/pages/WeatherPage"
import { Layout } from "./features/core/layout/Layout"
export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index path="/*" element={<WeatherPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}