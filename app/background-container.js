'use client'
import React from 'react'
import Image from 'next/image'

export default function BackgroundContainer(props) {
    const { image } = props
    return (
        <div className="backgroundContainer">
            <Image
              src={image ?? 'https://cdna.artstation.com/p/assets/images/images/004/560/916/large/dominik-mayer-redmoon.jpg'}
              fill
              alt="Cover image"
              role='presentation'
            />
            <div className="backgroundOverlay"></div>
          </div>
    )
}