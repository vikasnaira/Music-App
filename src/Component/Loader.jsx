import React from 'react'

const Loader = () => {
  return (
<div class="flex-col gap-4 w-full flex items-center absolute top-0 left-0 z-99 bg-black/90 h-screen justify-center">
  <div
    class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
  >
    <div
      class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
    ></div>
  </div>
  <h2 class="text-white text-xl font-mono">Loading...</h2>
</div>

  )
}

export default Loader
