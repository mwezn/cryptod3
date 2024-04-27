useEffect(()=>{
    async function getPriceByDate(){
        const requestOptions = {
           method: 'GET'
       };
       try {
           await fetch(`api/v3/ticker/price`,requestOptions)
              .then(res=>res.json())
              .then(json=> {
                    updateData(()=> [ ...json])
                    
               })
       } 
       catch(err) {
           console.log(err)
       }
     }


    
    getPriceByDate();
    

},[])

function changeSymbol(e){
    console.log(e.target.value)
    console.log(typed)
    let newdata= data.slice();

    const exists= (d)=>{
        if(d.symbol.search(`${e.target.value}`)===-1){
            return false;

        }
        if(d.symbol.search(`${e.target.value}`)===0){
            return true
        }
    }


    updateTyped((old)=>{
        if(old.length==0){
            old=[...newdata]
            
        }

        else {
            old=old.filter(d=>exists(d))
        }

        return old
        
        
    

    })
}
