import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/flip.css";

function AuthPage() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-[350px] h-[450px] perspective">
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Giriş Formu */}
          <div className="absolute w-full h-full backface-hidden">
            <LoginForm onFlip={() => setFlipped(true)} />
          </div>

          {/* Kayıt Formu */}
          <div className="absolute w-full h-full rotate-y-180 backface-hidden">
            <RegisterForm onFlip={() => setFlipped(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
