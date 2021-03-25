function myFunction() {
  const x = document.getElementsByClassName("delete-control");
  const y = document.getElementById("delete");

  console.log(x)
  for (let i = 0; i < x.length; i++) {
    // console.log(x[i].style.display)

    if (x[i].style.display === "none") {

      x[i].style.display = "block";
      y.innerText = "Done Deleteing"
    } else {
      x[i].style.display = "none";
      y.innerText = "Delete"

    }
   }




}
