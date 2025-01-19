
function addnotes(){
    const title=prompt("Enter Notes Title:",)
    const notes=prompt("Enter your notes:")
    console.log(title);
    console.log(notes);
}

function AddNotesComponent() {
  return (
    <>
      <button
        className="btn rounded-cicle"
        onClick = {()=>{
            addnotes();
        }}
        style={{
          fontSize: "19px",
          backgroundColor: "gray",
        }}
      >
        +
      </button>
    </>
  );
}
export default AddNotesComponent;
