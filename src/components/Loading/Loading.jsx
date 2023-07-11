import React from 'react';
import { MoonLoader } from 'react-spinners';

export default function Loading() {
    return (
        <>
            <div style={{display:"flex", justifyContent:"center",width:"100%"}}>
                <MoonLoader color="rgba(255, 5, 5, 1)"/>
            </div>
        </>
    );
}

