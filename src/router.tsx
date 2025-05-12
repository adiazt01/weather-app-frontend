import { BrowserRouter, Route, Routes } from "react-router"
import { WeatherPage } from "./features/weather/pages/WeatherPage"
export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route index path="/*" element={<WeatherPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}