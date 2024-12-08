import React, { useState, useEffect, useRef, forwardRef } from 'react';

export default forwardRef(function ComboBox2({ options = [], value="", className = '', isFocused = false, valueField, textField, onChange, ...props }, ref) {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const filtered = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filtered);
    setDropdownVisible(true);
    onChange(value)
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setDropdownVisible(false);
    onChange(option)
  };

  return (
    <div className={"relative "+className} ref={inputRef}>
      <input
        {...props}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setDropdownVisible(true)}
        className={'border rounded-lg py-3 px-3 mt-4 bg-gray-100 border-indigo-600  w-full'}
      />
      {isDropdownVisible && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">Pas d'option trouvée</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
});
