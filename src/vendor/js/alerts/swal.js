import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default function swal() {
    return {
        mixin,
    };
}

function mixin(icon, msg) {
    Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    }).fire({ icon, title: msg });
}
