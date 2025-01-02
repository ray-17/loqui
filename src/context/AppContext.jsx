import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { interval } from "date-fns";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const navigate = useNavigate();
    const [userdata, setuserdata] = useState(null);
    const [chatdata, setchatdata] = useState(null);

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
                if(auth.chatuser){
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
                    const userReference = doc(db, 'users', item.rId)
                    const userSnap = await getDoc(userReference);
                    const userData = userSnap.data();

                    tempData.push({...item, userData})
                }
                setchatdata(tempData.sort((a,b)=> b.updatedAt - a.updatedAt))
            })
            return ()=> {
                unSub();
            }
        }
    }, [userdata])

    const value = {
        userdata,setuserdata,
        chatdata,setchatdata,
        loaduserdata
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider   