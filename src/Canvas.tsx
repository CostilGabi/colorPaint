import { useRef, useEffect } from 'react'

type CanvasProps = {
    deleteMode: boolean,
    thickMode: number
    shadowMode: number
    shadowColor: string
    lineColor: string
}

const Canvas: React.FC<CanvasProps> = ({ deleteMode, thickMode, shadowMode, shadowColor, lineColor }) => {
    
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const isDrawing = useRef(false)

    const startDrawing = () => {
        isDrawing.current = true
    }

    const stopDrawing = (ctx: CanvasRenderingContext2D) => {

        isDrawing.current = false
        ctx?.beginPath()

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const letDraw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {

        if ( !isDrawing.current ) return

        ctx.lineWidth = thickMode
        ctx.lineCap = 'round'
        ctx.strokeStyle = lineColor
        ctx.shadowColor = shadowColor
        ctx.shadowBlur = shadowMode
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath() // Start a new path
        ctx.moveTo(x, y)
    
    }

    useEffect(() => {

        const canvas = canvasRef.current
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        let animationFrameId: number

        const handleMouseMove = (e: MouseEvent) => {

            if (!canvas || !context) return

            const canvasRect = canvas.getBoundingClientRect()
            const offsetX = e.clientX - canvasRect.left
            const offsetY = e.clientY - canvasRect.top

            letDraw(context, offsetX, offsetY)

        }

        const handleMouseDown = () => {
            startDrawing()
        }

        const handleMouseUp = () => {
            stopDrawing(context)
        }

        const deleteBoard = () => {
            context.clearRect(0, 0, canvas.width, canvas.height)
        }
      
        if (deleteMode) {
            deleteBoard()
        }

        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mouseup', handleMouseUp)

        return () => {

            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mousedown', handleMouseDown)
            canvas.removeEventListener('mouseup', handleMouseUp)
            cancelAnimationFrame(animationFrameId)
        }

    }, [deleteMode, letDraw])

    useEffect(() => {

        const resizeCanvas = () => {

            const canvas = canvasRef.current
            if (!canvas) return

            const parent = canvas.parentElement
            if (!parent) return
    
            const { width, height } = parent.getBoundingClientRect()
            canvas.width = width
            canvas.height = height

        }
    
        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()
    
        return () => {

            window.removeEventListener('resize', resizeCanvas)

        }

      }, [])

    return <canvas ref={canvasRef} />
}

export default Canvas