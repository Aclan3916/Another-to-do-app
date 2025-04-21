import {useState} from 'react'

export function useToggle(initialValue=false) {
   
    const [value, setValue] = useState(initialValue);

    const toggle = () => setValue((prev) => !prev);

    return[value, toggle] as const;
}
