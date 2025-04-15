import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
const API_URL = import.meta.env.VITE_API_URL

function App() {

  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    if (url == '') return toast.error("Escribe una url de playlist 🔗", {
      position: "top-right"
    })
    setLoading(true)

    toast("Intentamos descargar la playlist. Aguarda un momento.", {
      position: "top-right"
    })

    try {
      const response = await fetch(`${API_URL}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })

      if (!response.ok) throw new Error('Error en la descarga')

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = 'playlist.zip'
      document.body.appendChild(a)
      a.click()
      a.remove()
      toast.success("Playlist lista 💓", {
        position: "top-right"
      })
    } catch (error) {
      console.log(API_URL)
      console.log(error)
      toast.error("Ocurrió un error 😢", {
        position: "top-right"
      })
    } finally {
      setLoading(false)
      setUrl('')
    }
  }

  return (
    <div className="px-6 py-8 bg-[#FFF6F6] w-screen h-full md:h-screen">

      <div className="flex flex-col items-center">
        <div className="absolute top-0 bg-[#FF5F5F]/80 w-1/2 h-12 blur-2xl rounded-full"></div>

        <h1 className="font-poppins font-medium text-3xl sm:text-6xl text-center mt-4">
          Tus playlist de<img src="./logo-youtube.png" className="inline w-11 h-11 sm:w-24 sm:h-24" /><span className="font-normal font-instrument">Youtube</span>
          <p>de vuelta a tu 📱 <span className="font-instrument font-normal">dispositivo</span></p>
        </h1>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL de la playlist"
          className="font-poppins text-sm border-2 border-black rounded-lg px-4 py-2 bg-white w-full mx-4 mt-8 sm:w-lg"
        />
        <button
          onClick={handleDownload}
          disabled={loading}
          className="font-poppins w-full bg-[#FA4346] rounded-lg px-4 py-2 flex items-center justify-center text-white font-semibold mt-4
            sm:hover:scale-95 duration-100 hover:cursor-pointer sm:w-lg
          "
        >
          {loading ? 'Descargando...' : 'Descargar playlist'}
        </button>

        <img src="./presentation.png" alt="" className="mt-8" />

      </div>


      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 mt-6">
        <div className="flex items-center gap-4 col-span-1 bg-white rounded-md p-4">
          <div className="absolute bg-red-200 w-8 h-8 blur-lg rounded-full"></div>
          <span className="text-red-500 text-4xl font-instrument">1</span>
          <p className="font-poppins">Pon tu playlist de youtube en pública 🌐 y copia su enlace 🔗</p>
        </div>
        <div className="flex items-center gap-4 col-span-1 bg-white rounded-md p-4">
          <div className="absolute bg-red-200 w-8 h-8 blur-lg rounded-full"></div>
          <span className="text-red-500 text-4xl font-instrument">2</span>
          <p className="font-poppins">Pega el enlace en el cuadro de arriba ✍🏼</p>
        </div>
        <div className="flex items-center gap-4 col-span-1 bg-white rounded-md p-4">
          <div className="absolute bg-red-200 w-8 h-8 blur-lg rounded-full"></div>
          <span className="text-red-500 text-4xl font-instrument">3</span>
          <p className="font-poppins">Descomprime el archivo .zip de tu música 📁</p>
        </div>
      </div>

      <footer className="w-full mx-4 pt-8">
        <p className="font-poppins text-center">Desarrollado con 💓 por <span className="font-instrument">@godie.codes</span></p>
      </footer>

      <Toaster />
    </div>
  )
}

export default App
