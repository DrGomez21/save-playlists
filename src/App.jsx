import { useState } from "react"

function App() {

  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    if (url == '') return
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/download', {
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
    } catch (error) {
      alert('Ocurrió un error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-6 py-8 bg-[#FFF6F6] w-screen h-full">

      <div className="flex flex-col items-center">
        <div className="absolute top-0 bg-[#FF5F5F]/80 w-1/2 h-12 blur-2xl rounded-full"></div>
     
        <h1
          className="font-poppins font-medium text-3xl sm:text-6xl text-center mt-4"
        >
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

      <div className="flex flex-col gap-4 mt-6">
        <h2 className="font-poppins font-medium text-xl">Cómo usar la página</h2>
        <div className="flex items-center gap-2 w-full bg-white p-2 rounded-lg">
          <img src="./artist-1.png" alt="" className="w-28" />
          <p className="font-poppins">Pon tu playlist de youtube en pública 🌐 y copia su enlace 🔗</p>
        </div>
        <div className="flex items-center gap-2 w-full bg-white p-2 rounded-lg">
          <img src="./artist-2.png" alt="" className="w-28" />
          <p className="font-poppins">Pega el enlace en el cuadro de arriba ✍🏼</p>
        </div>
        <div className="flex items-center gap-2 w-full bg-white p-2 rounded-lg">
          <img src="./artist-3.png" alt="" className="w-28" />
          <p className="font-poppins">Descomprime el archivo .zip de tu música 📁</p>
        </div>
      </div>

      <footer className="w-full text-center pt-8">
        <p className="font-poppins">Desarrollado con 💓 por <span className="font-instrument">@godie.codes</span></p>
      </footer>

    </div>
  )
}

export default App
