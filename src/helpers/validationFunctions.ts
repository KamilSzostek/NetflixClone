interface IValidity {
  name: string;
  value: string;
  validCondition: boolean;
  setMessage: (message: string) => void;
}

export function emailValidation(inputValue: string) {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$"
  );
  if (inputValue.match(emailRegex)) return true;
  else return false;
}

export function passwordValidation(inputValue: string) {
  if (inputValue.length >= 4 && inputValue.length < 60) return true;
  else return false;
}

export function checkValidity(elements: IValidity) {
  if (elements.value === "") {
    elements.setMessage(`${elements.name} is required`);
    return false;
  } else if (elements.validCondition) {
    elements.setMessage("");
    return true;
  } else {
    elements.setMessage(`Please, enter valid ${elements.name.toLowerCase()}`);
    return false;
  }
}

