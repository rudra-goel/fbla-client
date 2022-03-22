import './Authentication/login.css'
import heart from  "./FBLA_HeartColor.png"

//import { useState } from 'react'
function App(){
  return (
    <body>
    <div class="navbar">
        <div class="container">
            <nav>
                <a class="logo" href="#">View<span>Rado</span></a>
                <div class = "top-left">
                    <a class = "return-home" href = "testpage.html">Home</a>
                </div>
                <div class = "top-right">
                    <a href="favorites.html">
                        <img source={heart} alt = "Logo" width="25" height="25"/>
                    </a>
                    <a class = "register" href = "testPage.html">Register</a>
                </div>
            </nav>
        </div>
    </div>
</body>
    );
}

export default App;
