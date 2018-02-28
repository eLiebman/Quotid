  //Array of quote objects, representing different test cases
var quotes = [
    //test object with quote and source only
  {quote: 'When the power of love overcomes the love of power, then the world will know peace', source: 'Jimi Hendrix', tags: ['guitar', 'psychedelic', '\'60s']},
    //test object with all properties
  {quote: 'Don\'t want a nation under the new media', source: 'Billy Joe Armstrong', citation: 'American Idiot', year: 2004, tags: ['punk', 'music', 'hair']},
    //test object with missing year
  {quote: 'I\'m not throwing away my shot', source: 'Lin Manuel Miranda', citation: 'Hamilton', tags: ['presidents', 'inspiration', 'New York']},
    //test object with missing citation
  {quote: 'I love eggs', source: 'Elliot Liebman', year: 2018, tags: ['eating', '"being me"', 'escapism']},
    //test object with blank citation
  {quote: 'Farming is the source of life', source: 'Golda Maier', citation: '', year: 1967, tags: ['farming', 'life', 'extra credit']},
  {quote: 'You can do anything, but not everything', source: 'David Allen', citation: 'Making it All Work', year: 2009, tags: ['art', 'business', 'creative', 'life balance']}
];

  //Keep track of the quote currently on the page
var currentQuote = {};

function getRandomQuote(){
    //arrays are zero indexed, so we don't need to add 1
  var randomIndex = Math.floor(Math.random() * quotes.length);
  var quote = quotes[randomIndex];
  return quote;
}
  //turn an array into an unordered list
  //for use with the tags property of each quote object
function listify(arr){
  var html = '<ul>';
  for( i = 0; i < arr.length; i++) {
    html += '<li>' + arr[i] + '</li>';
  }
  html += '</ul>';
  return html;
}

function randomColor(){
  var h = Math.floor(Math.random() * 264) + 1;
  var s = Math.floor(Math.random() * 75) + 1;
  var l = Math.floor(Math.random() * 50) + 26;
  var rgba = 'hsla(' + h + ', ' + s + '%, ' + l + '%, 1)'
  return rgba;
}

function printQuote(){
    //store random quote in a variable
  var randomQuote = getRandomQuote();
    //If it's the same as the current quote, try again
  while (randomQuote.quote === currentQuote.quote){
    randomQuote = getRandomQuote();
  }
    //update the current quote
  currentQuote = randomQuote;
    //store each quote property in its own variable
  var quote = randomQuote.quote;
  var source = randomQuote.source;
  var citation = randomQuote.citation;
  var year = randomQuote.year;
  var tags = randomQuote.tags;
    //initialize HTML variable as empty string
  var quoteHTML = '';
    //add quote and source to the HTML
  quoteHTML += '<p class="quote">' + quote + '</p>';
  quoteHTML += '<p class="source">' + source;
    //does it have a citation?
  if(citation !== undefined && citation !== ''){
    quoteHTML += '<span class="citation">' + citation + '</span>';
  }
    //does it have a year?
  if(year !== undefined){
    quoteHTML += '<span class="year">' + year + '</span>';
  }
  quoteHTML += '</p>';

  if(tags !== undefined){
    quoteHTML += listify(tags);
  }
    //replace contents of 'quote-box' div with our new HTML
  document.getElementById('quote-box').innerHTML = quoteHTML;

    //change background color of page and button
  var newColor = randomColor();
  document.getElementsByTagName("BODY")[0].style.background = newColor;
  document.getElementById("loadQuote").style.background = newColor;
    //change text color of tags
  var unorderedList = document.getElementsByTagName("UL")[0];
  var listItems = unorderedList.getElementsByTagName("LI");
  for (i = 0; i < listItems.length; i++) {
    listItems[i].style.color = newColor;
  }


  /* Final HTML looks like:
  <p class="quote"> [quote here] </p>
  <p class="source"> [source here]
    <span class="citation"> [citation here] </span>
    <span class="year"> [year here] </span>
  </p>
  <ul>
    <li> [tag] </li>
    ...
  </ul>*/
}
setInterval(printQuote, 7000);
  // call printQuote when quote-box loads, so first quote is random
document.getElementById('quote-box').addEventListener("load", printQuote());
  // event listener to respond to "Show another quote" button clicks
  // when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
