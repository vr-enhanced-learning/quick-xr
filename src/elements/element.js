import Position from "../utils/position"
import MouseEventHandler from "../utils/mouseEventHandler"

export default class Element {
	// call after entity is created in inheriting class
	initEventHandlers() {
		this.initHover()

		// setting up MouseEventHandler
		this.mouseEventHandle = new MouseEventHandler(this)

		// dynamic listeners
		this.domElement.addEventListener("eventListenerAdded", () =>
			this.mouseEventHandle.resync()
		)
		this.domElement.addEventListener("eventListenerRemoved", () =>
			this.mouseEventHandle.resync()
		)
	}
}
