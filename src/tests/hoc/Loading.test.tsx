import { render, screen } from "@testing-library/react";
import Loading from "../../hoc/Loading";

describe("Loading component", () => {
	it("should return a spinner if isLoading is true", () => {
		render(
			<Loading isLoading={true}>
				<h1>Hello</h1>
			</Loading>,
		);

		const spinner = screen.queryByLabelText("spinner");
		const helloTag = screen.queryByRole('heading')
		expect(spinner).toBeInTheDocument();
		expect(helloTag).not.toBeInTheDocument();
	});

	it("should return the child component if isLoading is false", () => {
		render(
			<Loading isLoading={false}>
				<h1>Hello</h1>
			</Loading>,
		);

		const spinner = screen.queryByLabelText("spinner");
		const helloTag = screen.queryByRole('heading')
		expect(spinner).not.toBeInTheDocument();
		expect(helloTag).toBeInTheDocument();
	});

	
	it("should return the child component if isLoading is false, and find children with Fabio text", () => {
		render(
			<Loading isLoading={false}>
				<p>Fabio</p>
			</Loading>,
		);

		const spinner = screen.queryByLabelText("spinner");
		const helloTag = screen.queryByText('Fabio')
		expect(spinner).not.toBeInTheDocument();
		expect(helloTag).toBeInTheDocument();
	});
});

// Test Driven Developement
// Red, Green, Refactor
