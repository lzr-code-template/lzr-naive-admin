import mitt from "mitt"

type Events = {
  changeNav: string
}

const emitter = mitt<Events>()
export default emitter