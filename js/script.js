  //Array of quote objects, representing different test cases
const quotes = [
    //test object with quote and source only
  {quote: 'When the power of love overcomes the love of power, then the world will know peace', source: 'Jimi Hendrix', tags: ['guitar', 'psychedelic', '\'60s']},
    //test object with all properties
  {quote: 'Don\'t want a nation under the new media', source: 'Billy Joe Armstrong', citation: 'American Idiot', year: 2004, tags: ['punk', 'music', 'culture']},
    //test object with missing year
  {quote: 'I\'m not throwing away my shot', source: 'Lin Manuel Miranda', citation: 'Hamilton', tags: ['presidents', 'inspiration', 'New York']},
    //test object with missing citation
  {quote: 'I love eggs', source: 'Elliot Liebman', year: 2018, tags: ['eating', 'being me', 'cooking']},
    //test object with blank citation
  {quote: 'Don\'t be humble, you\'re not that great', source: 'Golda Meir', citation: '', tags: ['humble', 'inspiration', 'Israel']},
  {quote: 'You can do anything, but not everything', source: 'David Allen', citation: 'Making it All Work', year: 2009, tags: ['art', 'business', 'creative', 'life balance']}
];

//establish a global timer variable.
//For some reason, keeping it global avoids timing issues that occured
//when I tried to declare var timer inside the printQuote function
let timer;
  //Keep track of the quote currently on the page
let currentQuote = {};


const getRandomQuote = () => {
    //arrays are zero indexed, so we don't need to add 1
  let randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
  //turn an array into an unordered list
  //for use with the tags property of each quote object
const listify = arr => {
  let html = '<ul>';
  for( i = 0; i < arr.length; i++) {
    html += '<li>' + arr[i] + '</li>';
  }
  html += '</ul>';
  return html;
}
  //Generate a random HSL color for the background.
  //Ranges were wet based on what looks good to me.
  //Avoiding bright whites, etc
const randomColor = () => {
  let h = Math.floor(Math.random() * 264) + 1;
  let s = Math.floor(Math.random() * 75) + 1;
  let l = Math.floor(Math.random() * 50) + 26;
  let hsla = 'hsla(' + h + ', ' + s + '%, ' + l + '%, 1)'
  return hsla;
}

const printQuote = () => {
    //store random quote in a variable
  let randomQuote = getRandomQuote();
    //If it's the same as the current quote, try again
  while (randomQuote.quote === currentQuote.quote){
    randomQuote = getRandomQuote();
  }
    //update the current quote
  currentQuote = randomQuote;
    //store each quote property in its own variable
  let quote = randomQuote.quote;
  let source = randomQuote.source;
  let citation = randomQuote.citation;
  let year = randomQuote.year;
  let tags = randomQuote.tags;
    //initialize HTML variable as empty string
  let quoteHTML = '';
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
  let newColor = randomColor();
  document.getElementsByTagName("BODY")[0].style.background = newColor;
  document.getElementById("loadQuote").style.background = newColor;
    //change text color of tag list to match background
  let unorderedList = document.getElementsByTagName("UL")[0];
  let listItems = unorderedList.getElementsByTagName("LI");
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
  //Timer resets every time the function is called
clearInterval(timer);
timer = setInterval(printQuote, 7000);
}
  // call printQuote when quote-box loads, so first quote is random
document.getElementById('quote-box').addEventListener("load", printQuote());
  // event listener to respond to "Show another quote" button clicks
  // when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
