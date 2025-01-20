const baseUrl = "http://localhost:4000";

export const fetchCardsEndpoint = async (username) => {
  try {
    const response = await fetch(baseUrl + `/notepad/get-note/${username}`, { method: "GET" });
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Error fetching data: ", response.status);
      return [];
    }
  } catch (e) {
    console.error("Cannot Fetch Data", e);
    return [];
  }
};

export const deleteCardEndpoint = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/notepad/delete-note/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Card deleted successfully");
      return true;
    } else {
      console.error("Failed to delete card: ", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error deleting card: ", error);
    return false;
  }
};

export const addCardEndpoint = async (username,title, content) => {
  try {
    const response = await fetch(`${baseUrl}/notepad/add-note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username,title, content }),
    });

    if (response.ok) {
      const newNote = await response.json();
      return newNote;
    } else {
      console.error("Failed to add note: ", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error adding note: ", error);
    return null;
  }
};

export const registerEndpoint = async(username,password,email) =>{
  try{
    const response = await fetch(`${baseUrl}/auth/register`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if(response.ok){
      const newUser = await response.json();
      return newUser;
    }
    else{
      console.error("failed to add user", response.status);
    }
  }
  catch(error){
    console.error("Error adding user:",error);
    return null;
  }
};

export const loginEndpoint = async(username,password)=>{
  try{
    const response = await fetch(`${baseUrl}/auth/authUser`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({username,password}),
    });
    if(response.ok){
      const user = await response.json();
      return user;
    }
    console.error("failed to authenticate user", response.status);
    // return await [response.status(401).json()];
  }
  catch(error){
    console.error("Error authenticating the user:", error);
    return null;
  }
}