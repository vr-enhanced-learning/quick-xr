import TextElement from "./textElement"

export default class InputElement extends TextElement {
	constructor(quickxr, domElement, layer) {
		super(quickxr, domElement, layer)
		this.borderColor = new THREE.Color(0x000000)
		this.borderWidth = 1
		this.active = false

		// update when there is change of value
		this.domElement.addEventListener("input", () => this.update())
		// when clicked make it active input for the keyboard and position the keyboard relative to camera
		this.entity.addEventListener("click", () => {
			const camera = this.quickxr.aframe.scene.camera.parent
			const keyboard = this.quickxr.aframe.keyboard.object3D

			keyboard.position.copy(camera.position)
			keyboard.rotation.copy(camera.rotation)
			keyboard.rotation.z = 0
			keyboard.rotation.x = THREE.Math.degToRad(-30)
			keyboard.translateX(-0.24)
			keyboard.translateY(-0.1)
			keyboard.translateZ(-0.6)
			keyboard.visible = true

			if (this.quickxr.aframe.keyboard.activeInput) {
				this.quickxr.aframe.keyboard.activeInput.element.active = false
				// update quickxr where activeInput is located
				this.quickxr.aframe.keyboard.activeInput.element.quickxr.update()
			}
			this.active = true

			this.quickxr.aframe.keyboard.activeInput = this.domElement
			this.quickxr.update()
		})
	}

	updateText() {
		const value = this.domElement.value
		if (value) this.textValue = value
		else this.textValue = this.domElement.placeholder
	}
	updateTextColor() {
		const value = this.domElement.value
		if (value) super.updateTextColor()
		else this.entity.setAttribute("text", "color", "#999")

		if (this.active) this.entity.setAttribute("color", "#ffffcc")
	}
}
