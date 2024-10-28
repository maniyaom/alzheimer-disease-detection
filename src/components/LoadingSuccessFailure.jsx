import React from 'react'
import success_icon from '../assets/icons/success_icon.png';
import error_icon from '../assets/icons/error_icon.png';

export default function LoadingSuccess({ success, message }) {
    return (
        <>
            <div className='flex justify-center flex-col'>
                <div className="flex items-center bg-neutral-200 mt-4 p-2 rounded-md">
                    {success && <img src={success_icon} className="w-4 h-4 me-2" />}
                    {!success && <img src={error_icon} className="w-4 h-4 me-2" />}
                    <span>{message}</span>
                </div>
            </div>
        </>
    )
}