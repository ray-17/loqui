import React, { useContext, useEffect, useState } from 'react'
import './profile_update.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import upload from '../../lib/upload';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const Profile_Update = () => {

      const navigate = useNavigate();
      const [image, setImage] = useState(false);
      const [name, setName] = useState("");
      const [bio, setBio] = useState("");
      const [uid, setUid] = useState("");
      const [previousImage, setPreviousImage] = useState("");
      const {setuserdata} = useContext(AppContext);
      const profileUpdate = async (event) =>{
          event.preventDefault();
          try {
            
            if (!previousImage && image) {
              toast.error("Upload profile picture")              
            }
              const docReference = doc(db, 'users', uid);
              if (image) {
                const imageURL = await upload(image);
                setPreviousImage(imageURL);
                await updateDoc(docReference, {
                  avatar:imageURL,
                  bio:bio,
                  name:name
                })
              }
              else{
                await updateDoc(docReference, {
                  bio:bio,
                  name:name
                })
              }
            const snap = await getDoc(docReference);
            setuserdata(snap.data());
            navigate('/chat');
          } catch (error) {
            console.error(error);
            toast.error(error.message);
          }
      }


      useEffect (() => {
        onAuthStateChanged(auth, async (user)=>{
          if (user) {
            setUid(user.uid)
            const docReference = doc(db, "users", user.uid)
            const docSnapshot = await getDoc(docReference);
            if (docSnapshot.data().name) {
              setName(docSnapshot.data().name);
            }
            if (docSnapshot.data().bio) {
              setBio(docSnapshot.data().bio);
            }
            if (docSnapshot.data().avatar) {
              setPreviousImage(docSnapshot.data().avatar);
            }
          }
          else{
            navigate('/')
          }
        })

      }, [])
  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            <img src={image? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
            Upload Profile Image
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Your Name' required/>
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Write profile bio' required></textarea>
          <button type='submit'>Save</button>
        </form>
        <img className='profile-picture' src={image? URL.createObjectURL(image) : previousImage ? previousImage : assets.avatar_icon} alt="" />
      </div>
      </div>
  )
}

export default Profile_Update