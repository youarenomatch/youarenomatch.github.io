alert('ceshi')

class Kvue{
    constructor(optinos){
        this.$optinos=optinos

        this.$data=optinos.data

        this.observe(this.$data)
    }
    // 传进来的value
    observe(value){
        console.log(value)
        if(!value ||typeof value !==Object){
            return
        }
        Object.keys(value).foreach(key=>{
            this.defineReactive(value,key,value[key])
        })
    }

    // 数据的响应化函数
    defineReactive(obj,key,val){
        console.log(obj)
        Object.defineProperty(obj,key,{
            get(){
                return val
            },
           
            set(newVal){
                if(newVal === val){
                    return
                }
                val=newVal
                console.log(`${key}的值发生变化:${val}`)
            }
        })
    }
}