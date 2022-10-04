class calculator{
  constructor(){
    this.displayNumber = document.getElementById("display")
    this.keyboard = document.getElementById("keyboard")
    this.historyDialog = document.getElementById("localhistory")
    this.historyBody = document.getElementById("localhistorybody")
    this.historyButton = document.getElementById("historyButton")
    this.historyBackButton = document.getElementById("backIcon")
    this.numbers = this.numbers.bind(this)
    this.erase = this.erase.bind(this)
    this.enter = this.enter.bind(this)
    this.localStorageManagement = this.localStorageManagement.bind(this)
    this.globalValue = 0
    /*--------------------localStorage----------------------------*/
    this.addNewItem = this.addNewItem.bind(this)
    this.saveItem = this.saveItem.bind(this)
    this.arrayx = []
    this.draw = this.draw.bind(this)
  }
  handleEvents(){
    this.keyboard.addEventListener("click", e =>{
      let target = e.target
      let dataset = target.dataset
      let value = dataset.value
      let type = dataset.type

      if(type === "number" || type ==="operator"){
        this.numbers(value)
      }
      else if(type === "erase"){
        this.erase(value)
      }else{
        this.enter(value)
      }
    })
    this.historyButton.addEventListener("click", e =>{
      this.historyDialog.setAttribute("open", true)
    })
    this.historyBackButton.addEventListener("click", e =>{
      this.historyDialog.removeAttribute("open")
    })
}
  numbers(num){
    let inicial = this.displayNumber.value
    this.displayNumber.value = inicial + num
  }
  enter(num){
    let result = this.globalValue = eval(this.displayNumber.value)
    let fullOperation = this.displayNumber.value
    let operation = this.displayNumber.value = this.globalValue
    this.localStorageManagement(result, fullOperation)
    this.draw()
  }
  erase(){
    let inicial = this.displayNumber.value
    this.displayNumber.value = null
  }
  localStorageManagement(result , operation){
    this.addNewItem(result, operation)
  }
  addNewItem(result,operation){
    let i = (`${operation} = ${result}`)
    this.arrayx.push(i)
    this.saveItem()
  }
  saveItem(){
    localStorage.setItem("Resultado",JSON.stringify(this.arrayx))
  }
  /*Draw history*/
  draw(){
    let element = document.createElement("div")

    let getItem = JSON.parse(localStorage.getItem("Resultado"))
    getItem.map(result =>{
      element.setAttribute("class","localhistoryItem")
      element.innerHTML = result
      this.historyBody.appendChild(element)
    })
  }
}
let calculadora = new calculator()
calculadora.handleEvents()
