import React, { useState, useEffect, useRef, forwardRef } from 'react';

export default forwardRef(function ComboBox({ options = [], className = '', isFocused = false, valueField, textField, ...props }, ref) {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState({});
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
    const _obj = {...inputValue}
    _obj[textField] = value
    setInputValue(_obj);
    const filtered = options.filter((option) => option[textField].toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filtered);
    setDropdownVisible(true);
    props.onChange(value)
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setDropdownVisible(false);
    props.onChange(option)
  };

  return (
    <div className={"relative "+className} ref={inputRef}>
      <input
        {...props}
        type="text"
        value={inputValue[textField]}
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
                  {option[textField]}
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

