/* NextJS imports */
import Link from 'next/link';


export default function BotaoVazado(props) {
    const Texto = props.children;
    const CorPrincipal = props.corPrincipal;
    const CorSecundaria = props.corSecundaria;
    const Margin = props.margin;
    const Rota = props.link;

    return (
        <>
        <Link href={Rota}>
            <button>
                {Texto}
            </button>
        </Link>

        <style jsx>{`
        button {
            width: 15vw;
            height: 40px;
            margin: ${Margin};
            background-color: inherit;
            color: ${CorPrincipal};
            disabled: {};
            focus: {};
            font-family: inherit;
            font-size: 18px;
            text-align: center;
            border: 4px solid ${CorPrincipal};
            border-radius: 3px;
            transition: 0.5s;
            cursor: pointer;
        }

        button:hover {
            background-color: ${CorPrincipal};
            color: black;
        } 

        button:focus {
            background-color: ${CorSecundaria};
            color: black;
            border: 4px solid ${CorSecundaria};
        }
        `}</style>
        </>
    )
}