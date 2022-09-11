import Swal from 'sweetalert2';

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

    Toast.fire()
}

export { showToast };
