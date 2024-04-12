'use client'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

import IconCheckbox from '../IconCheckbox/index'

export function StepItemComponent({ item, index }: { item: object }) {
    const [isHovered, setIsHovered] = useState(true)
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxClick = (): void => {
        setIsChecked(prevState => !prevState);
    }

    return (
        <li className="mb-2 flex justify-between" key={index}
            onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
            <span className="px-1">
                {index + 1 + ' '}.
                {item}
            </span>

            <span className="flex items-center">
                <IconCheckbox isChecked={isChecked} hovered={isHovered} onClick={handleCheckboxClick}/>

                <button className="mr-1 size-5 flex">
                <PencilSquareIcon className="size-full self-end text-black-500"/>
                </button>

                <button className="mr-1 size-5 flex">
                <TrashIcon className="size-full text-black-500"/>
                </button>
                </span>
        </li>
    )
}