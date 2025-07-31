import "./App.css";
import { useState } from "react";//use to manage user input and feedback messages
import axios from "axios";//use to make https req to backend

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username, 
        password
      });
      setMessage(res.data.message);//login succesfull
      setIsSuccess(true);
    } catch(err) {
      setMessage(
        err.response?.data?.message || `${err}`
      );
      setIsSuccess(false);
    }
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
    setMessage("");
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-3 m-0">
        <form onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Login
          </h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            className="w-full p-2 mb-4 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            className="w-full p-2 mb-4 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input type="checkbox"
                className="accent-blue-600"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forget password</a>
          </div>

          {message && (
            <div className={`text-sm text-center  mb-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}>{message}</div>
          )}
          <div className="flex ">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition m-3"
              type="submit"
            >Login
            </button>
            {<button
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition m-3"
              type="button"
              onClick={handleClear}
            >Clear
            </button>}
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
