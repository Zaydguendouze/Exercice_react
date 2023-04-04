import "../Exercice.css";
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
    setInputText(incomingTextInput);
    setAutocompleteList((prev) => {
      let isMatch = false;
      let newAutocompleteList = [...prev];
      autocompleteList.forEach((element) => {
        if (element && element.trim() === incomingTextInput) {
          isMatch = true;
          newAutocompleteList = newAutocompleteList.filter(
            (e) => e !== element
          );
        }
      });
      if (isMatch) {
        return newAutocompleteList;
      }

      return images.filter((img) => !lImages.includes(img));
    });
  };

  const handleClick = (e) => {
    // differentes manieres de set un state
    setLImages((prev) => {
      const newLocalImages = [...prev, inputText];
      setAutocompleteList(
        images.filter((img) => !newLocalImages.includes(img))
      );
      return newLocalImages;
    }); // react te donne pas 100% chance de mettre à jour le state avant la prochaine ligne "BATCHING"
  };

  useEffect(() => {
    if (inputText.length > 0) {
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
