$(document).ready(function(){
    $(".title").mouseenter(function(){
        $(this).css("cursor", "pointer");
    })
   
    $.ajax({
        type:"GET",
        url: "https://dog-api.kinduff.com/api/facts",
        success: function(data){
            $(".generateFact").click(function(){
                let html = `<p class="fact">${data.facts[0]}</p>`
                $(".factDiv").html(html);

                html = `
                    <button type="button" class="btn btn-success btnLike m-2">
                        <img src="media\\like.png" alt="">
                        <span>Like</span>
                    </button>
                    <button type="button" class="btn btn-danger btnDislike m-2">Dislike</button>
                    <button type="button" class="btn btn-primary btnGenNew m-2">Generate new</button>
                `;
                $(".grpBtn").html(html);

                $(".btnLike").click(function(){
                    let likeF = new LikedFact(data.facts[0]);
                    likedList.push(likeF);
                    $(this).css("background-color","#555555;");
                    alert("Liked");
                })
            
                $(".btnDislike").click(function(){
                    let dislikeF = new DislikedFact(data.facts[0]);
                    dislikedList.push(dislikeF);
                    alert("Disliked");
                })
                
                $(".btnGenNew").click(function(){
                    $.ajax({
                        type:"GET",
                        url: "https://dog-api.kinduff.com/api/facts",
                        success: function(data){
                            for (const fact of likedList) {
                                if(data.facts[0] == fact){
                                    return;
                                }
                            }
                            for (const fact of dislikedList) {
                                if(data.facts[0] == fact){
                                    return;
                                }
                            }

                            let html = `<p class="factAnother">${data.facts[0]}</p>`
                            console.log("another: "+ data.facts[0])
                            $(".factDivAnother").html(html);
                            html = `
                                <button type="button" class="btn btn-success btnLike m-2">
                                    <img src="media\\like.png" alt="">
                                    <span>Like</span>
                                </button>
                                <button type="button" class="btn btn-danger btnDislike m-2">Dislike</button>
                                <button type="button" class="btn btn-primary btnGenNew m-2">Generate new</button>
                            `;
                            $("body").append(`<div class="grpBtn d-flex justify-content-center"></div>`);
                            $(".grpBtn").html(html);
                            
                        }
                    })
                })
            })
        }
    })

    $(".likedList").click(function(){
        for (const fact of likedList) {
            let html = `
                <p>${fact}</p>
            `;

            $(".likedFactsDiv").append(html);
        }
    })

    $(".dislikeList").click(function(){
        for (const fact of dislikedList) {
            let html = `
                <p>${fact}</p>
            `;

            $(".dislikedFactsDiv").append(html);
        }
    })
})

let likedList = [];
let dislikedList = [];

class LikedFact{
    constructor(textFact){
        this.textFact = textFact;
    }
}

class DislikedFact{
    constructor(textFact){
        this.textFact = textFact;
    }
}