import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PolicyDraft {
  policyNumber?: string;
  customerName?: string;
  email?: string;
  vehicleType?: string;
  vehicleYear?: number;
  premiumAmount?: number;
  status?: "active" | "pending" | "expired";
}

const initialState: PolicyDraft = {};

const policySlice = createSlice({
    name: 'policy',
    initialState,
    reducers: {
        saveDraft(state, action: PayloadAction<PolicyDraft>) {
            return {...state, ...action.payload};
        },
        clearDraft() {
            return initialState;
        }
    }
})

export const {saveDraft, clearDraft} = policySlice.actions;
export default policySlice.reducer;