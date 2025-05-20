import {Main} from "@/app/Main"
import {PageNotFound} from "@/common/components"
import {Login} from "@/features/auth/ui/Login/Login"
import {Route, Routes} from "react-router"
import {ProtectedRoute} from "@/common/components/ProtectedRoute";
import {useAppSelector} from "@/common/hooks";
import {selectIsLoggedIn} from "@/features/auth/model/auth-slice.ts";

export const Path = {
    Main: "/",
    Login: "/login",
    FAQ: "/faq",
    NotFound: "*",
} as const

export const Routing = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    return (
        <Routes>
            <Route element={<ProtectedRoute isAllowed={isLoggedIn}/>}>
                <Route path={Path.Main} element={<Main/>}/>
                <Route path={Path.FAQ} element={<h2>FAQ</h2>}/>
            </Route>
            {/*<Route path={Path.Main} element={*/}
            {/*    <ProtectedRoute isAllowed={isLoggedIn}>*/}
            {/*        <Main />*/}
            {/*    </ProtectedRoute>*/}
            {/*} />*/}
            {/*<Route path={Path.FAQ} element={*/}
            {/*    <ProtectedRoute isAllowed={isLoggedIn}>*/}
            {/*        <h2>FAQ</h2>*/}
            {/*    </ProtectedRoute>*/}
            {/*} />*/}

            <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirctPath={Path.Main}/>}>
                <Route path={Path.Login} element={<Login/>}/>
            </Route>
            {/*<Route*/}
            {/*    path={Path.Login}*/}
            {/*    element={*/}
            {/*        <ProtectedRoute isAllowed={!isLoggedIn} redirctPath={Path.Main}>*/}
            {/*            <Login />*/}
            {/*        </ProtectedRoute>*/}
            {/*    }*/}
            {/*/>*/}

            <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    )
}
