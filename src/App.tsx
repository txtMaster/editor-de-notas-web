import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/home"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
