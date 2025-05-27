import s from "./App.module.css"
import {selectThemeMode} from "@/app/app-slice"
import {ErrorSnackbar, Header} from "@/common/components"
import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {Routing} from "@/common/routing"
import {getTheme} from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import {useEffect, useState} from "react";
import {meTC} from "@/features/auth/model/auth-slice.ts";
import {CircularProgress} from "@mui/material";

export const App = () => {

    const [isInit, setIsInit] = useState(false)

    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(meTC()).finally(() => {
            setIsInit(true)
        })
        dispatch(meTC()).unwrap().then(() => {
            setIsInit(true)
        })
    })

    if (!isInit) {
        return (<div className={s.circularProgressContainer}>
            <CircularProgress size={150} thickness={3}/>
        </div>)
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={s.app}>
                <CssBaseline/>
                <Header/>
                <Routing/>
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
}
