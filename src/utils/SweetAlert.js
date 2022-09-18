import { TextField } from '@mui/material';
import Swal from 'sweetalert2';
import '../style/sweetalert.scss';
import 'animate.css';

/**
 * @namespace {Object} props
 * @memberof props
 * @title string
 * @icon string
 * @showConfirmButton boolean
 * @timer number(ms)
 * @isShowTimeProgressBar boolean
 * @customClass string
 * @returns void
 */
const showToast = (props) => {

    const Toast = Swal.mixin({
        toast: true,
        position: props.position ? props.position : 'top-end',
        title: props.title,
        icon: props.icon,
        showConfirmButton: props.isShowConfirmButton,
        timer: props.timer,
        timerProgressBar: props.isShowTimeProgressBar,
        customClass: props.customClass,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire();
}


/**
 * @namespace {Object} props
 * @memberof props
 * @userName string
 * @photoURL string
 * @email string
 * @returns void
 */
const showProfileModal = (props) => {

    const htmlTemplate = `
                            <div className="chatUserProfileContainer" style="display:flex; flex-direction: column; justify-content: center; gap:2rem;">
                                <div className="chatUserProfileheader" style="display:flex; justify-content: center;align-items: center; gap: 2rem;">
                                    <img src=${props.photoURL} alt="N/A" height="100px" width="100px" /> 
                                    <span className="userName" style="font-size:2rem; font-weight:bold;">${props.userName ? props.userName : 'N/A'}</span>
                                </div>
                                <div className="chatUserProfileBody" style="display:flex;flex-direction: column; justify-content: center;align-items: center; gap: 2rem;">

                                <div style="display:flex; justify-content: center;align-items: center; gap: 1rem;">
                                        <label for="email" style="font-weight:bold; color:gray">Email</label>
                                        <input type="text" id="email" value=${props.email ? props.email : 'N/A'} disabled style=" 
                                            padding: 0.5rem;
                                            border: none;
                                            border-radius: 1rem;
                                            background-color: white;
                                            text-align: center;
                                            font-size: 1rem;" 
                                        />
                                </div>

                                </div>
                            </div>
                        `

    Swal.fire({
        html: htmlTemplate,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: 'sweetalert modal profileModal',
        showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut animate__faster'
        }
    });

}

/**
 * @namespace {Object} props
 * @memberof props
 * @title string
 * @text string
 * @returns SweetAlert {result}
 */
const showConfirmationModal = async (props) => {

    const result = await Swal.fire({
        title: props.title,
        text: props.text,
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonColor: '#d33',
        customClass: 'sweetalert'
    });

    return result;
}


const showSearchChatModal = async () => {

    const result = await Swal.fire({
        title: 'Search...',
        input: 'text',
        inputLabel: 'Search in chat',
        showCancelButton: false,
        showConfirmButton: false,
        showCloseButton: true,
        customClass: 'sweetalert',
        showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut animate__faster'
        }

    });

    return result;
}
export { showToast, showProfileModal, showConfirmationModal, showSearchChatModal };
