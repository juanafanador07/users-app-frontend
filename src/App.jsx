import { useEffect, useState } from 'react'
import { apiEndpoint } from './utils/endpoints';
function App() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);

  useEffect(() => {
    getUsers()
  }, [])

  async function getUsers() {
    const req = await fetch(`${apiEndpoint}/usuarios`);
    setUsers(await req.json());
  }

  async function deleteUser(index) {
    const user = users[index];
    await fetch(`${apiEndpoint}/usuarios/${user._id}`, {
      method: "delete"
    });
    await getUsers();
  }

  async function createUser(name, age) {
    await fetch(`${apiEndpoint}/usuarios`, {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        name,
        age
      })
    });
    await getUsers();
  }

  return (
    <>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3">Edad</th>
            <th scope="col" className="px-6 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ?
            users.map((user, index) => {
              return (
                <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user._id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.age}</td>

                  <td className="px-6 py-4">
                    <a onClick={() => deleteUser(index)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Borrar</a>
                  </td>
                </tr>
              )
            })
            : <tr>
                <td colSpan="4" className='text-center p-4 font-bold'>No hay Registros</td>
            </tr>
          }
        </tbody>
      </table>

      <div className='flex items-center justify-center gap-3 m-3'>
        <input
          type='text'
          placeholder='Nombre'
          value={userName}
          onInput={e => setUserName(e.target.value)}
          className="p-2 rounded w-40 border-2 border-slate-300">
        </input>
        <input
          type='number'
          placeholder='Edad'
          value={userAge}
          onInput={e => setUserAge(e.target.value)}
          className="p-2 rounded w-40 border-2 border-slate-300"
        >
        </input>
        <button onClick={() => {
          createUser(userName, userAge)
          setUserName("")
          setUserAge(0)
        }} className='p-2 bg-blue-500 rounded w-20 text-white font-bold'>Crear</button>
      </div>
    </>
  )
}

export default App
