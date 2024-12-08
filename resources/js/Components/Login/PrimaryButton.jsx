export default function PrimaryButton({ className = '', disabled, children, ...props }) {

    return (

        <button
            {...props}
            className={
                `inline-flex items-center px-4 border border-indigo-600 bg-primary text-white  py-3 font-semibold rounded-md text-xs uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
