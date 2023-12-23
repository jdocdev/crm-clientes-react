import { Form, useNavigate, redirect } from 'react-router-dom'
import { eliminarCliente } from '../data/clientes'

export async function action({params}) {
    await eliminarCliente(params.clienteId)
    return redirect('/')
}

const Cliente = ({ cliente }) => {

    const navigate = useNavigate()

    const { nombre, empresa, email, telefono, id } = cliente

    return (
        <tr className="border-b">
            <td className='p-6 space-y-2'>
                <p className="text-2xl text-slate-800">{nombre}</p>
                <p>{empresa}</p>
            </td>
            <td className='p-6'>
                <p className="text-slate-400"><span className="text-slate-600 uppercase font-bold">email: </span>{email}</p>
                <p className="text-slate-400"><span className="text-slate-600 uppercase font-bold">TEL: </span>{telefono}</p>
            </td>
            <td className="p-6 flex gap-3">
                <button
                    type="button"
                    className="bg-sky-600 hover:bg-sky-700 uppercase text-xs text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate(`/clientes/${id}/editar`)}
                >
                    editar
                </button>
                <Form 
                    method='POST'
                    action={`/clientes/${id}/eliminar`}
                    onSubmit={(e)=>{
                        if(!confirm('Esta acción es irreversible, ¿Eliminar registro?')){
                            e.preventDefault()
                        }
                    }}
                >
                    <button
                        type="submit"
                        className="bg-rose-600 hover:bg-rose-700 uppercase text-xs text-white font-bold py-2 px-4 rounded"
                    >
                        eliminar
                    </button>
                </Form>
            </td>
        </tr>
    )
}

export default Cliente