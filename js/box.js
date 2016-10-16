// Get the modal
var modal = document.getElementById('settings');

// Get the button that opens the modal
var btn = document.getElementById("settingsButton");

// When the user clicks on the button, open the modal 
btn.onclick = function() 
{
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) 
{
    if (event.target == modal) 
	{
        modal.style.display = "none";
    }
}
