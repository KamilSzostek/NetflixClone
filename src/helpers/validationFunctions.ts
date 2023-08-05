export function emailValidation(inputValue: string){
    const emailRegex = new RegExp('^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$')
    if (inputValue.match(emailRegex))
        return true
    else 
        return false 
}

export function passwordValidation(inputValue: string){
    if(inputValue.length < 4 || inputValue.length > 60)
        return true
    else
        return false
}