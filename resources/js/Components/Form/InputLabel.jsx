export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        
        <label {...props} className={`block font-bold text-lg text-black ` + className}>
            {value ? value : children}
        </label>
    );
}
