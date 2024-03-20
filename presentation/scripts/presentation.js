
function activateOne() {
    document.getElementById('exampleOne').classList.add('exampleOneAnimation');
}
function activateTwo() {
    document.getElementById('exampleTwo').classList.add('exampleTwoAnimation');
}
function activateThree() {
    document.getElementById('exampleThree').classList.add('exampleThreeAnimation');
}
function activateFour() {
    document.getElementById('exampleFour').classList.add('exampleFourAnimation');
}
function activateFive() {
    document.getElementById('exampleFive').classList.add('exampleFiveAnimation');
}
function activateSix() {
    document.getElementById('exampleSix').classList.add('exampleSixAnimation');
}
function activateSeven() {
    document.getElementById('exampleSeven').classList.add('exampleSevenAnimation');
}
function activateEight() {
    document.getElementById('exampleEight').classList.add('exampleEightAnimation');
}
function activateNine() {
    document.getElementById('exampleNine').classList.add('exampleNineAnimation');
}
function activateTen() {
    document.getElementById('exampleTen').classList.add('exampleTenAnimation');
}
function activateEleven() {
    document.getElementById('exampleEleven').classList.add('exampleElevenAnimation');
}
function activateTwelve() {
    document.getElementById('exampleTwelve').classList.add('exampleTwelveAnimation');
}
function activateTiming() {
    document.getElementById('exampleTimingLinear').classList.add('exampleTimingLinearAnimation');
    document.getElementById('exampleTimingEase').classList.add('exampleTimingEaseAnimation');
    document.getElementById('exampleTimingEaseIn').classList.add('exampleTimingEaseInAnimation');
    document.getElementById('exampleTimingEaseOut').classList.add('exampleTimingEaseOutAnimation');
    document.getElementById('exampleTimingEaseInOut').classList.add('exampleTimingEaseInOutAnimation');
    document.getElementById('exampleTimingbezier').classList.add('exampleTimingbezierAnimation');
}
function activateFill() {
    document.getElementById('exampleFillNone').classList.add('exampleFillNoneAnimation');
    document.getElementById('exampleFillForwards').classList.add('exampleFillForwardsAnimation');
    document.getElementById('exampleFillBackwards').classList.add('exampleFillBackwardsAnimation');
    document.getElementById('exampleFillBoth').classList.add('exampleFillBothAnimation');
}
function activateShorthand() {
    document.getElementById('exampleShorthand').classList.add('exampleShorthandAnimation');
}
function openSection(event, sectionName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("sectionName");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" highlightTab", "");
    }
    document.getElementById(sectionName).style.display = "block";
    event.currentTarget.className += " highlightTab";
  }