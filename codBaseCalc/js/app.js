$(document).ready(function() {

  let display = $("#display");
  let operationParamOne = 0;
  let operationParamTwo = 0;
  let operationOperator = undefined;
  let reGetResult = false;
  let result;


  // console.log('display: ', display.text() );
  // display.text('12');

  $(".tecla")
    .on('click', function(){ handleTecla(this.id); })
    .mousedown( function() { $(this).css('padding','1'); })
    .mouseup( function() { $(this).css('padding','0'); })
    ;

  function handleTecla(teclaId) {
    switch(teclaId){
      case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
        appendValue(teclaId);
        break;

      case "on":    clearDisplay(); break;
      case "sign":  changeSign();   break;
      case "punto": setDecimal();   break;

      case "dividido": case "por": case "menos": case "mas":
        makeOperation(teclaId);     
        break;

      case "igual": getResult();    break;

      default:
        break;
    }
  }

  function getResult() {
    if(!reGetResult){
      operationParamTwo = display.text();
    }

    switch(operationOperator){
      case "dividido":  result = parseFloat(operationParamOne) / parseFloat(operationParamTwo);   break;
      case "por":       result = parseFloat(operationParamOne) * parseFloat(operationParamTwo);   break;
      case "menos":     result = parseFloat(operationParamOne) - parseFloat(operationParamTwo);   break;
      case "mas":       result = parseFloat(operationParamOne) + parseFloat(operationParamTwo);   break;
      default: alert('operation not added yet'); break;
    }
    operationParamOne = result;

    display.text(String(result));

    consoleAll();
    reGetResult = true;
  }

  function makeOperation(operator) {
    operationParamOne = (display.text().length > 0) ? display.text() : operationParamOne;
    operationOperator = operator;
    display.text('');
    reGetResult = false;
  }

  function appendValue(num) {
    let currentText = display.text();
    if(currentText.length < 8 ){
      if(currentText == '0') {
        if(num != '0'){
          display.text(num);
        }
      } else {
        display.text(currentText + parseFloat(num) );
      }
    }
    reGetResult = false;
  }

  function setDecimal() {
    let currentText = display.text();

    if(currentText.length > 0) {
      if( currentText.indexOf('.') < 0){
        display.text(currentText + '.');
      }
    } else if (operationOperator) {
      display.text('0.');
    }

    reGetResult = false;
  }

  function changeSignf() {
    let currentText = display.text();

    if(currentText != '0') {
      num = parseFloat(currentText);
      num *= -1;
      display.text(String(num));
    } 

    reGetResult = false;
  }

  function clearDisplay() {
    display.text('0');

    operationParamOne = 0;
    operationParamTwo = 0;
    operationOperator = undefined;
    reGetResult = false;
  }

  function consoleAll(){
    console.log('operationParamOne: ', operationParamOne);
    console.log('operationParamTwo: ', operationParamTwo);
    console.log('operationParamOperator: ', operationOperator);
    console.log('result: ', result);
  }

});