import ReactDOM from "react-dom/client";
import GlobalStyle from "./styles/global";
import { store } from "./store/store";
import { Provider } from "react-redux";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
