
/****************************************************************************** set varaibles  ************************************/
// Dom tags
let categoryDom = document.querySelector("#category")
let difficultyDom = document.querySelector("#difficulty")
let nQuestionDom = document.querySelector("#nQuestion")

let questionsDom = document.querySelector("#questions-container ")
let answresDom = document.querySelector(".answres")
let nextquesBtn = document.querySelector("#nextques")

let againBtn = document.querySelector("#again")


let choosedanwseritem;



let i = 0;
let numOfcorrectAnwers = 0;
let numOfIncorrectAnwers = 0;



let startBtn = document.querySelector("#start")

//varaibles to request and arrange the data
let amount, category, difficulty, respond;
let alldata = []


/****************************************************************************** set events  ************************************/
startBtn.addEventListener("click", startQuiz)
nextquesBtn.addEventListener("click", tonextquestion)
againBtn.addEventListener("click", function again() {
    location.reload()
})




/****************************************************************************** set functions  ************************************/
// arrngement  the data
async function fillterdata(respond) {
    let filtereditem = await respond.forEach(function (item) {
        let theDataOfItem = {
            question: item.question,
            correct_answer: item.correct_answer,
            incorrect_answers: item.incorrect_answers,
        }
        let totalanswers = [item.correct_answer, ...item.incorrect_answers]
        theDataOfItem.totalanswers = totalanswers

        alldata.push(theDataOfItem)
    });
}

// requestTheData
async function requestTheData() {
    amount = nQuestionDom.value
    category = categoryDom.value
    difficulty = difficultyDom.value
    const URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
    let data = await fetch(URL).then(respond => respond.json()).then(function (item) { respond = item.results })
}




// draw data in the quiz page 

function drawadata(alldata) {
    questionsDom.innerHTML = `<h3 id="question"> ${i + 1}- ${alldata[i].question} </h3>`

    for (let x = 0; x < alldata[i].totalanswers.length; ++x) {
        questionsDom.innerHTML += `<div  class="answers-container"><label  class="container-questions">${alldata[i].totalanswers[x]} <input onclick="choosedanwser('a${x + 1}')" id='a${x + 1}' name="radio" type="radio" value="${alldata[i].totalanswers[x]}"> </label> </div> `

    }

}


// determine the answer choosed

function choosedanwser(id) {
    let input = document.querySelector(`#${id}`)
    choosedanwseritem = input.value
}







/******************************************************************************  actual code  ************************************/

async function startQuiz() {

    if (nQuestionDom.value !== "" && nQuestionDom.value !== 0 && nQuestionDom.value > 0) {
        // requestTheData
        await requestTheData()

        // arrngement  the data
        fillterdata(respond)



        //  Draw data 

        drawadata(alldata)

        document.querySelector(".settings").style.display = "none"
        document.querySelector(".quiz").style.display = "block"

        document.querySelector(".current").innerHTML = i;
        document.querySelector(".total").innerHTML = alldata.length;

    } else {
        alert("please select number up to 0")

    }



}




function tonextquestion() {

    if (choosedanwseritem == alldata[i].correct_answer) {
        ++numOfcorrectAnwers;
    } else {
        ++numOfIncorrectAnwers;
    }


    if (i < alldata.length - 1) {
        ++i;


        drawadata(alldata)
        document.querySelector(".current").innerHTML = i;
        document.querySelector(".total").innerHTML = alldata.length;



    } else {

        document.querySelector(".quiz").style.display = "none"
        document.querySelector(".final").style.display = "block"
        document.querySelector(".score").innerHTML = ` <p> correctAnwers ${numOfcorrectAnwers}</p>  <p> incorrectAnwers ${numOfIncorrectAnwers}</p>`
    }



}

























