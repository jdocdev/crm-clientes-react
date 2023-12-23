import { useLoaderData } from 'react-router-dom'
import { obtenerClientes } from '../data/clientes'
import Cliente from '../components/Cliente'

export function loader() {
  // const clientes = [
  //   {
  //     id: 1,
  //     nombre: "Juan Pérez",
  //     telefono: "3123456789",
  //     email: "juan.perez@telefonica.com",
  //     empresa: "Telefónica",
  //   }
  // ]
  // return clientes
  const clientes = obtenerClientes()
  return clientes
}

const Index = () => {

  const clientes = useLoaderData()

  return (
    <>
      <h1 className="font-black text-4xl text-slate-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      {clientes.length ? (
        <table className='w-full bg-slate-50 shadow mt-5 table-auto'>
          <thead className='bg-slate-800 text-white'>
            <tr>
              <th className='p-2'>Cliente</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <Cliente
                cliente={cliente}
                key={cliente.id}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center mt-10'> No hay cluente aún</p>
      )}
    </>
  )
}

export default Index