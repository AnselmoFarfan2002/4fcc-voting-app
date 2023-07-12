function writeOptions(array){
    return array.map(op => `
        <li class="list-group-item d-flex justify-content-between">
            <div class="ms-2 me-auto">${op.value}</div>
            <span class="badge bg-secondary rounded-pill">${op.votes}</span>
        </li>
    `).join("")
}

function writePolls(container, array) {
    array.forEach(poll => {
        let newPoll = $("<div>")
        newPoll.addClass("p-4 border rounded cquestion")
        
        newPoll.html(`
            <label for="questionId"><h5 class="mb-0">${poll.question}</h5></label>
            <div class="form-text mb-3">By <span class="author">${poll.author}</span></div>
            <ul class="list-group list-group-numbered mb-3">${writeOptions(poll.options)}</ul>
            <div class="btn-group w-100">
                <button class="btn btn-dark border" type="button">Delete</button>
                <button class="btn btn-secondary" type="button">Share</button>
            </div>
        `)
        container.append(newPoll)
    })
}

function main(){
    let container = $(".container")

    fetch(`/polls/own`)
    .then( res => res.json() )
    .then( data => {
        const { resources } = data
        if( resources.length ) writePolls(container, resources)
        else $("#emptyAlert").removeClass("d-none")
    })
}

$(document).ready( main )