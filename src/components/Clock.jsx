import React from 'react'
import { useState, useEffect } from 'react'

const Clock = () => {
    const [clock, setClock] = useState()

    useEffect(() => {
        setInterval(() =>{
            const date = new Date();
            setClock(date.toLocaleTimeString())
        },1000)
    }, [])
    
  return (
    <div>{clock}</div>
  )
}

export default Clock