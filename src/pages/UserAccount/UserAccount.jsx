import React, { useContext, useState } from 'react';
import './Account.scss';
import TextField from '@mui/material/TextField';
import Logo from '../../components/Logo/Logo';
import { reauthenticateWithCredential, updateEmail, updateProfile } from 'firebase/auth';
import { fireabaseDatabase, firebaseAuth, firebaseStorage } from '../../firebase';
import { showToast } from '../../utils/SweetAlert';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthContext } from '../../context/AuthContext';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { IconButton } from '@mui/material';

const UserAccount = () => {

    const { currentUser } = useContext(AuthContext);

    const [imgUrl, setImgUrl] = useState(currentUser.photoURL);
    const [userName, setUserName] = useState(currentUser.displayName)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUserName = e.target.userName.value;
        const email = e.target.email.value;

        try {
            // await reauthenticateWithCredential(currentUser, firebaseAuth);
            await updateProfile(currentUser, { displayName: newUserName });
            setUserName(newUserName);
            // await updateEmail(currentUser, email);

            showToast({
                title: 'Account Updated.',
                position: 'top-end',
                icon: 'success',
                timer: 2000,
                isShowTimeProgressBar: 'success',
                isShowConfirmButton: false,
                customClass: 'sweetalert sweetalertToast'
            });
        } catch (error) {
            console.log(error)
            showToast({
                title: 'Oops..Something went wrong.',
                position: 'top-end',
                icon: 'error',
                timer: 2000,
                isShowTimeProgressBar: 'error',
                isShowConfirmButton: false,
                customClass: 'sweetalert sweetalertToast'
            });
        }
    }

    const handleUpdateProfilePicture = (img) => {

        const storageRef = ref(firebaseStorage, `img/profile-pictures/${currentUser.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    setImgUrl(downloadURL);
                    await updateProfile(currentUser, { photoURL: downloadURL });
                })
            }
        )

    }

    return (
        <>
            <Logo />
            <div className='accountContainerWrapper'>
                <div className='accountContainer'>

                    <div className='header'>
                        <div className='imageContainer'>
                            <img className='userImage' src={imgUrl} alt="profile picture" />
                            <input type='file' className='d-none' id="updateProfilePicture" accept='image/png, image/gif, image/jpeg' onChange={e => handleUpdateProfilePicture(e.target.files[0])} />
                            <IconButton className='editIcon' >
                                <label htmlFor='updateProfilePicture' className='updateProfilePictureLabel' >
                                    <EditRoundedIcon fontSize='small' />
                                </label>

                            </IconButton>
                        </div>
                        <span className='userTitle'>{userName}</span>
                    </div>


                    <form className="accountForm" onSubmit={handleSubmit}>
                        <div className='accountFormInputContainer'>
                            <TextField type='text' label='Username' name='userName' defaultValue={userName} />
                            <TextField type='email' label='Email' name='email' value={currentUser.email} disabled />
                        </div>

                        <div className='buttonContainer'>
                            <button className='submit-button'>Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default UserAccount;