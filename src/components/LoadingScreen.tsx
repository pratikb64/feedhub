import loading from "data-base64:~assets/images/loading.svg"

const LoadingScreen = () => {
  return (
    <div className="fixed left-0 top-0 flex h-[650px] w-[500px] items-center justify-center bg-slate-900">
      <img src={loading} alt="loader" className="w-20" />
    </div>
  )
}

export default LoadingScreen
