import { useMoveBack } from "../hooks/useMoveBack"

const PageNotFound = () => {
    const moveBack = useMoveBack();
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
        <h1 className="text-3xl font-bold">The page you are looking for could not be found 😢</h1>
        <button className="btn btn-secondary font-extrabold" onClick={moveBack}>&larr; Go back</button>
    </div>
  )
}

export default PageNotFound