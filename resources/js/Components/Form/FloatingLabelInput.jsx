import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function FloatingLabelInput({ label, type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="relative">
            <input 
            {...props}
            type={type}
            className={
                'border rounded-lg py-3 px-3 mt-4 bg-gray-100 border-indigo-600 placeholder-white-500 peer' +
                // "block appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"+
                className
            }
            ref={input}
            />
            <label 
            htmlFor={props.id} 
            className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
                {label}
            </label>
        </div>
    );
});
