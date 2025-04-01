// Credit to Blobs and Blob URLs | JavaScript Tutorial
// https://www.youtube.com/watch?v=WqBs_msUOXY

const a = document.querySelector("a");
const data = "Some good old plain text data";

// Create a Blob (Binary Large Object)
const blob = new Blob([data], { type: "text/plain" });

// Create the blob URL
const url = URL.createObjectURL(blob);
console.log(url);

// Set the blob URL as our href
a.href = url;
a.download = "blob-to-download.txt";
