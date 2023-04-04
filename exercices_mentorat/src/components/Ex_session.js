import "../exercice.css";
import { useState, useEffect } from "react";

const images = ["img1 ", "img2 ", "img3 ", "img4 ", "img5 "];

export default function App() {
  const [isAutocomplete, setIsAutocomplete] = useState(false);
  const [inputText, setInputText] = useState("");

  const [lImages, setLImages] = useState(["img1 "]);
  const [autocompleteList, setAutocompleteList] = useState(
    images.filter((img) => !lImages.includes(img))
  );

  const handleInputChange = (e) => {
    const incomingTextInput = e.target.value;
    console.log("incomingTextInput", incomingTextInput);
    setInputText(incomingTextInput);
    setAutocompleteList((prev) => {
      let isMatch = false;
      let newAutocompleteList = [...prev];
      console.log("newAutocompleteList_prev", newAutocompleteList);
      autocompleteList.forEach((element) => {
        if (element && element.trim() === incomingTextInput) {
          isMatch = true;
          newAutocompleteList = newAutocompleteList.filter(
            (e) => e !== element
          );
          console.log("newAutocompleteList", newAutocompleteList);
        }
      });
      if (isMatch) {
        console.log("isMatch", isMatch);
        return newAutocompleteList;
      }

      console.log("lImages", lImages);
      return images.filter((img) => !lImages.includes(img));
    });
  };

  const handleClick = (e) => {
    // differentes manieres de set un state
    setLImages((prev) => {
      const newLocalImages = [...prev, inputText];
      console.log("newLocalImages", newLocalImages);
      console.log("images", images);
      let isOK = false;
      for (let i = 0; i < images.length; i++) {
        for (let j = 0; j < newLocalImages.length; j++) {
          if (images[i] === newLocalImages[j]) {
            isOK = true;
            console.log("isOK", isOK);
          } else console.log("NOTOK");
        }
      }
      setAutocompleteList(
        images.filter((img) => !newLocalImages.includes(img))
      );
      return newLocalImages;
    }); // react te donne pas 100% chance de mettre à jour le state avant la prochaine ligne "BATCHING"
  };

  useEffect(() => {
    if (inputText.length > 0) {
      console.log("inputText", inputText);
      setIsAutocomplete(true);
    } else setIsAutocomplete(false);
  }, [inputText]);

  return (
    <div>
      {lImages.map((img) => img)}

      <input onChange={handleInputChange} />
      <button onClick={handleClick}>ajouter image</button>

      {isAutocomplete && (
        <ul>
          {autocompleteList.map((element, idx) => (
            <li key={idx}>{element}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// substring est une combinaison de ce qui se trouve dans le string
// voir si le substring est contenu dans le string principal
// s'il est contenu, on affiche et en même temps si il est égal à tout le string
// indexOf peut checker si

// bloquer l'affichage des images non inclues
// pouvoir l'ajouter en cliquant directement en cliquant dans le ul
//  if (element && element.trim() === incomingTextInput) { doit prendre en compte les espaces ajoutés en plus ex : "img3  "
// enlever les espaces de base
// remplacer les string images avec des vraies images, ajouter du css
