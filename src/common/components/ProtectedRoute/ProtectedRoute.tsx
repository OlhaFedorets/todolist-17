import {Navigate, Outlet} from "react-router";
import {ReactNode} from "react";
import {Path} from "@/common/routing";

type Props = {
    children?: ReactNode;
    isAllowed: boolean;
    redirctPath?: string;
}

export const ProtectedRoute = ({children, isAllowed, redirctPath = Path.Login}: Props) => {

    if (!isAllowed) {
        return <Navigate to={redirctPath} />
    }

    return children ? children : <Outlet/>
}