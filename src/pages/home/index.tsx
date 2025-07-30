import styles from "./home.module.css"
import { FaSearch } from "react-icons/fa"
import logimg from "../../assets/ClimaNowLogo.png"
import { useState } from "react"
import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

export function Home() {

const location = useLocation()

const [input, setInput] = useState("")

const navigate = useNavigate()

useEffect(() => {
  if (location.state?.notFound) {
    toast.error("Cidade não encontrada. Tente novamente!", {
        position: "top-center",
        autoClose: 2000,
    })
  }
}, [location.state])

function getWeather(e: FormEvent){
    e.preventDefault()

    if(input.trim() === ""){
    toast.warn("Por favor, digite o nome de uma cidade!");
    return;
    }

    navigate(`/details/${input}`)
}

function getCapitalWeather(e: React.MouseEvent<HTMLButtonElement>){
    const capital = e   ?.currentTarget.innerText
    navigate(`/details/${capital}`)
}

  return (
    <main className={styles.container}>
        
        <ToastContainer />

        <div className={styles.main}>

            <div className={styles.section1}>
                <section>
                    <img src={logimg} alt="Imagem logo climaNow" />
                    
                    <form onSubmit={getWeather}>
                        <input type="text" placeholder="Digite o nome de uma cidade... (ex: Florianópolis)" value={input} onChange={ (e) => setInput(e.target.value)}/>

                        <button><FaSearch size={23}/></button>
                    </form>

                    <hr />

                </section>
            </div>
    
            <div className={styles.section2}>

                <section className={styles.options1}>
                    <button  onClick={getCapitalWeather}>Rio de Janeiro</button>
                    <button onClick={getCapitalWeather}>São Paulo</button>
                    <button onClick={getCapitalWeather}>Brasília</button>
                </section>
                <section className={styles.options2}>
                    <button onClick={getCapitalWeather}>Salvador</button>
                    <button onClick={getCapitalWeather}>Florianópolis</button>
                    <button onClick={getCapitalWeather}>Porto Alegre</button>
                </section>
            </div>
        </div>

    </main>

    
  )
}