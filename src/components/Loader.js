import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = (props) => {


    return (
        <div style={{
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            height: '100vh',
            zIndex: '999',
            position: 'fixed',
            overflow: 'auto',
            left: 0,
            top: 0,
            display: props.visible === true ? 'flex' : 'none',
            backgroundColor: '#0004'
        }}>

            <ClipLoader width={150} color="#2e7c31" css={{ margin: 'auto' }} />

        </div>
    )
}

export default Loader
