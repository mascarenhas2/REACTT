import {useState, useCallback } from "react";

const useMensagem =() => {

    const [mensagem, setMensagem ] = useState ('')
    const [tipoMensagem, setTipoMensagem ] = useState ('')
    const [visivel, setVisivel ] = useState ('')

    const mostrarMensagem = useCallback((mensagem, tipo = 'sucesso') => {
        setMensagem(mensagem)
        setTipoMensagem(tipo)
        setVisivel(true)
        setTimeout(() => {
            setVisivel(false)
        }, 5000)
    }, [])

    const fecharMensagem = useCallback(() => {
        setVisivel(false)

    }, [])

    return { mensagem, tipoMensagem, visivel, mostrarMensagem, fecharMensagem }
    
}

export default useMensagem