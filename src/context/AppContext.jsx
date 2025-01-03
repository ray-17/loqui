import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { interval } from "date-fns";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const navigate = useNavigate();
    const [userdata, setuserdata] = useState(null);
    const [chatData, setchatData] = useState(null);
    const [messagesId, setMessagesId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatUser, setChatUser] = useState(null);

    const loaduserdata = async (uid) =>{
        try {
            const userReference = doc(db,'users',uid);
            const userSnapshot = await getDoc(userReference);
            const userdata = userSnapshot.data();
            setuserdata(userdata);
            if(userdata.avatar && userdata.name){
                navigate('/chat');
            }else{
                navigate('/profile');
            }
            await updateDoc(userReference,{
                lastSeen:Date.now()
            })
            setInterval(async () =>{
                if(auth.chatUser){
                    await updateDoc(userReference,{
                        lastSeen:Date.now()
                    })
                }
            }, 60000)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if(userdata){
            const chatReference = doc(db, 'chats', userdata.id);
            const unSub = onSnapshot (chatReference, async (response)=>{
                const chatItem = response.data().chatData;
                const tempData = [];
                for(const item of chatItem){
                    const userReference = doc(db, 'users', item.receiverId)
                    const userSnap = await getDoc(userReference);
                    const userdata = userSnap.data();

                    tempData.push({...item, userdata})
                }
                setchatData(tempData.sort((a,b)=> b.updatedAt - a.updatedAt))
            })
            return ()=> {
                unSub();
            }
        }
    }, [userdata])

    const value = {
        userdata,setuserdata,
        chatData,setchatData,
        loaduserdata,
        messages,setMessages,
        messagesId,setMessagesId,
        chatUser,setChatUser
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider   