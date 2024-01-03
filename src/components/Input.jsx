import React, { forwardRef } from 'react'

const inputStyle = 'w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600'

const Input = forwardRef(({ label, textarea, ...props },ref) => {
    return (
        <p>
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            {textarea ? <textarea ref={ref} className={inputStyle} {...props} /> : <input ref={ref} className={inputStyle} {...props} />}
        </p>
    )
})

export default Input
