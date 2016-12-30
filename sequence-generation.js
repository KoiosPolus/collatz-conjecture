//still can't clear the resultDisplayTextVar text.?? but I can add to it.
function rangedNumberFGAssignment() {
  //assigns F/G values for all numbers from 1 to the value in numStartInputField

  var numStart = document.getElementById("numStartInputField").value;
  var resultDisplayValue = "" // document.getElementById("resultDisplayTable").innerHTML; //placeholder for completed number and f/g values
  var resultDisplayTextVar = document.getElementById("resultDisplayTable")
  var evaluationLimit = 1000 //safety limit for max numbers evaluated
  var maxFgLength = 250 //safety limit for max fg value evaluated
  var CollatzCriticalValueArray = []
  var enableSorting = document.getElementById("sortInputField").checked
  var enableOnlyLoops = document.getElementById("onlyLoopsInputField").checked
  var enableSymbolic = document.getElementById("symbolicInputField").checked
  var CollatzFunctionFMultiplier = document.getElementById("CollatzFunctionFMultiplierInputField").value;
  var CollatzFunctionFConstant = document.getElementById("CollatzFunctionFConstantInputField").value;
  var CollatzFunctionGMultiplier = document.getElementById("CollatzFunctionGMultiplierInputField").value;
  var CollatzFunctionGConstant = document.getElementById("CollatzFunctionGConstantInputField").value;

  function CollatzFuncitonF(num) {
    //internal Collatz function used if when the number is even (f) 
    return num * Number(CollatzFunctionFMultiplier) + Number(CollatzFunctionFConstant)
  }

  function CollatzFuncitonG(num) {
    //internal Collatz function used if when the number is odd (g)
    return num * Number(CollatzFunctionGMultiplier) + Number(CollatzFunctionGConstant)
  }

  function singleNumberFGAssignment(num) {
    //evaluates a single num value, returning unique f/g combinaiton
    //if the number is even uses CollatzFuncitonF and adds "f" to the record
    //if the number is odd uses CollatzFuncitonG and adds "g" to the record

    var singleNumberFGAssignmentStartValue = num //var to remember starting num
    var results = [] // computed number sequence placeholder
    var symbolicResults = [] //unique f/g combinaiton placeholder
    var CollatzLoop = [] //eventual infinate loop placeholder
    var symbolicCollatzLoop = []
    var CollatzCriticalValueFound = false
    var categorizationError = false

    while (!CollatzCriticalValueFound && !categorizationError) {
      //application of F/G funcitons and conscruction of f/g (numerical) results

      if (results.length > maxFgLength) { //protects against FG combinations that don't resolve to the given CollatzCriticalValue
        alert("Computed fg value of " + singleNumberFGAssignmentStartValue + " exceeds maximum string length of " + maxFgLength)
        break;
      }

      if (num % 2 == 0) {
        num = CollatzFuncitonF(num);
        symbolicResults.push("f")
      } else if (num % 2 == 1) {
        num = CollatzFuncitonG(num);
        symbolicResults.push("g")
      } else {
        alert("Unable to assign Even/Odd to number value of " + num);
        categorizationError = true
        break;
      }

      for (var i = 1; i < results.length - 1; i++) {
        if (results[i] === num) {
          CollatzCriticalValueArray.push(num)
            //alert("Found critical value for " + singleNumberFGAssignmentStartValue + " at " + num)
          for (var j = i; j < results.length; j++) {
            CollatzLoop.push(results[j])
            symbolicCollatzLoop.push(symbolicResults[j])
          }
          var CollatzCriticalValueFound = true
          break;
        }
      }
      results.push(num) //command replacing fg with their real values maunal evaluation
    }
    if (enableOnlyLoops && enableSymbolic) {
      results = symbolicCollatzLoop
    } else if (enableOnlyLoops) {
      results = CollatzLoop
    } else if (enableSymbolic) {
      results = symbolicResults
    }
    if (enableSorting) {
      results.sort(function(a, b) {
        return a - b
      });
      //Math.min.apply(null, numbers)
    }
    return results.join(", ")
  }

  for (var i = 1; i <= numStart; i++) {
    //constructs num : f/g results
    //loops for all numbers from 1 to inputted value
    if (i > evaluationLimit) {
      alert("Error: inputted value exceeds maximum evaluation limit of " + evaluationLimit)
      break;
    };
    resultDisplayValue += "<tr><th class='tableNumbers'>" + i + "</th><th class='tableResults'>" + singleNumberFGAssignment(i) + "</th></tr>";
  }

  resultDisplayTextVar.innerHTML = "Error Processing table values" //clears HTML results field in preparation for results
  resultDisplayTextVar.innerHTML = resultDisplayValue; //passes completed rusults of number and f/g combinations to resultDisplayText HTML section

}
