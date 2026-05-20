import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import { store } from "./stores/store";
import { fetchUser } from "./features/slices/authSlice";


async function init(){
  await store.dispatch(fetchUser());

  const root=ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
init();