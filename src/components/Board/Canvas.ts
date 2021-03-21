import React from 'react'
import {RGBColor} from 'react-color'
export default class Canvas {

    canvas: HTMLCanvasElement
    width: number
    height: number
    ratio: number
    context: CanvasRenderingContext2D

    
    constructor(ref: React.RefObject<HTMLCanvasElement>, width: number = 50, height: number= 50, ratio: number = 15){
        this.canvas = ref.current!
        this.context = this.canvas.getContext('2d')!
        this.width = width * ratio
        this.height = height * ratio
        this.ratio = ratio
    }
    
    wipeCanvas() {
        this.context.globalCompositeOperation = 'destination-over'
        this.context.fillStyle = 'white'
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height)
        this.context.globalCompositeOperation = 'source-over'
    }

    matchColor(colora: RGBColor,colorb: RGBColor) {
        return colora.r === colorb.r
            && colora.g === colorb.g
            && colora.b === colorb.b
    }

    drawPixel(x:number,y: number,color:RGBColor = {r:0,g:0,b:0}) {
        const {r,g,b} = color
        this.context.fillStyle = `rgb(${r},${g},${b})`
        this.context.fillRect(x,y,this.ratio,this.ratio)
    }

    getColor(x: number,y: number){
        const colorData = this.context.getImageData(x,y,1,1).data
        return({
            r: colorData[0],
            g: colorData[1],
            b: colorData[2],
            a: colorData[3]
        })
    }

    setSquare(canvasData: ImageData, pos: number, color:RGBColor = {r:0,g:0,b:0}){

        for(let j = pos, step = 0; step < this.ratio; j += this.canvas.width * 4, step++){
            for(let i = j; i < j + (this.ratio * 4); i += 4 ){
                canvasData.data[i] = color.r;
                canvasData.data[i+1] = color.g;
                canvasData.data[i+2] = color.b;
                canvasData.data[i+3] = 255;
            }
        }
        return canvasData
    }

    fill(tx: number,ty: number,color: RGBColor = {r:0 ,g:0, b:0, a: 1}) {
    
        const baseColor = this.getColor(tx,ty)
        let canvasData = this.context.getImageData(0,0,this.canvas.width,this.canvas.height)
        let pixelStack = [[tx, ty]];
        let x, y, newPos, pos, left, right
        while(pixelStack.length){
            newPos = pixelStack.pop();
            x = newPos![0];
            y = newPos![1];
            
            pos = (y* this.canvas.width + x) * 4;
            let upPos = pos - (this.canvas.width * this.ratio * 4)
            while(y - this.ratio >= 0 && this.matchColor(baseColor,{
                r: canvasData.data[upPos],
                g: canvasData.data[upPos+1],
                b: canvasData.data[upPos+2]}))
            {
              y -= this.ratio
              pos -= this.canvas.width * this.ratio * 4;
              upPos = pos - (this.canvas.width * this.ratio * 4)
            }
            left = false;
            right = false;
            //traverse down
            while(y < this.canvas.height && this.matchColor(baseColor,{
                r: canvasData.data[pos],
                g: canvasData.data[pos+1],
                b: canvasData.data[pos+2]}))
            {
                canvasData = this.setSquare(canvasData,pos,color);
                
                if(x > this.ratio - 1){
                    let curColor = {
                        r: canvasData.data[pos - (4 * this.ratio)],
                        g: canvasData.data[pos - (4 * this.ratio) + 1],
                        b: canvasData.data[pos - (4 * this.ratio) + 2]}
                        if(this.matchColor(baseColor,curColor))
                        {
                            if(!left){
                            pixelStack.push([x - this.ratio, y]);
                            left = true;
                        }
                    }
                    else if(left)
                    {
                        left = false;
                    }
                }
                
                if(x < this.canvas.width - this.ratio)
                {
                    let curColor = {
                        r: canvasData.data[pos + (4 * this.ratio)],
                        g: canvasData.data[pos + (4 * this.ratio) + 1],
                        b: canvasData.data[pos + (4 * this.ratio) + 2]
                    }
                    if(this.matchColor(baseColor,curColor))
                    {
                        if(!right){
                            pixelStack.push([x + this.ratio, y]);
                            right = true;
                        }
                    }
                    else if(right){
                        right = false;
                    }
                }
                        
                pos += this.canvas.width * this.ratio * 4;
                y+= this.ratio
            }
        }
        this.context.putImageData(canvasData, 0, 0);
    }

    init(){
        this.canvas.width = this.width
        this.canvas.height = this.height
    }
}