"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface ShowPasswordButtonProps {
  inputId: string; 
}

export default function ShowPasswordButton({
  inputId,
}: ShowPasswordButtonProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    const input = document.getElementById(inputId) as HTMLInputElement | null;
    if (input) {
      input.type = showPassword ? "password" : "text";
    }
    setShowPassword(!showPassword);
  };

  return (
    <button
      type="button"
      onClick={togglePassword}
      className="absolute right-3 text-slate-500 hover:text-slate-700"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
}
