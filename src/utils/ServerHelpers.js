import {backendUrl} from "./Config";


export const makeUnauthenticatedPOSTRequest = async (route, body) => {

    const response = await fetch(backendUrl + route, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(body),
    } );
    
    const formattedResponse = await response.json();
    return formattedResponse;
};


export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeAuthenticatedImageUpload = async (route, imageFile) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('image', imageFile);
  
    const response = await fetch(backendUrl + route, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (response.ok) {
      const formattedResponse = await response.json();
      return formattedResponse;
    } else {
      throw new Error('Failed to upload image');
    }
  };
  

  export const makeAuthenticatedGETRequest = async (route) => {
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeUnAuthenticatedGETRequest = async (route) => {
  const response = await fetch(backendUrl + route, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });
  const formattedResponse = await response.json();
 // console.log(formattedResponse);
  return formattedResponse;
};


const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};
