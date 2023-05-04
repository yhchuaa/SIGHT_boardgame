import { Inter } from 'next/font/google'
import { useState, useEffect } from "react";
import { Dropdown } from "@nextui-org/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [map, setMap] = useState([
    ['0','0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0','1', '1', '1', '1', 'a', '1', '1', '1', '1', '1', '1', 'a', '1', '0'], 
    ['0','1', '0', '0', '0', '0', '1', '0', '1', '0', '0', '0', '0', '1', '0'], 
    ['0','1', '0', '0', '0', '0', 'e', '0', 'e', '0', '0', '0', '0', 'e', '0'], 
    ['0','1', '0', '0', '0', '0', '1', '0', '1', '0', '0', '0', '0', '1', '0'], 
    ['0','1', '0', '0', '0', '0', '1', '0', 'e', '0', '0', '0', '0', '1', '0'], 
    ['0','1', '0', '0', '1', '1', '1', '0', 'a', 'e', '1', 'e', '1', 'a', '0'], 
    ['0','1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0'], 
    ['0','1', '1', '1', '1', '1', '1', '0', '1', 'a', '1', 'a', '1', '1', '0'], 
    ['0','e', '0', '0', '0', '0', '1', '0', '1', '0', '0', '0', '0', '1', '0'], 
    ['0','1', '0', '0', '0', '0', '1', '0', 'a', '0', '0', '0', '0', '1', '0'], 
    ['0','1', '0', '0', '0', '0', '1', '0', 'e', '0', '0', '0', '0', '1', '0'], 
    ['0','1', '0', '0', '0', '0', '1', '0', 'a', '0', '0', '0', '0', 'a', '0'], 
    ['0','1', 'a', '1', '1', '1', '1', '1', '1', '1', '1', 'e', '1', '1', '0'],
    ['0','0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']])

  const updateMap = (x:number, y:number, value:string) => {
      setMap(prevMap => {
        const map = [...prevMap];
        map[y][x] = value;
        return map;
      })
  }

  var a_value:number = 0
  var e_value:number = 0
  const [count, Setcount] = useState(0)
  const [a_sum, Seta_sum] = useState(0)
  const [e_sum, Sete_sum] = useState(0)
  const [run, SetRun] = useState(0)

  function land(x:number,y:number,dir:string){
    if(x==1 && y==2){
        Seta_sum(a_sum + a_value)
        a_value = 0
        Sete_sum(e_sum + e_value)
        e_value = 0
        Setcount(count+1)
        // start()
        return
    }
    if(map[y][x] == 'a'){
      a_value = a_value + 35.5
    }
    if(map[y][x] == 'e'){
      e_value = e_value + 35.5
    }
    var steps = randomDice();
    go(x,y,steps,dir)
    return
  }

  function go(x:number, y:number, steps:number, dir:string){
    if(steps==0 || (x==1 && y==2)){
        land(x,y,dir);
        return;
    }
    if(x==8 && y==1){
        if(randomDice()){
            go(9,1,steps-1,dir);
        }else{
            go(8,2,steps-1,'d');
        }
    }else if(x==13 && y==8){
        if(randomDice()){
            go(13,9,steps-1,dir);
        }else{
            go(12,8,steps-1,'l');
        }
    }else if(x==6 && y==13){
          if(randomDice()){
              go(5,13,steps-1,dir);
          }else{
              go(5,12,steps-1,'u');
          }
    }else if(dir=='r'){
          if(map[y][x+1]!='0'){
              go(x+1, y, steps-1, dir);
          }else if(map[y+1][x]!='0'){
              go(x, y+1, steps-1, 'd');
          }else if(map[y-1][x]!='0'){
              go(x, y-1, steps-1, 'u');
          }
              
    }else if(dir=='d'){
          if(map[y+1][x]!='0'){
              go(x, y+1, steps-1, dir);
          }else if(map[y][x-1]!='0'){
              go(x-1, y, steps-1, 'l');
          }else if(map[y][x+1]!='0'){
              go(x+1, y, steps-1, 'r');
          }

    }else if(dir=='l'){
          if(map[y][x-1]!='0'){
              go(x-1, y, steps-1, dir);
          }else if(map[y-1][x]!='0'){
              go(x, y-1, steps-1, 'u');
          }else if(map[y+1][x]!='0'){
              go(x, y+1, steps-1, 'd');
          }

    }else if(dir=='u'){
          if(map[y-1][x]!='0'){
              go(x, y-1, steps-1, dir);
          }else if(map[y][x+1]!='0'){
              go(x+1, y, steps-1, 'r');
          }else if(map[y][x-1]!='0'){
              go(x-1, y, steps-1, 'l');
          }
    }
  }

  function randomDice(){
    return Math.floor(Math.random() * (6) + 1)
  }

  function play(){
     var steps = randomDice()
     go(1,1,steps,'r')
  }

  useEffect(()=>{
    if(run){
      play();
    }
  })
  return (
    <main className='h-screen w-screen bg-white'>
      <div className='flex w-full'>
        <div className='w-4/5 h-screen'>
          <div className='place-self-center h-full w-full grid grid-cols-15 grid-rows-15'>
            {
              map.map((line,y)=>(line.map((block,x)=>((block=='0')?<div></div>:
              <div className='bg-yellow-300 border-4 border-black flex items-center justify-center'>
                <Dropdown>
                  <Dropdown.Trigger>
                    <div className="h-12 w-20 cursor-pointer">
                      {(block=='a')?<img className='h-12 m-auto' src="/adventure.png" alt="" />:(block=='e')?<img className='h-12 m-auto' src="/education.png" alt="" />:<div></div>}
                    </div>
                  </Dropdown.Trigger>
                  <Dropdown.Menu selectionMode="single" onSelectionChange={(e)=>{updateMap(x,y,Array.from(e)[0].toString())}}>
                    <Dropdown.Item key="n">None</Dropdown.Item>
                    <Dropdown.Item key="e">Education</Dropdown.Item>
                    <Dropdown.Item key="a">Adventure</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              ))))
            }
          </div>
        </div>
        <div className='w-1/5 bg-gray-500 h-screen flex flex-col text-lg items-center justify-end'>
          <div className='flex-auto'></div>
          <div className='p-5'>Totoal round: {count}</div>
          <div className='flex-auto'></div>
          <div className='p-5'>Average Education Value:</div>
          <div className='p-5'>{(count==0)?0:(e_sum/count).toFixed(5)}</div>
          <div className='flex-auto'></div>
          <div className='p-5'>Average Adventure Value:</div>
          <div className='p-5'>{(count==0)?0:(a_sum/count).toFixed(5)}</div>
          <button className='w-full p-10 bg-green-500' onClick={()=>{SetRun(1)}}>Start</button>
          <button className='w-full p-10 bg-yellow-500' onClick={()=>{SetRun(0)}}>Pulse</button>
          <button className='w-full p-10 bg-red-500' onClick={()=>{Seta_sum(0);Sete_sum(0);Setcount(0)}}>Clear</button>
        </div>
      </div>
    </main>
  )
}
