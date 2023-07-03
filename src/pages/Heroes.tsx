import { useState } from "react";

const arrayOfLetters: Array<string> = [];
for (let i = 97; i <= 122; i++) {
	arrayOfLetters.push(String.fromCharCode(i));
}

const Heroes = () => {
	const [selectedLetter, setSelectedLetter] = useState<string>("");
	// When i click on a letter, the li tag have to turn red
	const callback = (letter: string) => {
		console.log("A list item was clicked", letter);
		setSelectedLetter(letter);
	};

	return (
		<section>
			<h1>Heroes List</h1>
			<p>You clicked on letter: {selectedLetter}</p>
			<ul>
				{arrayOfLetters.map((letter) => (
					<li
						onClick={() => callback(letter)}
						style={{
							color: selectedLetter === letter ? "red" : "black",
						}}
					>
						{letter}
					</li>
				))}
			</ul>
		</section>
	);
};

export default Heroes;
