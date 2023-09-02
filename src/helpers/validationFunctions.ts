interface IValidity{
    name: string,
    value: string,
    validCondition: boolean,
    setMessage: (message: string) => void
}

export function emailValidation(inputValue: string){    
    const emailRegex = new RegExp('^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$')
    if (inputValue.match(emailRegex))
        return true
    else 
        return false 
}

export function passwordValidation(inputValue: string){
    if(inputValue.length >= 4 && inputValue.length < 60)
        return true
    else
        return false
}

export function checkValidity(
    elements: IValidity
  ) {
    elements.value === ""
      ? elements.setMessage(`${elements.name} is required`)
      : (elements.validCondition
      ? elements.setMessage(`Please, enter valid ${elements.name.toLowerCase()}`)
      : elements.setMessage(""));
  }

export function checkFormIsValid(errorMessagesArr: string[]){
    for (const message of errorMessagesArr) {
        if(message !== '')
            return false
    }
    return true
}