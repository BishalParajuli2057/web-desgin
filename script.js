document.getElementById("my-button").addEventListener("click",function(){console.log("Hello world")});

document.getElementById("my-button").addEventListener("click", function() {
    console.log("Hello world");
    document.querySelector("h1").textContent = "Moi maailma";
});

document.getElementById("add-data").addEventListener("click", function() {
    const li = document.createElement("li");
    li.textContent = "This is a list item";
    document.getElementById("my-list").appendChild(li);
});

document.getElementById("add-data").addEventListener("click", function() {
    const text = document.getElementById("my-textarea").value;
    const li = document.createElement("li");
    li.textContent = text;
    document.getElementById("my-list").appendChild(li);
});