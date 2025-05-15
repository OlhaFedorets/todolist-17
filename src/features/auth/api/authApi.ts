import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import { Inputs } from "@/features/auth/lib/schemas"

export const authApi = {
  login(payload: Inputs) {
    return instance.post<BaseResponse<{ userId: number, token: string }>>(`/auth/login`, payload)
  }
}


