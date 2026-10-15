import { configureStore } from "@reduxjs/toolkit";

import reducer from "./authSlice";


var store = configureStore({
    reducer: {
        auth: reducer
    }
})

export default store;