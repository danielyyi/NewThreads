import Logo from '../YoustagramLogo.png'

function Headerbar() {
 
    return (
        <div>
            <div className="headerbar">
                <img className="logo" src={Logo} alt={"logo"}/>
                <div>Youstagram</div>
                
            </div>
        </div>
    )
  }


export default Headerbar


