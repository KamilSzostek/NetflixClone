export function setCookie(name: string, value: string, days: number){
    const date = new Date()
    date.setTime(date.getTime() + (days*24*60*60*1000))
    const expires = `; expires= ${date.toUTCString()}`
    document.cookie = `${name}=${value}${expires}; path=/`
}

export function getCookie(name: string){
    if(document.cookie){
        const cookiesArr = document.cookie.split(';')
        const cookie = cookiesArr.find(cookie => cookie.substring(0, name.length) == name)
        return cookie;
    }
    else return null
}

export function eraseCookie(name: string) { 
    if(document){
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}