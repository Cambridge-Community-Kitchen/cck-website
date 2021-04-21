import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	static getInitialProps(ctx) {
		return Document.getInitialProps(ctx);
	}

	render() {
		return (
			<Html lang="en">
				<Head />
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
