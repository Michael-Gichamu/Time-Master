import { Users } from "../../constants"

const Welcome = () => {
  return (
    <div className="text-center">
      <h1 className="font-bold mt-6 md:mt-14"><span className="text-xl block">WELCOME BACK,</span> { Users} </h1>
      <p className="font-bold mt-6"><span className="block">Ready to unveil your progress, track your time,</span> and supercharge your productivity?</p>
    </div>
  )
}

export default Welcome