import Nav from "@/components/Nav";

import Provider from "@/components/Provider";

import "./globals.css";

export const metadata = {
  title: "FlickSpeak",
  descteption:
    "discover recommendations, connect with fellow film lovers, and explore the world of cinema.",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
