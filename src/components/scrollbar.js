AFRAME.registerComponent("vr-scrollbar", {
	init: function () {
		this.el.addEventListener(
			"click",
			function (evt) {
				let scrollHeight =
					parseFloat(
						this.el.quickxr.aframe.container.firstElementChild
							.element.style.height
					) - this.el.quickxr.settings.scrollWindowHeight
				if (
					this.el.quickxr.scroll.scrollContainer ==
					this.el.quickxr.container
				)
					scrollHeight =
						this.el.quickxr.scroll.scrollContainer.scrollHeight -
						this.el.quickxr.scroll.scrollContainer.clientHeight

				const scrollY =
					((1 - evt.detail.intersection.uv.y) * scrollHeight) /
					this.el.quickxr.settings.scale
				const elements = [...this.el.quickxr.elements]
				// remove first element that is the backgorund of container
				elements.shift()

				this.el.pointer.object3D.position.setY(
					this.pointEndY +
						evt.detail.intersection.uv.y *
							(this.pointStartY - this.pointEndY)
				)

				for (const element of elements) {
					element.position.scrollY = scrollY
				}
				this.el.quickxr.update()
			}.bind(this)
		)
	},
	play: function () {
		const width = parseFloat(
			this.el.quickxr.aframe.container.firstElementChild.getAttribute(
				"width"
			)
		)
		const height = parseFloat(
			this.el.quickxr.aframe.container.firstElementChild.getAttribute(
				"height"
			)
		)

		// init plane size
		this.el.setAttribute("width", width / 20)
		this.el.setAttribute("height", height)

		//init scrollbar position
		this.el.scrollbar.object3D.position.setX(
			width + parseFloat(this.el.getAttribute("width") / 2)
		)
		this.el.scrollbar.object3D.position.setY(0 - height / 2) //1.96
		this.el.scrollbar.object3D.position.setZ(
			-(this.el.quickxr.settings.layerStep * 4)
		)

		// init pointer position and size
		this.el.pointer.setAttribute("height", width / 20)
		this.el.pointer.setAttribute("width", width / 20)

		this.pointStartY =
			height / 2 - parseFloat(this.el.pointer.getAttribute("height")) / 2
		this.pointEndY =
			this.pointStartY -
			height +
			parseFloat(this.el.pointer.getAttribute("height"))

		this.el.pointer.object3D.position.setY(this.pointStartY)
		this.el.pointer.object3D.position.setZ(
			this.el.quickxr.settings.layerStep * 2
		)
	},
})
