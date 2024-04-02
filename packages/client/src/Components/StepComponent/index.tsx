import React from 'react'

export default function StepComponent({ selfNumber, title, itemsList }): JSX.Element {
  const items = itemsList.map((item, index) => (
    <li className="mb-2" key={index}>
      {index + 1}. <span className="px-1">{item}</span>
    </li>
  ))

  return (
    <div className="bg-amber-300 max-w-xs rounded">
      <h4 className="text-center border-b border-slate-500 tracking-widest font-semibold py-2">
        Step
        <span className="bg-black text-amber-300 rounded-full mx-2 px-2 inline-block">
          {selfNumber}
        </span>
        : {title}
      </h4>

      <div className="bg-amber-200 px-3 py-2">
        <ul>{items}</ul>
      </div>
    </div>
  )
}
