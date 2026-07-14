import { useState, useRef } from "react";

export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);
  const push = (msg) => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2200);
  };
  return { toasts, push };
}
