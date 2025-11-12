export default function Login(){
    const handleSubmit = (event:any)=>{
        event.PreventDefault()

    }
    return(
        <div>
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder="gabriel@example.com"/>
                <input type="text" placeholder="password" />
                <button type="submit" ></button>
            </form>
        </div>
    )
}