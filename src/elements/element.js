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

	// add animation compoment if dom element has animation
	checkAnimation() {
		if (
			parseFloat(this.style.animationDuration) ||
			parseFloat(this.style.transitionDuration)
		)
			this.entity.setAttribute("vr-animate", "")
		else this.entity.removeAttribute("vr-animate")
	}

	initHover() {
		// find what has hover
		let tag = null
		if (
			this.quickxr.hoverSelectors.has(
				this.domElement.tagName.toLowerCase()
			)
		)
			tag = this.domElement.tagName.toLowerCase()
		let classes = []
		for (const cls of this.domElement.classList) {
			if (this.quickxr.hoverSelectors.has("." + cls)) classes.push(cls)
		}
		let id = null
		if (this.quickxr.hoverSelectors.has("#" + this.domElement.id))
			id = this.domElement.id

		// add mouseenter and mouseleave if element has hover.
		if (tag || classes.length > 0 || id) {
			this.entity.addEventListener("mouseenter", () => {
				if (tag) this.domElement.classList.add(tag + "hover")
				if (classes.length > 0)
					for (const cls of classes)
						this.domElement.classList.add(cls + "hover")
				if (id) this.domElement.classList.add(id + "hover")
				// this is only for hover transform. Update all elements when transform gets added
				if (this.style.transform != "none") {
					this.quickxr.update()
					this.hoverTransform = true
				}
			})
			this.entity.addEventListener("mouseleave", () => {
				if (tag) this.domElement.classList.remove(tag + "hover")
				if (classes.length > 0)
					for (const cls of classes)
						this.domElement.classList.remove(cls + "hover")
				if (id) this.domElement.classList.remove(id + "hover")
				if (this.hoverTransform) {
					this.position.depth = this.position.startDepth
					for (const element of this.domElement.querySelectorAll(
						"*"
					)) {
						if (element.element) {
							element.element.parentTransform = "none"
							element.element.position.depth =
								element.element.position.startDepth
						}
					}
				}
			})
		}
	}
}
