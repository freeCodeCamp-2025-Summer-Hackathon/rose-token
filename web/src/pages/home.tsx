import Login from "./login";
import Map from ".";

export const Entry = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Login/Signup */}
        <div className="bg-gradient-to-br flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 w-1/2 px-8">
                <Login/>
            </div>
            <div className="relative w-1/2 opacity-75">
                <Map title="" description=""/>
            </div>
        </div>
    </div>
    )
};