import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import { Navigate, Outlet } from "react-router-dom"
import Header from "./components/custom/Header"
import { Toaster } from "./components/ui/sonner"
import Footer from "./components/custom/Footer"

function App() {
  const {user, isLoaded, isSignedIn} = useUser()
  if(!isSignedIn && isLoaded){
    return <Navigate to={'/auth/sign-in'}/>
  }

  return (
    <div>
      <Header/>
      <Outlet />
      <Toaster/>
      <Footer/>
    </div>
  )
}

export default App
