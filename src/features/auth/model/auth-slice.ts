import {Inputs} from "@/features/auth/lib/schemas"
import {authApi} from "@/features/auth/api/authApi.ts"
import {setAppStatusAC} from "@/app/app-slice.ts"
import {ResultCode} from "@/common/enums"
import {createAppSlice, handleServerAppError} from "@/common/utils"

export const authSlice = createAppSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn
    },
    reducers: (create) => ({
        loginTC: create.asyncThunk(
            async (data: Inputs, { dispatch, rejectWithValue }) =>  {
                try {
                    dispatch(setAppStatusAC({ status: "loading" }))
                    const res = await authApi.login(data)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({ status: "succeeded" }))
                        return { isLoggedIn: true }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error){
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                }}
        )
    })
})

export const {selectIsLoggedIn} = authSlice.selectors
export const {loginTC} = authSlice.actions
export const authReducer = authSlice.reducer