function handleOptions(event){
    const { target } = event
    const { parentElement, value } = target
    
    let input = parentElement.querySelector("input")

    if(value == "Add option..."){
        input.removeAttribute("disabled")
        input.setAttribute("name", "voteOptions")
        target.removeAttribute("name")
        input.focus()
    } else {
        target.setAttribute("name", "voteOptions")
        input.setAttribute("disabled", "true")
        input.removeAttribute("name")
    }
}

$("form select").change( handleOptions )
