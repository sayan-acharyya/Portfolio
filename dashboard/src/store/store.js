import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice.js";
import messagesReducer from "./slices/messagesSlice.js";
import timelineReducer from "./slices/timeline.js";
import skillReducer from "./slices/skillSlice.js"
import softwareApplicationsReducer from "./slices/softwareApplications.js"
import projectReducer from "./slices/projectSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        forgotPassword: forgotResetPasswordReducer,
        messages: messagesReducer,
        timeline: timelineReducer,
        skill: skillReducer,
        softwareApplications:softwareApplicationsReducer,
        project:projectReducer,

    }
})
























