<h1>Liri using Node JS </h1>

<p>LIRI will be a command line node app that takes in parameters and gives you back data.</p>
<p>To retrieve the data that will power this app, you'll need to send requests to the Twitter, Spotify and OMDB APIs. </p>
<ul>
<li>Twitter</li>
<li>Spotify API</li>
<li>OMDB API</li>
</ul>
<h3>Liri takes four commands</h3>
<ul>
<li>my-tweets</li>
<li>spotify-this-song</li>
<li>movie-this</li>
<li>do-what-it-says</li>
</ul>
<h3>What Each Command Should Do</h3>
<ol>
<li><strong>node liri.js my-tweets</strong></li>
<p>This will show your last 10 tweets and when they were created at in your terminal/bash window.</p>
<li><strong>node liri.js spotify-this-song "song name here"</strong></li>
<p>This will show the following information about the song in your terminal/bash window</p>
<ul>
<li>Artist(s)</li>
<li>The song's name</li>
<li>A preview link of the song from Spotify</li>
<li>The album that the song is from</li>
</ul>
<p>If no song is provided then your program will default to "The Sign" by Ace of Base.</p>
<li><strong>node liri.js movie-this "movie name here"</strong></li>
<p>This will output the following information to your terminal/bash window:</p>
<ul>
   <li>Title of the movie.</li>
   <li>Year the movie came out.</li>
   <li>IMDB Rating of the movie.</li>
   <li>Rotten Tomatoes Rating of the movie.</li>
   <li>Country where the movie was produced.</li>
   <li>Language of the movie.</li>
   <li>Plot of the movie.</li>
   <li>Actors in the movie.</li>
</ul>
<p>If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'</p>

<li><strong>node liri.js do-what-it-says</strong></li>
<p>Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.</p>
<p>For Example: It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.</p>
</ol>
<h3>Bonus</h3>
<p>In addition to logging the data to your terminal/bash window, output the data to a .txt file called data.txt.</p>
<img src="liri.png" alt="sample liri data on console">