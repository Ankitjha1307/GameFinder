import React from 'react'
import {useRoutes} from "../utils/routes"
function Signup() {
const {login} = useRoutes();
  return (
    <div className="hero bg-[#2F323A] min-h-screen">
        <div>
            <div className="text-center bg-base-100 lg:text-center rounded-lg p-2">
            <h1 className="text-6xl font-bold text-pink-500">Register</h1>
            <p className="py-6 text-yellow-500">
              Enter your credentials
            </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <fieldset className="fieldset">
                <label className="label text-yellow-500">Email</label>
                <input type="email" className="input" placeholder="Email" />
                <label className="label text-yellow-500">Password</label>
                <input type="password" className="input" placeholder="Password" />
                <label className="label text-yellow-500">Confirm Password</label>
                <input type="password" className="input" placeholder="Confirm Password" />
                <button className="btn btn-secondary hover:bg-white hover:text-pink-500 m-2" onClick={login}>Signup</button>
                </fieldset>
            </div>
            </div>
        </div>
</div>
  )
}

export default Signup