import { useState } from "react";

export default function SearchBar({ onSearch, placeholder }){
    const [input, setInput] = useState("")

    function handleKeyDown(e){
        if (e.key == "Enter" && input.trim() !== ""){
            onSearch(input)
            setInput("")
        }
    }

    return (
        <input 
            type = "text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="lex-1 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 
             focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        />
    )
}