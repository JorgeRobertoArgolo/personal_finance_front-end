import style from './css/Loader.module.css'

//Loader (Carregamento)
export const Loader: React.FC = () => {
    return (
        <div className={style['lds-ellipsis']}><div></div><div></div><div></div><div></div></div>
    )
}