/* 
Author : AjinkyaD
Description: This file contains resize functionality
Date : 04/12/2024
*/ 
import React, { 
	useState, 
	// useCallback, 
	useRef, 
	useEffect } from 'react'

const ResizerElement = ({children, ...props}) => {
	console.log("children",props)
	const wrraperRef = useRef(null)
	const topRef = useRef(null)
	const bottomRef = useRef(null)
	const rightRef = useRef(null)
	const leftRef = useRef(null)


	const [width, setWidth] = useState("800px")
	const [height, setHeight] = useState("400px")


	useEffect(() => {
		const resizableElement = wrraperRef.current;
		const styles = window?.getComputedStyle(resizableElement);
		let widthVal = parseInt(styles.width, 10)
		let heightVal = parseInt(styles.height, 10)

		let xCord = 0;
		let yCord = 0;

		// Top Resizer
		const resizeMouseMoveToTop = (event) => {
			const dy = event?.clientY - yCord;
			heightVal = heightVal - dy;
			yCord = event.clientY;
			resizableElement.style.height = `${heightVal}px`
		}

		const resizeMouseUpToTop = () => {
			document.removeEventListener("mousemove", resizeMouseMoveToTop);
		}

		const resizeMouseDownToTop = (event) => {
			console.log("demo working")
			yCord = event?.clientY;
			const styles = window?.getComputedStyle(resizableElement);
			resizableElement.style.bottom = styles.bottom;
			resizableElement.style.top = null;
			document.addEventListener("mousemove", resizeMouseMoveToTop);
			document.addEventListener("mouseup", resizeMouseUpToTop);
		}

		// Bottom Resizer
		const resizeMouseMoveToBottom = (event) => {
			const dy = event?.clientY - yCord;
			heightVal = heightVal + dy;
			yCord = event.clientY;
			resizableElement.style.height = `${heightVal}px`
		}

		const resizeMouseUpToBottom = () => {
			document.removeEventListener("mousemove", resizeMouseMoveToBottom);
		}

		const resizeMouseDownToBottom = (event) => {
			console.log("demo working")
			yCord = event?.clientY;
			const styles = window?.getComputedStyle(resizableElement);
			resizableElement.style.top = styles.top;
			resizableElement.style.bottom = null;
			document.addEventListener("mousemove", resizeMouseMoveToBottom);
			document.addEventListener("mouseup", resizeMouseUpToBottom);
		}


		// Right Resizer

		const resizeMouseMoveToRight = (event) => {
			const dx = event?.clientX - xCord;
			xCord = event.clientX;
			widthVal = widthVal + dx;
			yCord = event.clientY;
			resizableElement.style.width = `${widthVal}px`
		}

		const resizeMouseUpToRight = () => {
			document.removeEventListener("mousemove", resizeMouseMoveToRight);
		}

		const resizeMouseDownToRight = (event) => {
			xCord = event?.clientX;
			const styles = window?.getComputedStyle(resizableElement);
			resizableElement.style.left = styles.left;
			resizableElement.style.right = null;
			document.addEventListener("mousemove", resizeMouseMoveToRight);
			document.addEventListener("mouseup", resizeMouseUpToRight);
		}


		// Left Resizer
		const resizeMouseMoveToLeft = (event) => {
			const dx = event?.clientX - xCord;
			xCord = event.clientX;
			widthVal = widthVal - dx;
			yCord = event.clientY;
			resizableElement.style.width = `${widthVal}px`
		}

		const resizeMouseUpToLeft = () => {
			document.removeEventListener("mousemove", resizeMouseMoveToLeft);
		}

		const resizeMouseDownToLeft = (event) => {
			xCord = event?.clientX;
			const styles = window?.getComputedStyle(resizableElement);
			resizableElement.style.right = styles.right;
			resizableElement.style.left = null;
			document.addEventListener("mousemove", resizeMouseMoveToLeft);
			document.addEventListener("mouseup", resizeMouseUpToLeft);
		}

		// Top
		const resizeTop = topRef?.current;
		resizeTop?.addEventListener("mousedown", resizeMouseDownToTop);
		// Bottom
		const resizeBottom = bottomRef?.current;
		resizeBottom?.addEventListener("mousedown", resizeMouseDownToBottom);
		// Right 
		const resizeRight = rightRef?.current;
		resizeRight?.addEventListener("mousedown", resizeMouseDownToRight);

		// Left
		const resizeLeft = leftRef?.current;
		resizeLeft?.addEventListener("mousedown", resizeMouseDownToLeft);

		return () => {
			resizeTop?.removeEventListener("mousedown", resizeMouseDownToTop);
			resizeBottom?.removeEventListener("mousedown", resizeMouseDownToBottom);
			resizeRight?.removeEventListener("mousedown", resizeMouseDownToRight);
			resizeLeft?.removeEventListener("mousedown", resizeMouseDownToLeft);

		}

	}, [])

/*
	const handleResizeToTop = () => {
		document.addEventListener("mouseup", handleMouseUp, true);
		document.addEventListener("mousemove", handleMouseMoveTop, true);
	};

	const handleResize = e => {
		document.addEventListener("mouseup", handleMouseUp, true);
		document.addEventListener("mousemove", handleMouseMove, true);
	};

	const handleMouseUp = () => {
		document.removeEventListener("mouseup", handleMouseUp, true);
		document.removeEventListener("mousemove", handleMouseMove, true);
		document.removeEventListener("mousemove", handleMouseMoveTop, true);

	};

	const handleMouseMove = useCallback(e => {
		const newWidth = e.clientX - document.body.offsetLeft;
		if (newWidth > 400 && newWidth < (window?.innerWidth - 200)) {
			setWidth(newWidth);
		}
	}, []);

	const handleMouseMoveTop = useCallback(e => {
		console.log("e, ==>", e, document.body.offsetLeft)
		const newWidth = e.clientY - document.body.offsetLeft;
		if (newWidth > 400 && newWidth < (window?.innerWidth - 200)) {
		    console.log("newWidth", newWidth)
		    setHeight(newWidth);
		}
	}, []); */

	return (
		<div
			ref={wrraperRef}
			className={props.className}
			style={{
				position: "relative",
				userSelect: "auto",
				width: width,
				height: height,
				maxHeight:window?.innerHeight - 80,
    			maxWidth:window?.innerWidth - 200,
				minHeight: 450,
    			minWidth: 400,
				boxSizing: "border-box",
				flexShrink: "0",
				...props?.style,
			}}
		>
			{children}
			<div>
				{/* Top */}
				<div
					ref={topRef}
					className=""
					style={{
						position: "absolute",
						userSelect: "none",
						width: "100%",
						height: "10px",
						top: "-5px",
						left: "0px",
						cursor: "row-resize"
					}}
				/>
				{/* Right */}
				{/* <div
					ref={rightRef}
					className=""
					style={{
						position: "absolute",
						userSelect: "none",
						width: "10px",
						height: "100%",
						top: "0px",
						right: "-5px",
						cursor: "col-resize"
					}}
				/> */}

				{/* Bottom */}
				{/* <div
					ref={bottomRef}
					className=""
					style={{
						position: "absolute",
						userSelect: "none",
						width: "100%",
						height: "10px",
						left: "0px",
						bottom: "-5px",
						cursor: "row-resize"
					}}
				/> */}

				{/* Left */}
				<div
					className=""
					ref={leftRef}
					style={{
						position: "absolute",
						userSelect: "none",
						width: "10px",
						height: "100%",
						top: "0px",
						left: "-5px",
						cursor: "col-resize"
					}}
				/>

				{/* Top Right */}
				{/* <div
					className=""
					style={{
						position: "absolute",
						userSelect: "none",
						width: "20px",
						height: "20px",
						top: "-10px",
						right: "-10px",
						cursor: "ne-resize"
					}}
				/> */}
				{/* Bottom Right */}
				{/* <div
					className=""
					style={{
						position: "absolute",
						userSelect: "none",
						width: "20px",
						height: "20px",
						right: "-10px",
						bottom: "-10px",
						cursor: "se-resize"
					}}
				/> */}
				{/* Bottom Left */}
				{/* <div
					className=""
					style={{
						position: "absolute",
						userSelect: "none",
						width: "20px",
						height: "20px",
						left: "-10px",
						bottom: "-10px",
						cursor: "sw-resize"
					}}
				/> */}
				{/* Top Left */}
				{/* <div
					className=""
					style={{
						position: "absolute",
						userSelect: "none",
						width: "20px",
						height: "20px",
						left: "-10px",
						top: "-10px",
						cursor: "nw-resize"
					}}
				/> */}

			</div>
		</div>

	)
}

export default ResizerElement
