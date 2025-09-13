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
        />
    )
}