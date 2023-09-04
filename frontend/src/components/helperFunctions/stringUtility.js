export const capitalizedFirstLetter = (text) => {  // Pass string only
    if (text.length <= 1) return text
    return text.slice(0,1).toUpperCase() + text.slice(1, text.length);
} 

export const maxLetters = (text, maxChars) => {
    return text.length > maxChars ? text.substring(0, maxChars)+ "...." : text.substring(0, maxChars)
}