import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Popup from '../components/Popup';
import AuthContext from '../utils/AuthContext';
import ConfirmPopup from '../components/ConfirmPopup';

const MyProfile = () => {
    let { username } = useParams();
    let [newUsername, setNewUsername] = useState("");
    let [newEmail, setNewEmail] = useState("");
    let [profilePicture, setProfilePicture] = useState(null);
    let [profilePictureURL, setProfilePictureURL] = useState("");
    let [message, setMessage] = useState("");
    let [message2, setMessage2] = useState(null)
    let token = JSON.parse(localStorage.getItem("authTokens")).access;
    let {logoutUser} = useContext(AuthContext)
    let getMyProfile = async () => {
        try {
            let response = await fetch(`/api/${username}/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let data = await response.json();
            setNewUsername(data.username);
            setNewEmail(data.email);
            setProfilePictureURL(data.profile?.profile_picture || '/media/profile_pictures/default.jpg');
        } catch (error) {
            console.log(error);
        }
    };

    let updateMyProfile = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('username', newUsername);
        formData.append('email', newEmail);
        if (profilePicture) {
            formData.append('profile_picture', profilePicture);
        }

        try {
            let response = await fetch(`/api/${username}/update/`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            let data = await response.json();
            console.log(data);
            if (response.status === 200) {
                setMessage("Credentials updated successfully");
                getMyProfile();
            } else {
                setMessage(data.detail || "Error updating profile");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        setMessage2("Are you sure you want to Logout?")
    }

    const confirmLogout = () => {
        logoutUser();
        setMessage2(null);
    }

    const cancelLogout = () => {
        setMessage2(null);
    }
    useEffect(() => {
        getMyProfile();
    }, []);

    return (
        <div className=' flex flex-col lg:w-1/2 w-[90%] mx-auto my-5 py-2'>
            {message ? <Popup detail={message} /> : null}
            {message2 ? <ConfirmPopup detail={message2} func={confirmLogout} cancelFunc={cancelLogout}/> : null}
            <div className='flex items-center justify-center my-2'>
            {profilePictureURL && <img className="w-32 h-32 rounded-full" src={profilePictureURL} alt="Profile" />}
            <input type="file" 
                className='text-white'
                onChange={(e) => setProfilePicture(e.target.files[0])}
            />
            </div>
            <p className='my-2'>My Username</p>
            <input type="text" value={newUsername}
                className='py-1 px-1.5 rounded bg-[#343366]'
                onChange={(e) => setNewUsername(e.target.value)}
            />
            <p className='my-2'>My Email</p>
            <input type="email" value={newEmail}
                className='py-1 px-1.5 rounded bg-[#343366]'
                onChange={(e) => setNewEmail(e.target.value)}
            />
            <div className='flex mx-auto justify-between lg:w-1/2 w-[60%] my-4'>
            <button className='btn-hover bg-[#00C897] px-4 rounded py-2' onClick={updateMyProfile}>Update</button>
            <button className='btn-hover bg-[#00C897] px-4 rounded py-2' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default MyProfile;
