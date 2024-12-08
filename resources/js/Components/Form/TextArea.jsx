import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ className = '', isFocused = false, children, ...props }, ref) {
    const textarea = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            textarea.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                'border rounded-lg py-3 px-3 mt-4 bg-gray-100 border-indigo-600 placeholder-white-500 text-white' +
                className
            }
            ref={textarea}
        >
            {children}
        </textarea>
    );
});
