import { DATA_CONTACT } from "../Data/dataMook"

export const saveContactDatabase = (contactDataBase) => {
    const contactDataBaseJSON = JSON.stringify(contactDataBase)
    localStorage.setItem('contactDatabase', contactDataBaseJSON)
}
export const getContactDatabase = () =>{
     localStorage.clear('contactDatabase') 
    const contactDataBase = localStorage.getItem('contactDatabase')
    if(contactDataBase){
        return JSON.parse(contactDataBase)
    } else{
        saveContactDatabase(DATA_CONTACT)
        return DATA_CONTACT 
    }
}
export const updateContactDataBase = (newContact) =>{
    const contactDabaBaseList= getContactDatabase()
    contactDabaBaseList.push(newContact)
    saveContactDatabase(contactDabaBaseList)
}
export const contactLastMessage = (messageArray) => {
    const messageText = messageArray.map(message => message.text)
    return messageText[messageText.length - 1]
}
