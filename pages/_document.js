import Document, { Html, Main, NextScript } from 'next/document';

class UpdatedDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en-GB">
				<body>
					<Main />
					<NextScript />
					<script
						async
						defer
						src="https://cabin.cckitchen.uk/hello.js"
					></script>
				</body>
			</Html>
		);
	}
}

export default UpdatedDocument;
