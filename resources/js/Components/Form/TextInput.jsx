import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ label = null, type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border rounded-lg py-3 px-3 mt-4 bg-gray-100 border-indigo-600 placeholder-white-500 text-white' +
                className
            }
            ref={input}
        />
    );
});
