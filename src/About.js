import React from 'react'

const About = () => {

    return (

        <main>
            <div style={{marginLeft:"1.5em",marginRight:"1.5em", display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"flex-start"}}>
                <h1 style={{marginTop: "1em", marginBottom:"1em", textDecoration:"underline"}}>About</h1>
                <p style={{fontSize:"18px", textAlign:"left"}}>A blog app where you can share your interests, memory, information, knowledge and much more...</p>
                <p style={{marginTop: "2em", fontStyle:"italic", textAlign:"right", fontWeight:"bold", width:"100%"}}>Creator: Toufique Belim</p>
            </div>
        </main>
    )
}

export default About