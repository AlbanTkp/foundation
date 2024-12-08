import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Select from 'react-select';

export default forwardRef(function MySelect({ items = [], className = '', isFocused = false, valueField, textField, value, onChange, ...props }, ref) {
    const select = ref ? ref : useRef();
    const [selectedOption, setSelectedOption] = useState(value?{value:value[valueField],label:value[textField]}:null);
    const options = items.map((item)=>{
        return {'value':item[valueField], 'label':item[textField]}
    })
    useEffect(() => {
        if (isFocused) {
            select.current.focus();
        }
    }, []);

    const handleChange = (item)=>{
        setSelectedOption(item)
        console.log(item);
        
        const selected = items.find(i=>i[valueField] == item.value)
        onChange(selected)
    }

    return (
        <Select
            {...props}
            isSearchable={false}
            defaultValue={selectedOption}
            onChange={handleChange}
            options={options}
            className={
                'border-0 rounded-lg p-1 mt-4 bg-gray-100 border-indigo-600  w-full z-50' +
                // 'border rounded-lg mt-4 bg-gray-100 border-indigo-600  w-full' +
                className
            }
            ref={select}
          />
    );
});
