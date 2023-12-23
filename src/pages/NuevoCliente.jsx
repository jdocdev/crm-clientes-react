import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarCliente } from '../data/clientes'

export async function action({ request }) {
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)
  const email = formData.get('email')



  // validación
  const errores = []
  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")
  if (!regex.test(email)) {
    errores.push('El email no es válido')
  }

  // Retornar datos si hay errores
  if (Object.keys(errores).length) {
    return errores
  }

  await agregarCliente(datos)

  return redirect('/')
}

const NuevoCliente = () => {

  const errores = useActionData()
  const navigate = useNavigate()

  return (
    <>
      <h1 className="font-black text-4xl text-slate-900">Nuevo Cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>
      <div className="flex justify-end">
        <button
          className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1 font-bold uppercase rounded"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <div className='bg-slate-50 shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form
          method='post'
          noValidate
        >
          <Formulario />
          <input
            type='submit'
            className='bg-slate-700 hover:bg-slate-800 hover:text-yellow-300 text-white px-3 py-1 font-bold uppercase rounded mt-5 w-full text-lg cursor-pointer'
            value='Registrar Cliente'
          />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente