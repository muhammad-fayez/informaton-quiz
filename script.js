
/*************** settings of quiz*******************/
let categoryDom = document.querySelector("#category")
let difficultyDom = document.querySelector("#difficulty")
let nQuestionDom = document.querySelector("#nQuestion")
let startBtn = document.querySelector("#start")
startBtn.addEventListener("click", startQuiz)













let answers;

async function startQuiz() {

    let respond;
    let amount = nQuestionDom.value
    let category = categoryDom.value
    let difficulty = difficultyDom.value


    const URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
    let data = await fetch(URL).then(respond => respond.json()).then(function (item) { respond = item.results })







    let incorrect_answers = respond[0].incorrect_answers;
    let correct_answer = respond[0].correct_answer;
    let question = respond[0].question;
    let toalquestions = respond.length;


    console.log("incorrect_answers", incorrect_answers)
    console.log("correct_answer", correct_answer)
    console.log("question", question)
    console.log("toalquestions", toalquestions)


    let allanswers = [...incorrect_answers, correct_answer]
    console.log("allanswers", allanswers)


    console.log("respond", respond)


    answers = [
        { id: "a1", value: `${allanswers[0]}` },
        { id: "a2", value: `${allanswers[1]}` },
        { id: "a3", value: `${allanswers[2]}` },
        { id: "a4", value: `${allanswers[3]}` }
    ]

    next()


}





let questionsDom = document.querySelector("#questions")



// let nextques = document.querySelector("#nextques")
// nextques.addEventListener("click", next)


function next() {

    let answresDom = document.querySelector(".answres")

    questionsDom.innerHTML += `${question}`


    let drawadata = answers.forEach(function (item) {
        // console.log(item)
        answresDom.innerHTML += `  <label class="container-questions">${item.value} <input onclick="check(${item.id})" id="${item.id}" name="radio" type="radio" value="${item.value}"> </label>`



    })

    function check(id) {
        // console.log(id.value)
    }


}















