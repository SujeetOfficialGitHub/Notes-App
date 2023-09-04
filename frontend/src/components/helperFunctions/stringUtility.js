export const capitalizedFirstLetter = (data) => {  // Pass string only
    if (data.length <= 1) return data
    return data.slice(0,1).toUpperCase() + data.slice(1, data.length);
} 